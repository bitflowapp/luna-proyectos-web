import { expect, test } from '@playwright/test'

test('carousel: swiping the track changes the active screen and the tab', async ({ page }) => {
  await page.goto('./')
  const track = page.locator('#taba .shots-track')
  await track.scrollIntoViewIfNeeded()
  await expect(page.locator('#taba .shot-slide.is-active img')).toHaveAttribute('src', /taba-(desktop|mobile)/)
  await track.evaluate(el => el.scrollTo({ left: el.scrollWidth, behavior: 'instant' }))
  await expect(page.locator('#taba .shot-slide.is-active img')).toHaveAttribute('src', /taba-rider/)
  await expect(page.locator('#taba').getByRole('button', { name: 'Reparto', exact: true })).toHaveAttribute('aria-pressed', 'true')
})

test('carousel: the track is keyboard focusable and a "probá vos" demo link is present', async ({ page }) => {
  await page.goto('./')
  const track = page.locator('#taba .shots-track')
  await expect(track).toHaveAttribute('tabindex', '0')
  const demo = page.getByRole('link', { name: /Probá vos/ })
  await expect(demo).toHaveAttribute('href', 'https://bitflowapp.github.io/luna-catalogo-demo-preview/')
  await expect(demo).toHaveAttribute('rel', /noopener/)
})

test('reveal: with motion allowed, content appears while scrolling and nothing stays hidden', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'no-preference', viewport: { width: 390, height: 844 } })
  const page = await context.newPage()
  await page.goto('./')
  await expect(page.locator('html')).toHaveClass(/reveal-ready/)
  const hidden = () => page.evaluate(() => document.querySelectorAll('[data-reveal]:not([data-in])').length)
  expect(await hidden()).toBeGreaterThan(0)
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < height; y += 500) {
    await page.evaluate(top => window.scrollTo(0, top), y)
    await page.waitForTimeout(60)
  }
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
  await expect.poll(hidden, { timeout: 5000 }).toBe(0)
  await context.close()
})

test('reveal: with reduced motion nothing is hidden or animated', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 390, height: 844 } })
  const page = await context.newPage()
  await page.goto('./')
  await expect(page.locator('html')).not.toHaveClass(/reveal-ready/)
  const opacity = await page.locator('#precios [data-reveal]').first().evaluate(el => getComputedStyle(el).opacity)
  expect(opacity).toBe('1')
  await context.close()
})

test('legibility: no visible text under 12px, body copy at 16px, actions thumb-sized', async ({ page }) => {
  await page.goto('./')
  await page.evaluate(() => document.querySelectorAll('details').forEach(d => d.setAttribute('open', '')))
  const small = await page.evaluate(() => {
    const out: string[] = []
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    while (walker.nextNode()) {
      const node = walker.currentNode
      const el = node.parentElement
      if (!node.textContent?.trim() || !el || el.closest('dialog')) continue
      const rect = el.getBoundingClientRect()
      if (!rect.width || !rect.height) continue
      const size = parseFloat(getComputedStyle(el).fontSize)
      if (size < 12 && !el.closest('.brand')) out.push(`${size}px ${el.className} "${node.textContent.trim().slice(0, 30)}"`)
    }
    return out
  })
  expect(small).toEqual([])
  const body = await page.locator('.hero-description').evaluate(el => parseFloat(getComputedStyle(el).fontSize))
  expect(body).toBeGreaterThanOrEqual(16)
  for (const el of await page.locator('.button').all()) {
    if (await el.isVisible()) expect((await el.boundingBox())!.height).toBeGreaterThanOrEqual(48)
  }
})

test('team: places for real photos are prepared and illustrations are decorative', async ({ page }) => {
  await page.goto('./')
  const portraits = page.locator('#nosotros .portrait')
  await expect(portraits).toHaveCount(2)
  await expect(portraits.nth(0)).toContainText('Marco')
  await expect(portraits.nth(1)).toContainText('Sofía')
  await expect(portraits.locator('svg[aria-hidden="true"]')).toHaveCount(2)
})
