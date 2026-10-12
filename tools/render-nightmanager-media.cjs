// Render exact product screenshots in HTML/CSS; no generative changes to the UI.
// Usage: PLAYWRIGHT_MODULE=/path/to/playwright node tools/render-nightmanager-media.cjs
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const asset = (file) => {
  const bytes = fs.readFileSync(path.join(root, 'assets', file));
  return `data:image/png;base64,${bytes.toString('base64')}`;
};
const base = `<meta charset="utf-8"><style>
*{box-sizing:border-box}html,body{margin:0;background:transparent;font-family:Arial,Helvetica,sans-serif}
figure{margin:0}img{display:block}
.mobile{width:1440px;padding:48px 80px 56px;display:flex;justify-content:space-between;gap:80px}
.mobile figure{width:340px;text-align:center}
.phone{width:280px;margin:auto;padding:8px;background:#25252b;border:1px solid #68686c;border-radius:34px;box-shadow:0 18px 32px #071c1928}
.phone img{width:100%;height:auto;border-radius:26px}
.mobile figcaption{display:inline-flex;align-items:center;gap:12px;margin-top:32px;padding:13px 22px;border:1px solid #346556;border-radius:30px;background:#153d33;color:#e9fff5;font-size:23px;font-weight:700}
.mobile figcaption span{color:#8fe4bb;font-size:16px}
.desktop{width:1440px;height:750px;padding:50px 60px;background:linear-gradient(125deg,#103d32,#194e3d 60%,#256049);border-radius:24px;color:#effff8;overflow:hidden}
.eyebrow{font-size:15px;letter-spacing:3px;color:#a9e8c9;font-weight:700;margin:0 0 12px}
h1{font-size:42px;line-height:1.15;margin:0 0 28px;letter-spacing:-1px}
.window{border:1px solid #6fa68c;border-radius:14px;overflow:hidden;background:#0b1511;box-shadow:0 24px 44px #001c1b60}
.window-bar{height:32px;display:flex;align-items:center;gap:7px;padding-left:14px;background:#16382e;border-bottom:1px solid #406a56}
.window-bar i{width:7px;height:7px;border-radius:50%;background:#8abd9f}
.window img{width:100%;height:auto}
.desktop.shop{height:750px;display:grid;grid-template-columns:370px 1fr;gap:28px;padding-top:40px;padding-bottom:40px;align-items:center}
.shop .copy h1{font-size:52px}
.shop .footer{line-height:1.5}
.footer{font-size:20px;color:#b8ead1;margin:26px 0 0}
</style>`;
const mobile = base + `<main class="mobile">${[
  ['mobile-sales.png', '01', 'Verkauf'],
  ['mobile-tickets.png', '02', 'Meine Tickets'],
  ['mobile-checkin.png', '03', 'Check-in'],
].map(([file, number, label]) => `<figure><div class="phone"><img src="${asset('nightmanager-source/' + file)}" alt="${label}"></div><figcaption><span>${number}</span>${label}</figcaption></figure>`).join('')}</main>`;
const desktop = (title, file, caption, extra = '') => extra === 'shop'
  ? base + `<main class="desktop shop"><div class="copy"><p class="eyebrow">NACHTMANAGER</p><h1>${title}</h1><p class="footer">${caption}</p></div><div class="window"><div class="window-bar"><i></i><i></i><i></i></div><img src="${asset(file)}" alt="${title}"></div></main>`
  : base + `<main class="desktop ${extra}"><p class="eyebrow">NACHTMANAGER · SYSTEMANSICHT</p><h1>${title}</h1><div class="window"><div class="window-bar"><i></i><i></i><i></i></div><img src="${asset(file)}" alt="${title}"></div><p class="footer">${caption}</p></main>`;
(async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1200 }, deviceScaleFactor: 1.5 });
    for (const [name, html, selector, transparent] of [
      ['nightmanager-mobile.png', mobile, '.mobile', true],
      ['nightmanager-event.png', desktop('Eventplanung', 'nightmanager-app.png', 'Events · Gästelisten · Check-in · Team'), '.desktop', false],
      ['nightmanager-sales.png', desktop('Ticketverkauf', 'nightmanager-source/desktop-sales.png', 'Ticketarten · Verkaufsphasen · Bestände'), '.desktop', false],
      ['nightmanager-shop.png', desktop('Ticketshop', 'nightmanager-source/desktop-shop.png', 'Ticketwahl · Kundenportal · Zahlung', 'shop'), '.desktop', false],
    ]) {
      await page.setContent(html);
      await page.locator('img').evaluateAll(async imgs => Promise.all(imgs.map(i => i.decode())));
      await page.locator(selector).screenshot({ path: path.join(root, 'assets', name), omitBackground: transparent });
      console.log(name);
    }
  } finally {
    await browser.close();
  }
})();
