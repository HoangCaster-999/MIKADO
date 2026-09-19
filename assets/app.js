/* MIKADO – Navigation, Scroll-Effekte und Oeffnungszeiten-Status. */
(function () {
  'use strict';

  var nav = document.getElementById('nav');
  var links = document.getElementById('nav-links');
  var burger = document.getElementById('nav-burger');

  /* ----------------------------------------------------------- Mobile-Menü */
  if (burger && links) {
    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      links.classList.toggle('is-open', !open);
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName !== 'A') return;
      burger.setAttribute('aria-expanded', 'false');
      links.classList.remove('is-open');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      burger.setAttribute('aria-expanded', 'false');
      links.classList.remove('is-open');
    });
  }

  /* ----------------------------------------------------------- Sticky-Nav */
  if (nav) {
    var onScroll = function () { nav.classList.toggle('is-stuck', window.scrollY > 12); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ----------------------------------------------------------- Reveal */
  var reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(reveals, function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    Array.prototype.forEach.call(reveals, function (el) { io.observe(el); });
  }

  /* ----------------------------------------------------------- Geöffnet / geschlossen
     Woche: 0 = Sonntag … 6 = Samstag. Dienstag (2) ist Ruhetag.
     Feiertage sind hier nicht abgebildet – an Feiertagen ist laut Karte auch dienstags geoeffnet. */
  var HOURS = {
    0: [[720, 1320]],               /* So  12:00–22:00 */
    1: [[660, 900], [1020, 1320]],  /* Mo  11:00–15:00 · 17:00–22:00 */
    2: [],                          /* Di  Ruhetag */
    3: [[660, 900], [1020, 1320]],  /* Mi */
    4: [[660, 900], [1020, 1320]],  /* Do */
    5: [[660, 900], [1020, 1320]],  /* Fr */
    6: [[720, 1320]]                /* Sa  12:00–22:00 */
  };

  function statusNow() {
    var now = new Date();
    var mins = now.getHours() * 60 + now.getMinutes();
    var today = HOURS[now.getDay()] || [];
    var open = today.some(function (r) { return mins >= r[0] && mins < r[1]; });
    if (open) return { open: true, text: 'Jetzt geöffnet' };
    if (now.getDay() === 2) return { open: false, text: 'Dienstag ist Ruhetag' };

    var next = null;
    today.forEach(function (r) { if (next === null && mins < r[0]) next = r[0]; });
    if (next !== null) {
      var h = Math.floor(next / 60), m = next % 60;
      return { open: false, text: 'Öffnet heute um ' + h + ':' + (m < 10 ? '0' : '') + m + ' Uhr' };
    }
    return { open: false, text: 'Heute geschlossen' };
  }

  var badge = document.getElementById('open-status');
  if (badge) {
    var apply = function () {
      var s = statusNow();
      badge.textContent = s.text;
      badge.style.background = s.open ? 'rgba(93,155,126,.14)' : 'rgba(226,102,74,.13)';
      badge.style.borderColor = s.open ? 'rgba(93,155,126,.42)' : 'rgba(226,102,74,.35)';
      badge.style.color = s.open ? '#8fd0ad' : '#f0a08b';
    };
    apply();
    setInterval(apply, 60000);
  }

  /* ----------------------------------------------------------- Jahr im Footer */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
