import { expect, test, type Page } from '@playwright/test'

async function visibleContentFits(page: Page) {
  const width = page.viewportSize()?.width ?? 1440
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1)
  // No se acepta esconder un desborde global para hacer pasar la prueba.
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflowX)).not.toBe('hidden')
  const outside = await page.locator('main h1, main h2, main h3, main input:not([type=checkbox]), main select, main textarea, main .button, .mode-banner').evaluateAll(elements =>
    elements.filter(el => {
      const r = el.getBoundingClientRect()
      const css = getComputedStyle(el)
      return r.width > 0 && r.height > 0 && css.visibility !== 'hidden' && !el.closest('.table-wrap') &&
        (r.left < -1 || r.right > window.innerWidth + 1)
    }).map(el => el.outerHTML.slice(0, 180)))
  expect(outside).toEqual([])
}

test('Flete acabado: portada y acciones reales, sin ocultar desbordes', async ({ page }, testInfo) => {
  const errors: string[] = []
  page.on('pageerror', e => errors.push(e.message))
  await page.goto('demos/flete/')
  await expect(page.locator('meta[name="flete-release"]')).toHaveAttribute('content', '0.4.0')
  await expect(page.locator('.mode-banner')).toContainText('datos ficticios')
  await expect(page.locator('.mode-banner')).toContainText('no se coordinan viajes reales')
  await expect(page.locator('.service-card')).toHaveCount(3)
  await expect(page.locator('.public-header .brand-word')).toContainText('Flete')
  await expect(page.locator('.public-header .brand-word')).not.toContainText('Demo')
  await visibleContentFits(page)
  await page.screenshot({ path: testInfo.outputPath('01-home.png'), fullPage: true, animations: 'disabled' })
  await page.locator('.service-passengers').click()
  await expect(page.getByRole('heading', { name: '¿Qué necesitás trasladar?' })).toBeVisible()
  await expect(page.locator('.service-choice[aria-pressed=true]')).toContainText('Traslado de pasajeros')
  await visibleContentFits(page)
  await page.screenshot({ path: testInfo.outputPath('02-wizard.png'), fullPage: true, animations: 'disabled' })
  expect(errors).toEqual([])
})

test('Flete acabado: volver a un paso conserva el recorrido y el servicio', async ({ page }) => {
  await page.goto('demos/flete/')
  await page.locator('#quick-origin').fill('Punto de retiro de prueba, acceso por la entrada lateral')
  await page.locator('#quick-destination').fill('Punto de entrega de prueba, departamento 2')
  await page.locator('.quick-kind').getByRole('button', { name: 'Pasajeros', exact: true }).click()
  await page.getByRole('button', { name: 'Continuar solicitud', exact: true }).click()
  await expect(page.getByRole('heading', { name: '¿Cuándo lo necesitás?' })).toBeVisible()
  await page.getByRole('button', { name: 'Volver al paso 2: Recorrido', exact: true }).click()
  await expect(page.locator('#origin')).toHaveValue('Punto de retiro de prueba, acceso por la entrada lateral')
  await expect(page.locator('#destination')).toHaveValue('Punto de entrega de prueba, departamento 2')
  await page.getByRole('button', { name: 'Continuar', exact: true }).click()
  await expect(page.getByRole('heading', { name: '¿Cuándo lo necesitás?' })).toBeVisible()
  await page.reload()
  await expect(page.locator('.wizard-aside')).toContainText('Punto de entrega de prueba')
  await expect(page.locator('.wizard-aside')).toContainText('Traslado de pasajeros')
  await page.getByRole('button', { name: 'Editar recorrido', exact: true }).click()
  await expect(page.locator('#origin')).toHaveValue('Punto de retiro de prueba, acceso por la entrada lateral')
  await visibleContentFits(page)
})

test('Flete acabado: bandeja priorizada y detalle accionable', async ({ page }, testInfo) => {
  await page.goto('demos/flete/#/admin')
  await expect(page.locator('.metrics-grid .metric')).toHaveCount(4)
  await expect(page.locator('.needs-attention')).toContainText('Requiere atención')
  await expect(page.locator('.attention-row')).toHaveCount(3)
  await expect(page.locator('.attention-row').first()).toContainText('Preparar cotización')
  await visibleContentFits(page)
  await page.screenshot({ path: testInfo.outputPath('03-operaciones.png'), fullPage: true, animations: 'disabled' })
  await page.locator('.attention-row').first().click()
  await expect(page.locator('#quote-amount')).toBeVisible()
  await expect(page.locator('.quote-panel')).toContainText('Guardar cotización')
  await visibleContentFits(page)
  await page.screenshot({ path: testInfo.outputPath('04-detalle.png'), fullPage: true, animations: 'disabled' })
})

test('Flete acabado: cotización protagonista y límites visibles', async ({ page }, testInfo) => {
  await page.goto('demos/flete/#/demo')
  await page.getByRole('button', { name: 'Ver ejemplo de seguimiento', exact: true }).click()
  await expect(page.locator('.price-block')).toContainText('DATO DEMO')
  const priceY = (await page.locator('.price-block').boundingBox())?.y
  const routeY = (await page.locator('.tracking-card .route-card').boundingBox())?.y
  expect(priceY).toBeDefined()
  expect(routeY).toBeDefined()
  expect(priceY ?? Infinity).toBeLessThan(routeY ?? 0)
  await expect(page.locator('.accept-disclaimer')).toContainText('no confirma el viaje')
  await expect(page.locator('.privacy-note')).toContainText('sólo en este navegador')
  await visibleContentFits(page)
  await page.screenshot({ path: testInfo.outputPath('05-cotizacion.png'), fullPage: true, animations: 'disabled' })
  await page.getByRole('button', { name: 'Aceptar cotización', exact: true }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.getByRole('dialog')).toContainText('no se contrata un traslado real')
  await page.screenshot({ path: testInfo.outputPath('06-modal.png'), fullPage: true, animations: 'disabled' })
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button', { name: 'Aceptar cotización', exact: true })).toBeFocused()
})

test('Flete acabado: contenido largo, todas las pantallas pequeñas', async ({ page }) => {
  const original = page.viewportSize()
  await page.goto('demos/flete/')
  await page.locator('#quick-origin').fill('Dirección de retiro con una descripción larga y referencias de acceso para el operador')
  await page.locator('#quick-destination').fill('Dirección de entrega con una descripción larga y referencias de acceso para el operador')
  await page.getByRole('button', { name: 'Continuar solicitud', exact: true }).click()
  await expect(page.locator('.wizard-aside')).toContainText('Dirección de retiro')
  for (const width of [320, 375, 393, 412, 430, 768]) {
    await page.setViewportSize({ width, height: 844 })
    await visibleContentFits(page)
  }
  if (original) await page.setViewportSize(original)
})
