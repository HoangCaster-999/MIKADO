/* MIKADO – Renderer fuer die vollstaendige Speisekarte.
   Baut Kategorie-Tabs, Filter und Suche ueber window.MIKADO_MENU. */
(function () {
  'use strict';

  var DATA = window.MIKADO_MENU;
  var root = document.getElementById('menu-body');
  var tabsEl = document.getElementById('menu-tabs');
  var searchEl = document.getElementById('menu-search');
  var clearEl = document.getElementById('menu-search-clear');
  var filterEls = Array.prototype.slice.call(document.querySelectorAll('[data-filter]'));
  if (!DATA || !root) return;

  var TAG_LABEL = { veg: 'Vegetarisch', spicy: 'Scharf', raw: 'Roher Fisch' };
  /* Wenn nur eine waehlbare Variante vegetarisch ist, sagt das Badge das auch so. */
  var TAG_OPT_LABEL = { veg: 'Vegetarisch wählbar', spicy: 'Scharf wählbar', raw: 'Roher Fisch wählbar' };
  var ALLERG_MAP = {};
  DATA.allergens.forEach(function (a) { ALLERG_MAP[a[0]] = a[1]; });
  DATA.additives.forEach(function (a) { ALLERG_MAP[a[0]] = a[1]; });

  var state = { filter: 'alle', query: '' };

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function toNumber(p) { return parseFloat(String(p).replace(/\./g, '').replace(',', '.')); }

  /* own  = gilt fuer das Gericht selbst
     opt  = gilt nur fuer eine waehlbare Variante (z. B. Tofu bei einem Wok-Gericht)
     any  = beides zusammen, dagegen filtert die Karte. */
  function tagsOf(item) {
    var own = {}, opt = {}, any = {}, k;
    (item.tags || '').split(',').forEach(function (t) {
      t = t.trim(); if (t) { own[t] = true; any[t] = true; }
    });
    (item.opts || []).forEach(function (o) {
      if (o[3]) { opt[o[3]] = true; any[o[3]] = true; }
    });
    for (k in own) { if (own[k]) delete opt[k]; }
    return { own: own, opt: opt, any: any };
  }

  /* Volltext, gegen den die Suche laeuft. */
  function haystack(item, group) {
    var parts = [item.n || '', item.name || '', item.de || '', item.en || '', item.meta || '',
                 group.name, group.en || ''];
    (item.opts || []).forEach(function (o) { parts.push(o[0], o[1]); });
    return parts.join(' ').toLowerCase();
  }

  function matches(item, group) {
    if (state.filter !== 'alle') {
      var t = tagsOf(item).any;
      if (state.filter === 'veg' && !t.veg) return false;
      if (state.filter === 'spicy' && !t.spicy) return false;
      if (state.filter === 'sushi' && group.kind !== 'sushi') return false;
      if (state.filter === 'drink' && group.kind !== 'drink') return false;
    }
    if (state.query && haystack(item, group).indexOf(state.query) === -1) return false;
    return true;
  }

  function allergBadge(code) {
    if (!code) return '';
    var title = code.split(/[,/\s]+/).filter(Boolean).map(function (c) {
      var key = c.replace(/[^A-Za-z0-9]/g, '');
      return ALLERG_MAP[key] ? key + ' = ' + ALLERG_MAP[key] : null;
    }).filter(Boolean).join(' · ');
    return '<span class="badge badge--allerg" title="' + esc(title || code) + '">' + esc(code) + '</span>';
  }

  function priceBlock(item) {
    if (item.price) return '<span class="dish__price">' + esc(item.price) + ' €</span>';
    if (item.opts && item.opts.length) {
      var min = Math.min.apply(null, item.opts.map(function (o) { return toNumber(o[2]); }));
      var all = item.opts.every(function (o) { return toNumber(o[2]) === min; });
      var txt = min.toFixed(2).replace('.', ',');
      return '<span class="dish__price">' +
        (all ? '' : '<span class="dish__from">ab </span>') + txt + ' €</span>';
    }
    return '';
  }

  function optsBlock(item) {
    if (!item.opts || !item.opts.length) return '';
    return '<ul class="opts">' + item.opts.map(function (o) {
      return '<li><i>' + esc(o[0]) +
        (o[1] ? ' <em>' + esc(o[1]) + '</em>' : '') +
        '</i><b>' + esc(o[2]) + ' €</b></li>';
    }).join('') + '</ul>';
  }

  function badgesBlock(item) {
    var t = tagsOf(item), out = [];
    ['veg', 'spicy', 'raw'].forEach(function (k) {
      if (t.own[k]) out.push('<span class="badge badge--' + k + '">' + TAG_LABEL[k] + '</span>');
      else if (t.opt[k]) out.push('<span class="badge badge--' + k + '">' + TAG_OPT_LABEL[k] + '</span>');
    });
    if (item.allerg) out.push(allergBadge(item.allerg));
    return out.length ? '<div class="badges">' + out.join('') + '</div>' : '';
  }

  function dishHtml(item) {
    var withPhoto = !!item.img;
    var lead = withPhoto
      ? '<figure class="dish__thumb"><img src="' + esc(item.img) + '" alt="' + esc(item.name) +
        '" loading="lazy" decoding="async"></figure>'
      : '<span class="dish__no">' + esc(item.n || '') + '</span>';

    return '<article class="dish' + (withPhoto ? ' dish--photo' : '') + '">' + lead +
      '<div class="dish__main">' +
        '<div class="dish__top"><h4 class="dish__name">' +
          (withPhoto && item.n ? '<span class="dish__no">' + esc(item.n) + '</span> ' : '') +
          esc(item.name) + '</h4>' + priceBlock(item) + '</div>' +
        (item.meta ? '<p class="dish__meta">' + esc(item.meta) + '</p>' : '') +
        (item.de ? '<p class="dish__de">' + esc(item.de) + '</p>' : '') +
        (item.en ? '<p class="dish__en">' + esc(item.en) + '</p>' : '') +
        optsBlock(item) + badgesBlock(item) +
      '</div></article>';
  }

  function groupHtml(group, items) {
    var wide = items.some(function (i) { return (i.opts || []).length > 5; });
    return '<section class="mgroup" id="g-' + esc(group.id) + '" data-group="' + esc(group.id) + '">' +
      '<div class="mgroup__head">' +
        '<h3>' + esc(group.name) + '</h3>' +
        (group.en ? '<span class="mgroup__en">' + esc(group.en) + '</span>' : '') +
        (group.unit ? '<span class="mgroup__unit">' + esc(group.unit) + '</span>' : '') +
      '</div>' +
      (group.note ? '<p class="mgroup__note">' + esc(group.note) + '</p>' : '') +
      '<div class="mgroup__bar"></div>' +
      '<div class="mlist' + (wide ? ' mlist--wide' : '') + '">' +
        items.map(dishHtml).join('') +
      '</div></section>';
  }

  function render() {
    var html = '', shown = 0;
    DATA.groups.forEach(function (g) {
      var items = g.items.filter(function (i) { return matches(i, g); });
      if (!items.length) return;
      shown += items.length;
      html += groupHtml(g, items);
    });

    if (!shown) {
      html = '<div class="empty"><b>Nichts gefunden</b>' +
        'Für diese Auswahl gibt es keine Treffer. Bitte passen Sie Suche oder Filter an.</div>';
    }
    root.innerHTML = html;
    buildTabs();
  }

  function buildTabs() {
    if (!tabsEl) return;
    var present = {};
    Array.prototype.forEach.call(root.querySelectorAll('.mgroup'), function (el) {
      present[el.getAttribute('data-group')] = true;
    });
    tabsEl.innerHTML = DATA.groups.filter(function (g) { return present[g.id]; })
      .map(function (g) {
        return '<button type="button" class="tab" data-target="g-' + esc(g.id) + '">' +
          esc(g.name) + '</button>';
      }).join('');
  }

  /* ----------------------------------------------------------- Interaktion */

  tabsEl && tabsEl.addEventListener('click', function (e) {
    var btn = e.target.closest('.tab');
    if (!btn) return;
    var el = document.getElementById(btn.getAttribute('data-target'));
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  /* Horizontales Scrollen der Tab-Leiste mit dem Mausrad. */
  tabsEl && tabsEl.addEventListener('wheel', function (e) {
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    e.preventDefault();
    tabsEl.scrollLeft += e.deltaY;
  }, { passive: false });

  filterEls.forEach(function (btn) {
    btn.addEventListener('click', function () {
      state.filter = btn.getAttribute('data-filter');
      filterEls.forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });
      render();
    });
  });

  var timer;
  searchEl && searchEl.addEventListener('input', function () {
    clearTimeout(timer);
    clearEl && clearEl.classList.toggle('is-on', searchEl.value.length > 0);
    timer = setTimeout(function () {
      state.query = searchEl.value.trim().toLowerCase();
      render();
    }, 160);
  });

  clearEl && clearEl.addEventListener('click', function () {
    searchEl.value = '';
    clearEl.classList.remove('is-on');
    state.query = '';
    render();
    searchEl.focus();
  });

  /* Aktiven Tab an der Scrollposition ausrichten. */
  var spy = null;
  function startSpy() {
    if (spy) spy.disconnect();
    if (!('IntersectionObserver' in window) || !tabsEl) return;
    spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = 'g-' + entry.target.getAttribute('data-group');
        Array.prototype.forEach.call(tabsEl.children, function (tab) {
          var on = tab.getAttribute('data-target') === id;
          tab.classList.toggle('is-active', on);
          if (on) {
            var left = tab.offsetLeft - tabsEl.clientWidth / 2 + tab.clientWidth / 2;
            tabsEl.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
          }
        });
      });
    }, { rootMargin: '-160px 0px -70% 0px' });
    Array.prototype.forEach.call(root.querySelectorAll('.mgroup'), function (el) { spy.observe(el); });
  }

  /* Legende aus den Daten aufbauen. */
  function renderLegend() {
    var a = document.getElementById('legend-allergens');
    var z = document.getElementById('legend-additives');
    var n = document.getElementById('legend-note');
    if (a) a.innerHTML = DATA.allergens.map(function (x) {
      return '<li><b>' + esc(x[0]) + '</b>' + esc(x[1]) + '</li>';
    }).join('');
    if (z) z.innerHTML = DATA.additives.map(function (x) {
      return '<li><b>' + esc(x[0]) + '</b>' + esc(x[1]) + '</li>';
    }).join('');
    if (n) n.textContent = DATA.allergenNote;
  }

  var observerTick;
  var mo = new MutationObserver(function () {
    clearTimeout(observerTick);
    observerTick = setTimeout(startSpy, 60);
  });
  mo.observe(root, { childList: true });

  render();
  renderLegend();
  startSpy();
})();
