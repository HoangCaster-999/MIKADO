const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const path = require('node:path');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await context.route(/^https?:\/\//, route => route.abort());
  let opened = null;
  await page.addInitScript(() => { window.open = (u) => { window.__opened = u; }; });
  await page.goto('file:///' + path.resolve('index.html').replaceAll('\\', '/'), { waitUntil: 'domcontentloaded' });
  const dish = page.locator('.dish').first();
  await dish.locator('select').selectOption('0');
  await dish.locator('[data-add]').click();

  // Cancel keeps pickup
  await page.locator('.order-mode label').nth(1).click();
  assert.equal(await page.locator('#delivery-dialog').isVisible(), true);
  await page.screenshot({ path: 'output/delivery-dialog-mobile.png' });
  await page.getByRole('button', { name: 'Abbrechen' }).click();
  assert.equal(await page.locator('#address-field').isVisible(), false);
  assert.equal(await page.locator('input[value="pickup"]').isChecked(), true);

  // Accept switches to delivery
  await page.locator('.order-mode label').nth(1).click();
  await page.getByRole('button', { name: 'Einverstanden' }).click();
  assert.equal(await page.locator('#address-field').isVisible(), true);
  assert.match(await page.locator('#cart-total').textContent(), /6,70/);

  const form = page.locator('#order-form');
  await form.locator('[name=name]').fill('Test');
  await form.locator('[name=phone]').fill('0123');
  await form.locator('[name=date]').fill('2099-01-01');
  await form.locator('[name=time]').fill('18:00');
  await form.locator('[name=address]').fill('Teststr. 1, 26603 Aurich');
  await form.locator('button[type=submit]').click();
  assert.match(await form.locator('.request-error').textContent(), /Mindestbestellwert/);

  for (let i = 0; i < 6; i++) await dish.locator('[data-add]').click();
  await form.locator('button[type=submit]').click();
  const msg = decodeURIComponent(await page.evaluate(() => window.__opened));
  assert.match(msg, /Bestellanfrage \(Lieferung\)/);
  assert.match(msg, /Liefergebühr: 2,00/);
  assert.match(msg, /Lieferadresse: Teststr/);
  assert.match(msg, /nur bar/);
  await page.locator('#bestellen').screenshot({ path: 'output/delivery-form-mobile.png' });
  assert.deepEqual(errors, []);
  console.log(msg);
  await browser.close();
})();
