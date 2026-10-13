import { expect, test } from '@playwright/test'

test('rubros: four businesses, each with its case and a prefilled WhatsApp message', async ({ page }) => {
  await page.goto('./')
  const section = page.locator('#rubros')
  await expect(section.getByRole('heading', { level: 2 })).toContainText('¿Qué negocio tenés?')
  const cards = section.locator('article.rubro-card')
  await expect(cards).toHaveCount(4)
  const expected = [
    ['Gastronomía', '#taba', /gastronom/i],
    ['Comercio, almacén o kiosco', '#catalogo', /comercio/i],
    ['Oficios', '#oficio', /oficio/i],
    ['Industria y energía', '#bit-flow', /industria\/energía/i],
  ] as const
  for (const [title, caseHref, message] of expected) {
    const card = cards.filter({ has: page.getByRole('heading', { name: title, exact: true }) })
    await expect(card).toHaveCount(1)
    await expect(card.locator('a.rubro-case')).toHaveAttribute('href', caseHref)
    await expect(page.locator(caseHref)).toHaveCount(1)
    const href = (await card.locator('a[href*="wa.me"]').getAttribute('href'))!
    expect(href).toMatch(/^https:\/\/wa\.me\/5492996209136\?text=/)
    expect(decodeURIComponent(href)).toMatch(message)
  }
})

test('rubros: industry and energy names its use cases without inventing results', async ({ page }) => {
  await page.goto('./')
  const card = page.locator('#rubros article.rubro-card', { hasText: 'Industria y energía' })
  for (const word of ['registros de campo', 'inspecciones', 'mantenimiento', 'reportes técnicos']) {
    await expect(card).toContainText(word)
  }
  await expect(card).not.toContainText(/\d+\s?%/)
})

test('rubros: no horizontal overflow and thumb-sized actions', async ({ page }) => {
  await page.goto('./')
  await page.locator('#rubros').scrollIntoViewIfNeeded()
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  for (const el of await page.locator('#rubros .button, #rubros .rubro-case').all()) {
    expect((await el.boundingBox())!.height).toBeGreaterThanOrEqual(48)
  }
})
