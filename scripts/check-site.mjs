import { chromium } from 'playwright'
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
})
const errors = []
const context = await browser.newContext({
  permissions: ['clipboard-read', 'clipboard-write'],
})
const page = await context.newPage()
page.on('pageerror', (e) => errors.push(e.message))
for (const width of [375, 768, 1024, 1440]) {
  await page.setViewportSize({ width, height: 1000 })
  await page.goto('http://127.0.0.1:5190/')
  await page.waitForTimeout(300)
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > innerWidth,
  )
  if (overflow) errors.push(`Horizontal overflow at ${width}`)
  const gradients = await page.evaluate(
    () =>
      [...document.querySelectorAll('*')].filter((e) =>
        getComputedStyle(e).backgroundImage.includes('gradient'),
      ).length,
  )
  if (gradients) errors.push(`Gradients at ${width}: ${gradients}`)
  const broken = await page
    .locator('img')
    .evaluateAll((imgs) =>
      imgs.filter((i) => !i.complete || !i.naturalWidth).map((i) => i.src),
    )
  errors.push(...broken)
  await page.screenshot({
    path: `/tmp/sloppy-site-${width}.png`,
    fullPage: true,
  })
}
await page.getByRole('button', { name: 'macOS app', exact: true }).click()
await page.waitForTimeout(200)
if (
  !(await page
    .locator('img[src="/promo/macos.jpg"]')
    .evaluate((e) => e.complete && e.naturalWidth > 0))
)
  errors.push('Native image missing')
await page.getByRole('button', { name: 'Copy install command' }).click()
if (
  (await page.evaluate(() => navigator.clipboard.readText())) !==
  'curl -fsSL https://sloppy.team/install.sh | bash'
)
  errors.push('Clipboard mismatch')
// Each platform must copy its own command and reset the old success state.
for (const [platform, command] of [
  ['Windows', 'irm https://sloppy.team/install.ps1 | iex'],
  ['macOS', 'curl -fsSL https://sloppy.team/install.sh | bash'],
  ['Linux', 'curl -fsSL https://sloppy.team/install.sh | bash'],
]) {
  const picker = page.getByRole('group', { name: 'Operating system' })
  await picker.getByRole('button', { name: platform, exact: true }).click()
  const copy = page.getByRole('button', { name: 'Copy install command' })
  if ((await copy.innerText()) !== 'Copy command') errors.push(`Stale copy status: ${platform}`)
  await copy.click()
  if ((await page.evaluate(() => navigator.clipboard.readText())) !== command)
    errors.push(`Clipboard mismatch: ${platform}`)
}
for (const [label, href] of [
  ['Download for macOS', 'https://github.com/TeamSloppy/Sloppy/releases/download/v2.5.1/Sloppy-macos-universal-2.5.0.dmg'],
  ['Download on the App Store', 'https://apps.apple.com/app/id6811777701'],
]) {
  if ((await page.getByRole('link', { name: label, exact: true }).first().getAttribute('href')) !== href)
    errors.push(`Wrong download destination: ${label}`)
}
// The public entry points must serve scripts rather than the SPA fallback.
for (const [path, marker] of [['/install.sh', '#!/usr/bin/env bash'], ['/install.ps1', '#Requires -Version 5.1']]) {
  const response = await page.request.get(`http://127.0.0.1:5190${path}`)
  if (!response.ok() || !(await response.text()).startsWith(marker)) errors.push(`Missing installer: ${path}`)
}
for (const route of [
  '/blog',
  '/news',
  '/blog/observable-agent-systems',
  '/not-a-page',
]) {
  await page.goto(`http://127.0.0.1:5190${route}`)
  if (!(await page.locator('h1').count()))
    errors.push(`Missing heading: ${route}`)
}
console.log(JSON.stringify({ errors }, null, 2))
await browser.close()
process.exitCode = errors.length ? 1 : 0
