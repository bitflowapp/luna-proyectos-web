import { expect, test } from '@playwright/test'

const CREDENTIAL = 'Marco es ingeniero eléctrico e instrumentista, con experiencia en protección catódica, puesta a tierra y proyectos industriales. Hablamos tu idioma técnico.'

test('rubros: 2x2 grid, each one opens with its case and a prefilled WhatsApp message', async ({ page }) => {
  await page.goto('./')
  const section = page.locator('#rubros')
  await expect(section.getByRole('heading', { level: 2 })).toContainText('¿Qué negocio tenés?')
  await expect(section.locator('details.rubro')).toHaveCount(4)
  const expected = [
    ['gastronomia', 'Gastronomía', '#taba', /gastronom/i],
    ['comercio', 'Comercio, almacén o kiosco', '#catalogo', /comercio/i],
    ['oficios', 'Oficios', '#oficio', /oficio/i],
    ['industria', 'Industria y energía', null, /industria\/energía/i],
  ] as const
  for (const [key, title, caseHref, message] of expected) {
    const rubro = section.locator(`details[data-rubro="${key}"]`)
    await expect(rubro.locator('summary')).toContainText(title)
    await expect(rubro).not.toHaveAttribute('open', '')
    await rubro.locator('summary').click()
    await expect(rubro).toHaveAttribute('open', '')
    if (caseHref) {
      await expect(rubro.locator('a.rubro-case')).toHaveAttribute('href', caseHref)
      await expect(page.locator(caseHref)).toHaveCount(1)
    } else {
      await expect(rubro.locator('a.rubro-case')).toHaveCount(0)
    }
    const href = (await rubro.locator('a[href*="wa.me"]').getAttribute('href'))!
    expect(href).toMatch(/^https:\/\/wa\.me\/5492996209136\?text=/)
    expect(decodeURIComponent(href)).toMatch(message)
  }
})

test('rubros: closed state shows a 2x2 grid of thumb-sized tiles without horizontal overflow', async ({ page }) => {
  await page.goto('./')
  await page.locator('#rubros').scrollIntoViewIfNeeded()
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  const tiles = await page.locator('#rubros details.rubro summary').all()
  expect(tiles).toHaveLength(4)
  const boxes = await Promise.all(tiles.map(tile => tile.boundingBox()))
  for (const box of boxes) expect(box!.height).toBeGreaterThanOrEqual(48)
  if (page.viewportSize()!.width < 700) {
    expect(Math.abs(boxes[0]!.y - boxes[1]!.y)).toBeLessThan(2)
    expect(boxes[2]!.y).toBeGreaterThan(boxes[0]!.y + boxes[0]!.height - 1)
  }
})

test('rubros: opening one closes the previous; the open one spans the full width', async ({ page }) => {
  await page.goto('./')
  const first = page.locator('details[data-rubro="gastronomia"]')
  const second = page.locator('details[data-rubro="oficios"]')
  await first.locator('summary').click()
  await second.locator('summary').click()
  await expect(second).toHaveAttribute('open', '')
  await expect(first).not.toHaveAttribute('open', '')
  const width = (await second.boundingBox())!.width
  const grid = (await page.locator('.rubros-grid').boundingBox())!.width
  expect(width).toBeGreaterThan(grid * 0.95)
})

test('industria y energía: names real use cases, carries the credential and does not link to Bit Flow', async ({ page }) => {
  await page.goto('./')
  const rubro = page.locator('details[data-rubro="industria"]')
  await rubro.locator('summary').click()
  for (const word of ['registros de campo', 'inspecciones', 'mantenimiento', 'reportes técnicos']) {
    await expect(rubro).toContainText(word)
  }
  await expect(rubro).toContainText(CREDENTIAL)
  await expect(rubro.locator('a[href="#bit-flow"]')).toHaveCount(0)
  await expect(rubro).not.toContainText(/\d+\s?%/)
  await expect(page.locator('#nosotros')).toContainText(CREDENTIAL)
})
