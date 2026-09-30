import { chromium } from 'playwright'
import { fixture } from './promo-fixtures.mjs'
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
})
const context = await browser.newContext({
  viewport: { width: 1440, height: 980 },
  deviceScaleFactor: 1,
})
await context.route('**/*', async (route) => {
  const url = new URL(route.request().url())
  if (url.pathname.startsWith('/v1/') || url.pathname === '/health')
    return route.fulfill({ json: fixture(url.pathname) })
  // Never allow a capture to contact a live Core or an external service.
  if (
    url.origin !== 'http://127.0.0.1:5178' &&
    !url.hostname.endsWith('googleapis.com') &&
    !url.hostname.endsWith('gstatic.com')
  )
    return route.abort()
  return route.continue()
})
const page = await context.newPage()
page.on('pageerror', (e) => console.error(e.message))
await page.goto(
  'http://127.0.0.1:5178/agents/sloppy/overview?apiBase=http://127.0.0.1:5181',
)
await page.waitForTimeout(3500)
await page.getByRole('heading', { name: 'Sloppie', exact: true }).waitFor()
await page.addStyleTag({
  content: '.agent-pet-stat-fill { background: #52cbe9 !important; }',
})
await page.screenshot({
  path: 'public/promo/dashboard.jpg',
  type: 'jpeg',
  quality: 90,
})
await browser.close()
