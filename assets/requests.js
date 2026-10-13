/* WhatsApp recipient: international digits only, without + or spaces. */
window.MIKADO_WHATSAPP = '4949419901764';

(function () {
  'use strict';
  var cart = [];
  var orderFormVisible = false;
  var money = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
  function cents(price) {
    return Math.round(Number(String(price).replace(/\./g, '').replace(',', '.')) * 100);
  }
  function resolve(key, variant) {
    var parts = key.split(':');
    var group = window.MIKADO_MENU.groups.find(function (g) { return g.id === parts[0]; });
    var item = group && group.items[Number(parts[1])];
    if (!item) return null;
    var option = item.opts && item.opts[variant];
    if (item.opts && !option) return null;
    var price = cents(option ? option[2] : item.price);
    if (!Number.isSafeInteger(price) || price <= 0) return null;
    return { key: key + ':' + variant, label: (item.n ? item.n + ' · ' : '') + item.name +
      (option ? ' – ' + option[0] : ''), price: price, quantity: 1 };
  }
  function total() {
    return cart.reduce(function (sum, row) { return sum + row.price * row.quantity; }, 0);
  }
  function berlinNow() {
    var parts = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Berlin',
      year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(new Date());
    var values = {};
    parts.forEach(function (p) { values[p.type] = p.value; });
    return values.year + '-' + values.month + '-' + values.day + 'T' + values.hour + ':' + values.minute;
  }
  function message(kind, details) {
    var lines = ['MIKADO – ' + (kind === 'order' ? 'Bestellanfrage (Abholung)' : 'Tischanfrage'),
      'Name: ' + details.name.trim(), 'Telefon: ' + details.phone.trim(),
      'Datum: ' + details.date.split('-').reverse().join('.'), 'Uhrzeit: ' + details.time + ' Uhr (Aurich)'];
    if (kind === 'order') {
      lines.push('', 'Gerichte:');
      cart.forEach(function (row) { lines.push(row.quantity + ' × ' + row.label + ' = ' + money.format(row.price * row.quantity / 100)); });
      lines.push('Gesamt: ' + money.format(total() / 100));
    } else lines.push('Personen: ' + details.guests);
    if (details.notes.trim()) lines.push('', 'Hinweise: ' + details.notes.trim());
    lines.push('', 'Bitte bestätigen Sie meine Anfrage. Vielen Dank!');
    return lines.join('\n');
  }
  function render() {
    var root = document.getElementById('cart-items');
    var scrollTop = root.scrollTop;
    root.replaceChildren();
    if (!cart.length) root.textContent = 'Noch keine Gerichte ausgewählt.';
    cart.forEach(function (row) {
      var line = document.createElement('div');
      line.className = 'cart-row';
      var name = document.createElement('span');
      name.textContent = row.label;
      var controls = document.createElement('div');
      controls.className = 'cart-row__controls';
      var minus = document.createElement('button');
      minus.type = 'button';
      minus.textContent = '−';
      minus.setAttribute('aria-label', row.label + ': Menge verringern / entfernen');
      minus.addEventListener('click', function () {
        row.quantity--;
        if (!row.quantity) cart.splice(cart.indexOf(row), 1);
        render();
      });
      var quantity = document.createElement('span');
      quantity.textContent = row.quantity;
      var plus = document.createElement('button');
      plus.type = 'button';
      plus.textContent = '+';
      plus.disabled = row.quantity >= 99;
      plus.setAttribute('aria-label', row.label + ': Menge erhöhen');
      plus.addEventListener('click', function () { row.quantity++; render(); });
      var price = document.createElement('strong');
      price.textContent = money.format(row.price * row.quantity / 100);
      controls.append(minus, quantity, plus, price);
      line.append(name, controls);
      root.append(line);
    });
    root.scrollTop = scrollTop;
    document.getElementById('cart-total').textContent = money.format(total() / 100);
    var count = cart.reduce(function (sum, row) { return sum + row.quantity; }, 0);
    document.getElementById('cart-count').textContent = '(' + count + ')';
    document.getElementById('cart-shortcut-summary').textContent = count + (count === 1 ? ' Gericht' : ' Gerichte') + ' · ' + money.format(total() / 100);
    document.getElementById('cart-shortcut').hidden = !count || orderFormVisible;
    document.body.classList.toggle('has-cart', count > 0);
    document.querySelector('#order-form button[type="submit"]').disabled = !cart.length;
  }
  function add(key, variant) {
    var next = resolve(key, variant);
    if (!next) return;
    var existing = cart.find(function (row) { return row.key === next.key; });
    if (existing && existing.quantity >= 99) {
      document.getElementById('cart-status').textContent = 'Maximal 99 Portionen je Gericht und Variante.';
      return;
    }
    if (existing) existing.quantity++;
    else cart.push(next);
    render();
    document.getElementById('cart-status').textContent = next.label + ' hinzugefügt.';
  }
  window.MIKADO_REQUESTS = { add: add };
  if ('IntersectionObserver' in window) {
    var formObserver = new IntersectionObserver(function (entries) {
      orderFormVisible = entries[0].isIntersecting;
      document.getElementById('cart-shortcut').hidden = !cart.length || orderFormVisible;
    }, { rootMargin: '-80px 0px -80px 0px' });
    formObserver.observe(document.getElementById('order-form'));
  }
  ['order', 'reservation'].forEach(function (kind) {
    var form = document.getElementById(kind + '-form');
    form.elements.date.min = berlinNow().slice(0, 10);
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var error = form.querySelector('.request-error');
      error.textContent = '';
      var details = Object.fromEntries(new FormData(form));
      if (!details.name.trim() || !details.phone.trim()) {
        error.textContent = 'Bitte geben Sie Ihren Namen und Ihre Telefonnummer ein.';
        return;
      }
      if (details.date + 'T' + details.time <= berlinNow()) {
        error.textContent = 'Bitte wählen Sie einen Termin in der Zukunft (Ortszeit Aurich).';
        return;
      }
      if (kind === 'order' && !cart.length) {
        error.textContent = 'Bitte wählen Sie zuerst ein Gericht aus.';
        return;
      }
      var phone = window.MIKADO_WHATSAPP;
      if (!/^[1-9]\d{6,14}$/.test(phone)) {
        error.textContent = 'WhatsApp ist derzeit nicht verfügbar. Bitte rufen Sie uns an: 04941 990 1764.';
        return;
      }
      window.location.href = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(message(kind, details));
    });
  });
  render();
})();
