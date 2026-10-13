import { expect, test } from '@playwright/test'

test('cases: expected result is a benefit, never an invented number, and each case ends with a WhatsApp micro-CTA', async ({ page }) => {
  await page.goto('./')
  for (const id of ['taba', 'oficio', 'catalogo']) {
    const section = page.locator(`#${id}`)
    await expect(section).toContainText('LO QUE ESPERÁS GANAR')
    const cta = section.getByRole('link', { name: '¿Algo así para tu negocio?' })
    await expect(cta).toHaveAttribute('href', /^https:\/\/wa\.me\/5492996209136\?text=/)
    expect(await cta.boundingBox().then(b => b!.height)).toBeGreaterThanOrEqual(48)
    await expect(section).not.toContainText(/\d+\s?%|\d+\s?(horas|hs)\b/i)
  }
})

test('Bit Flow: sold and delivered, problem/solution/result, still no links, buttons or media', async ({ page }) => {
  await page.goto('./')
  const section = page.locator('#bit-flow')
  await expect(section).toContainText('VENDIDO Y ENTREGADO')
  await expect(section).toContainText('EL PROBLEMA')
  await expect(section).toContainText('LA SOLUCIÓN')
  await expect(section).toContainText('LO QUE ESPERÁS GANAR')
  await expect(section.locator('a, button, img, video, iframe')).toHaveCount(0)
})

test('pricing: three solution types, no placeholder leaks, honest terms', async ({ page }) => {
  await page.goto('./')
  const section = page.locator('#precios')
  await expect(section.getByRole('heading', { level: 2 })).toContainText('¿Cuánto sale?')
  await expect(section.locator('article.pricing-card')).toHaveCount(3)
  for (const title of ['Catálogo o tienda', 'Sistema de gestión', 'App a medida']) {
    await expect(section.getByRole('heading', { name: title })).toBeVisible()
  }
  await expect(section).toContainText('Primera charla sin cargo')
  await expect(section).toContainText('Pago por etapas')
  await expect(section).toContainText('Soporte después de entregar')
  // [COMPLETAR] nunca debe llegar al público
  expect(await page.locator('body').innerText()).not.toContain('[COMPLETAR]')
  expect(await page.content()).not.toContain('[COMPLETAR]')
  for (const link of await section.locator('a[href*="wa.me"]').all()) {
    await expect(link).toHaveAttribute('href', /^https:\/\/wa\.me\/5492996209136\?text=/)
  }
})

test('social proof: verifiable facts, zero invented testimonials', async ({ page }) => {
  await page.goto('./')
  const proof = page.locator('section.proof')
  await expect(proof).toContainText('De Neuquén')
  await expect(proof).toContainText('Personas reales')
  await expect(proof).toContainText('vendido y entregado')
  await expect(proof.locator('blockquote')).toHaveCount(0)
  await expect(page.locator('body')).not.toContainText(/testimonio|nos cambió la vida|clientes satisfechos/i)
})

test('FAQ answers the real objections: time, code ownership, failures, mobile, monthly fee', async ({ page }) => {
  await page.goto('./')
  const faq = page.locator('.faq')
  for (const q of ['¿Cuánto tarda?', '¿El código es mío?', '¿Qué pasa si algo falla?', '¿Funciona en el celular?', '¿Hay que pagar mensualidad?']) {
    const item = faq.locator('details', { has: page.locator('summary', { hasText: q }) })
    await expect(item).toHaveCount(1)
    await item.locator('summary').click()
    await expect(item.locator('p')).toBeVisible()
  }
  await expect(faq.getByRole('link', { name: /Preguntanos/ })).toHaveAttribute('href', /wa\.me\/5492996209136/)
})

test('Flete demo link opens a working page', async ({ page, request }) => {
  await page.goto('./')
  const link = page.getByRole('link', { name: /Probar la demo de Flete/ })
  await expect(link).toHaveAttribute('data-track', 'demo-flete')
  const href = (await link.getAttribute('href'))!
  expect((await request.get(href)).status()).toBe(200)
  await page.goto(href)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
})
