import { expect, test, type Page } from '@playwright/test'
import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

async function fits(page: Page) {
  const width = page.viewportSize()?.width ?? 1440
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1)
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflowX)).not.toBe('hidden')
}

test('Flete simple: portada directa, tres etapas y controles táctiles', async ({ page }) => {
  await page.goto('demos/flete/')
  await expect(page.getByRole('heading', { name: 'Pedí tu traslado' })).toBeVisible()
  await expect(page.getByText('Indicá origen y destino. Te enviamos una cotización.')).toBeVisible()
  await expect(page.locator('.mode-banner')).toHaveText(/Demo comercial · datos ficticios/)
  await expect(page.locator('.simple-request-card')).toBeVisible()
  await expect(page.locator('.mobile-request-bar')).toHaveCount(0)
  await fits(page)

  await page.locator('#quick-origin').fill('Centro')
  await page.locator('#quick-destination').fill('Barrio Norte')
  await page.getByRole('button', { name: 'Continuar', exact: true }).click()
  await expect(page.getByText('Paso 2 de 3')).toBeVisible()
  await expect(page.locator('.simple-stepper li')).toHaveCount(3)
  await expect(page.getByRole('button', { name: 'Agregar más detalles' })).toBeVisible()
  await expect(page.locator('.optional-details')).toHaveCount(0)
  await fits(page)

  if ((page.viewportSize()?.width ?? 0) <= 430) {
    const tooSmall = await page.locator('main button:visible, main input:not([type=checkbox]):visible, main select:visible, main textarea:visible').evaluateAll(elements => elements.filter(element => {
      const rect = element.getBoundingClientRect()
      return rect.width > 0 && rect.height > 0 && rect.height < 47
    }).map(element => `${element.tagName}:${element.textContent?.trim()}`))
    expect(tooSmall).toEqual([])
    const smallInputs = await page.locator('input:visible, select:visible, textarea:visible').evaluateAll(elements => elements.filter(element => parseFloat(getComputedStyle(element).fontSize) < 16).length)
    expect(smallInputs).toBe(0)
  }
})

test('Flete simple: pasajeros y detalles progresivos', async ({ page }) => {
  await page.goto('demos/flete/')
  await page.getByRole('button', { name: 'Pasajeros', exact: true }).click()
  await page.locator('#quick-origin').fill('Centro')
  await page.locator('#quick-destination').fill('Barrio Norte')
  await page.getByRole('button', { name: 'Continuar', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Pasajeros' })).toBeVisible()
  await page.getByRole('button', { name: '4+', exact: true }).click()
  await page.getByRole('button', { name: 'Mucho', exact: true }).click()
  await page.getByRole('button', { name: 'Ida y vuelta', exact: true }).click()
  await expect(page.locator('#return_at')).toBeVisible()
})

test('Flete simple: guía de cinco pasos y panel orientado a pendientes', async ({ page }) => {
  await page.goto('demos/flete/#/demo')
  await expect(page.getByRole('button', { name: 'Empezar recorrido' })).toBeVisible()
  await expect(page.locator('.simple-demo-steps .demo-flow-step')).toHaveCount(5)
  await expect(page.locator('.simple-demo-steps')).toContainText('Cliente pide')
  await expect(page.locator('.simple-demo-steps')).toContainText('Servicio listo')
  await page.goto('demos/flete/#/admin')
  await expect(page.getByRole('heading', { name: '¿Qué tenés que atender?' })).toBeVisible()
  await expect(page.locator('.simple-owner-metrics .metric')).toHaveCount(3)
  await expect(page.locator('.simple-owner-metrics')).toContainText('Nuevas solicitudes')
  await expect(page.locator('.simple-owner-metrics')).toContainText('Cotizaciones aceptadas')
  await expect(page.locator('.simple-owner-metrics')).toContainText('Servicios en curso')
  await page.locator('.simple-owner-row').first().getByRole('button', { name: 'Ver' }).click()
  await expect(page.locator('.owner-request-summary')).toBeVisible()
  await expect(page.locator('#quote-amount')).toBeVisible()
  await expect(page.locator('#assign-vehicle')).toBeVisible()
  await expect(page.getByText('Cambiar estado', { exact: true })).toBeVisible()
  await fits(page)
})

test('Flete QA visual: doce estados clave', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'webkit-390', 'Capturas canónicas en WebKit 390')
  const dir = resolve('artifacts/flete-ux-screenshots')
  mkdirSync(dir, { recursive: true })
  const shot = async (name: string) => page.screenshot({ path: resolve(dir, `${name}.png`), fullPage: true, animations: 'disabled' })

  await page.goto('demos/flete/')
  await shot('01-home-mobile')
  await page.locator('#quick-origin').fill('Centro')
  await page.locator('#quick-destination').fill('Barrio Norte')
  await shot('02-form-paso-1')
  await page.getByRole('button', { name: 'Continuar', exact: true }).click()
  await page.getByRole('button', { name: 'Cajas', exact: true }).click()
  await shot('03-form-paso-2')
  await page.getByRole('button', { name: 'Continuar', exact: true }).click()
  await page.locator('#name').fill('Ana')
  await page.locator('#phone').fill('+54 9 11 1234 5678')
  await page.locator('#consent').check()
  await shot('04-form-paso-3')
  await page.getByRole('button', { name: 'Enviar solicitud' }).click()
  await expect(page.getByRole('heading', { name: 'Recibimos tu solicitud.' })).toBeVisible()
  await shot('05-solicitud-enviada')
  await shot('06-tracking-esperando')
  await page.getByRole('button', { name: 'Abrir panel' }).click()
  await page.locator('#quote-amount').fill('45000')
  await page.getByRole('button', { name: 'Enviar cotización' }).click()
  await page.getByRole('button', { name: 'Ver seguimiento del cliente' }).click()
  await shot('07-tracking-cotizacion')
  await page.getByRole('button', { name: 'Aceptar', exact: true }).click()
  await shot('08-modal-aceptar')
  await page.getByRole('button', { name: 'Confirmar aceptación' }).click()
  await expect(page.getByRole('heading', { name: 'Cotización aceptada' })).toBeVisible()
  await shot('09-tracking-aceptada')
  await page.goto('demos/flete/#/admin')
  await shot('10-panel-mobile')
  await page.setViewportSize({ width: 1440, height: 1000 })
  await shot('11-panel-desktop')
  await page.locator('.simple-owner-row').first().getByRole('button', { name: 'Ver' }).click()
  await shot('12-detalle-operador')
})
