// 產生分享預覽圖 public/og.png（1200×630）。需要 Playwright：
//   PLAYWRIGHT=路徑/node_modules/playwright node scripts/make-og.cjs
const path = require('path');
const { chromium } = require(process.env.PLAYWRIGHT || 'playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.goto('file://' + path.join(__dirname, 'og.html').replace(/\\/g, '/'), { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(__dirname, '..', 'public', 'og.png') });
  await browser.close();
  console.log('public/og.png');
})();
