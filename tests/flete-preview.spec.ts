import { expect, test, type Page } from '@playwright/test'

async function createRequest(page: Page) {
  await page.goto('demos/flete/')
  await page.locator('#quick-origin').fill('Centro')
  await page.locator('#quick-destination').fill('Barrio Norte')
  await page.getByRole('button', { name: 'Continuar', exact: true }).click()
  await expect(page.locator('.simple-stepper li')).toHaveCount(3)
  await page.getByRole('button', { name: 'Cajas', exact: true }).click()
  await page.getByRole('button', { name: 'Continuar', exact: true }).click()
  await page.locator('#name').fill('Ana')
  await page.locator('#phone').fill('+54 9 11 1234 5678')
  await page.locator('#consent').check()
  await page.getByRole('button', { name: 'Enviar solicitud', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Recibimos tu solicitud.' })).toBeVisible()
  return { code: await page.locator('.simple-reference strong').innerText(), token: new URL(page.url()).hash.split('/')[2] }
}

test('Flete simple: solicitud en tres pantallas, cotización y aceptación', async ({ page, context }, testInfo) => {
  test.skip(!['chromium-390', 'webkit-390'].includes(testInfo.project.name), 'Flujo completo canónico en mobile')
  test.setTimeout(90_000)
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  const { code, token } = await createRequest(page)
  expect(token).toMatch(/^[a-f0-9]{64}$/)
  await page.getByRole('button', { name: 'Abrir panel' }).click()
  await expect(page.getByRole('heading', { name: 'Ana' })).toBeVisible()
  await page.locator('#quote-amount').fill('45000,50')
  await page.getByRole('button', { name: 'Enviar cotización' }).click()
  await expect(page.locator('.quote-total')).toContainText('45.000,50')
  await page.locator('details.internal-notes-disclosure').evaluate((element: HTMLDetailsElement) => { element.open = true })
  await page.locator('#internal-note').fill('NOTA PRIVADA QA')
  await page.getByRole('button', { name: 'Guardar nota' }).click()

  const tracking = await context.newPage()
  await tracking.goto(`demos/flete/#/seguimiento/${token}`)
  await expect(tracking.getByText('TU COTIZACIÓN', { exact: true })).toBeVisible()
  await expect(tracking.locator('.simple-quote-amount')).toContainText('45.000,50')
  await expect(tracking.locator('body')).not.toContainText('NOTA PRIVADA QA')
  await tracking.getByRole('button', { name: 'Aceptar', exact: true }).click()
  await expect(tracking.getByRole('dialog')).toBeVisible()
  await tracking.getByRole('button', { name: 'Confirmar aceptación' }).click()
  await expect(tracking.getByRole('heading', { name: 'Cotización aceptada' })).toBeVisible()
  await page.reload()
  await expect(page.locator('.operator-accepted')).toContainText('El cliente aceptó')
  await expect(page.locator('body')).toContainText(code)
  expect(errors).toEqual([])
})

test('Flete mobile: compartir invoca share y actualizar relee el estado', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'share', { configurable: true, value: async (data: ShareData) => { (window as typeof window & { __shared?: ShareData }).__shared = data } })
  })
  await page.goto('demos/flete/#/demo')
  await page.getByRole('button', { name: 'Ver cotización lista' }).click()
  await page.getByRole('button', { name: 'Compartir seguimiento' }).click()
  await expect(page.getByRole('status')).toContainText('Enlace compartido.')
  const shared = await page.evaluate(() => (window as typeof window & { __shared?: ShareData }).__shared)
  expect(shared?.url).toContain('#/seguimiento/')
  await page.getByRole('button', { name: 'Actualizar' }).click()
  await expect(page.getByRole('status')).toContainText('Estado actualizado.')
  await expect(page.getByRole('button', { name: 'Actualizar' })).toBeEnabled()
})

test('Flete mobile: compartir ofrece copia manual si las APIs fallan', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'share', { configurable: true, value: undefined })
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined })
  })
  await page.goto('demos/flete/#/demo')
  await page.getByRole('button', { name: 'Ver cotización lista' }).click()
  await page.getByRole('button', { name: 'Compartir seguimiento' }).click()
  await expect(page.getByRole('status')).toContainText('Enlace listo para copiar.')
  await expect(page.locator('#copy-link')).toBeVisible()
  await expect(page.locator('#copy-link')).toBeFocused()
  await expect(page.locator('#copy-link')).toHaveValue(/#\/seguimiento\/[a-f0-9]{64}$/)
})

test('Flete: modal se cierra y devuelve el foco en WebKit/iPhone', async ({ page }) => {
  await page.goto('demos/flete/#/demo')
  await page.getByRole('button', { name: 'Ver cotización lista' }).click()
  const accept = page.getByRole('button', { name: 'Aceptar', exact: true })
  await accept.click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(accept).toBeFocused()
})
