import { expect, test } from '@playwright/test'

const WA = /^https:\/\/wa\.me\/5492996209136\?text=.+/

test('every WhatsApp link has the number, a prefilled message, noopener and an analytics event', async ({ page }) => {
  await page.goto('./')
  const links = page.locator('a[href*="wa.me"]')
  expect(await links.count()).toBeGreaterThanOrEqual(8)
  for (const link of await links.all()) {
    await expect(link).toHaveAttribute('href', WA)
    await expect(link).toHaveAttribute('rel', /noopener/)
    await expect(link).toHaveAttribute('data-track', /^whatsapp-/)
  }
})

test('floating bubble opens with quick questions, closes with Escape and is the only floating contact element', async ({ page }) => {
  await page.goto('./')
  const toggle = page.getByRole('button', { name: /Tenés una duda/ })
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  await expect(page.locator('#bubble-panel')).toBeHidden()
  await toggle.click()
  const panel = page.locator('#bubble-panel')
  await expect(panel).toBeVisible()
  const chip = panel.getByRole('link', { name: '¿Cuánto sale un catálogo?' })
  const href = await chip.getAttribute('href')
  expect(decodeURIComponent(href!)).toContain('¿Cuánto sale un catálogo?')
  await page.keyboard.press('Escape')
  await expect(panel).toBeHidden()
  await expect(toggle).toBeFocused()
  const fixed = await page.evaluate(() => Array.from(document.querySelectorAll('body *')).filter(el => getComputedStyle(el).position === 'fixed' && !el.classList.contains('skip-link')).map(el => el.className))
  expect(fixed).toEqual(['bubble'])
})

test('hero CTA and quick chips are visible without scrolling and large enough for a thumb', async ({ page }) => {
  await page.goto('./')
  const height = page.viewportSize()!.height
  const cta = page.locator('.hero').getByRole('link', { name: /Escribinos por WhatsApp/ })
  const box = (await cta.boundingBox())!
  expect(box.y + box.height).toBeLessThanOrEqual(height)
  expect(box.height).toBeGreaterThanOrEqual(48)
  for (const link of await page.locator('.hero-chips .chip').all()) {
    expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(48)
  }
})

test('qualification form only builds the WhatsApp link, it sends nothing', async ({ page }) => {
  const requests: string[] = []
  page.on('request', request => { if (request.method() !== 'GET') requests.push(request.url()) })
  await page.goto('./')
  const form = page.locator('form.qualify')
  await form.getByLabel('Tu rubro').selectOption('Oficios')
  await form.getByLabel('¿Qué querés resolver?').fill('presupuestos que se me pierden')
  await form.getByLabel('¿Qué tan urgente es?').selectOption('Lo antes posible')
  const link = form.getByRole('link', { name: /Abrir WhatsApp con este mensaje/ })
  const text = decodeURIComponent((await link.getAttribute('href'))!.split('text=')[1])
  expect(text).toBe('Hola, vengo de la web de LUNA. Mi rubro: Oficios. Quiero resolver: presupuestos que se me pierden. Urgencia: Lo antes posible.')
  await expect(form.locator('.qualify-preview')).toContainText('presupuestos que se me pierden')
  await expect(form).not.toHaveAttribute('action', /.+/)
  expect(requests).toEqual([])
})

test('analytics events fire for WhatsApp, Instagram and demo clicks', async ({ page }) => {
  await page.addInitScript(() => {
    ;(window as any).__events = []
    ;(window as any).goatcounter = { count: (v: { path: string }) => (window as any).__events.push(v.path) }
    document.addEventListener('click', e => { if ((e.target as Element).closest('a[target="_blank"]')) e.preventDefault() }, true)
  })
  await page.goto('./')
  await page.locator('.hero').getByRole('link', { name: /Escribinos por WhatsApp/ }).click()
  await page.locator('#contacto').getByRole('link', { name: /Instagram/ }).click()
  await page.getByRole('link', { name: 'PROBAR DEMO' }).click()
  const events = await page.evaluate(() => (window as any).__events)
  expect(events).toEqual(['whatsapp-hero', 'instagram', 'demo-catalogo'])
})
