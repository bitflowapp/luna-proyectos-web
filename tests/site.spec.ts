import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { mkdir } from 'node:fs/promises'

test('layout, evidence, real links, loaded images and clean console', async ({ page }, testInfo) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  await page.goto('./')
  await page.evaluate(() => document.fonts.ready)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Software paratrabajo real.')
  const heroCta = page.getByRole('link', { name: 'Ver proyectos', exact: true })
  await expect(heroCta).toBeInViewport()
  const evidence = await page.locator('.hero-evidence').boundingBox()
  expect(evidence!.y).toBeLessThan(page.viewportSize()!.height)
  await page.locator('footer').scrollIntoViewIfNeeded()
  await page.evaluate(async () => { await Promise.all(Array.from(document.images).map(img => { img.loading = 'eager'; return img.decode().catch(() => {}) })) })
  const layout = await page.evaluate(() => ({ overflow: document.documentElement.scrollWidth > innerWidth, badImages: Array.from(document.images).filter(img => !img.complete || !img.naturalWidth).map(img => img.src), badAnchors: Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')).filter(a => !document.getElementById(a.hash.slice(1))).map(a => a.hash) }))
  expect(layout).toEqual({ overflow: false, badImages: [], badAnchors: [] })
  const cta = page.getByRole('link', { name: 'Contarnos el problema' })
  await expect(cta).toHaveAttribute('href', 'https://www.instagram.com/lunaaproyectos')
  await expect(cta).toHaveAttribute('rel', /noopener/)
  await expect(page.getByRole('link', { name: 'PROBAR DEMO' })).toHaveAttribute('href', 'https://bitflowapp.github.io/luna-catalogo-demo-preview/')
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  const dir = page.viewportSize()!.width < 768 ? 'screenshots-mobile' : 'screenshots-desktop'
  await mkdir(`artifacts/${dir}`, { recursive: true })
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
  await page.screenshot({ path: `artifacts/${dir}/${testInfo.project.name}-hero.png` })
  await page.screenshot({ path: `artifacts/${dir}/${testInfo.project.name}-full.png`, fullPage: true })
  expect(errors).toEqual([])
})

test('gallery changes actual screenshots; zoom traps and restores focus', async ({ page }) => {
  await page.goto('./')
  await page.locator('#taba').getByRole('button', { name: 'Gestión', exact: true }).click()
  await expect(page.locator('.taba-screen img')).toHaveAttribute('src', /taba-business/)
  await page.locator('#taba').getByRole('button', { name: 'Reparto', exact: true }).click()
  await expect(page.locator('.taba-screen img')).toHaveAttribute('src', /taba-rider/)
  const zoom = page.getByRole('button', { name: 'Ampliar Reparto de TABA' })
  await zoom.click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.getByRole('dialog').locator('img')).toHaveAttribute('src', /taba-rider/)
  await page.keyboard.press('Tab')
  expect(await page.evaluate(() => !!document.activeElement?.closest('dialog'))).toBeTruthy()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await expect(zoom).toBeFocused()
  for (const [name, path] of [['Presupuesto', 'presupuesto'], ['Cobros', 'cobros'], ['Agenda', 'agenda']]) {
    await page.locator('#oficio').getByRole('button', { name, exact: true }).click()
    await expect(page.locator('.oficio-phone img')).toHaveAttribute('src', new RegExp(path))
  }
  await page.locator('.oficio-phone').click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.getByRole('button', { name: 'Cerrar captura ampliada' }).click()
  await expect(page.getByRole('dialog')).not.toBeVisible()
})

test('commercial journey, menu and FAQ work with keyboard', async ({ page }) => {
  await page.goto('./')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Ir al contenido' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/#contenido$/)
  await page.getByRole('link', { name: 'Ver proyectos', exact: true }).click()
  await expect(page).toHaveURL(/#proyectos$/)
  await page.evaluate(() => window.scrollTo(0, 0))
  const menu = page.getByRole('button', { name: /Menú/ })
  if (await menu.isVisible()) {
    await menu.click()
    await expect(page.locator('.menu-toggle')).toHaveAttribute('aria-expanded', 'true')
    await page.getByRole('navigation').getByRole('link', { name: 'Hablemos' }).click()
    await expect(page.locator('.menu-toggle')).toHaveAttribute('aria-expanded', 'false')
    await expect(page).toHaveURL(/#contacto$/)
  }
  const faq = page.locator('summary').first()
  await faq.focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('details').first()).toHaveAttribute('open', '')
  await expect(page.locator('details').first().locator('p')).toBeVisible()
})

test('Bit Flow is private, with no media, links or commercial availability', async ({ page }) => {
  await page.goto('./')
  const section = page.locator('#bit-flow')
  await expect(section).toContainText('CASO VENDIDO')
  await expect(section).toContainText('PROYECTO PRIVADO')
  await expect(section).toContainText('no se encuentra disponible comercialmente')
  await expect(section.locator('a, button, img, video, iframe')).toHaveCount(0)
})

test('WCAG automated accessibility including contrast', async ({ page }) => {
  await page.goto('./')
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice']).analyze()
  expect(result.violations.map(x => ({ id: x.id, impact: x.impact, elements: x.nodes.map(n => n.target) }))).toEqual([])
})

test('SEO, canonical, manifest and social image exist', async ({ page, request }) => {
  await page.goto('./')
  await expect(page).toHaveTitle(/LUNA Proyectos.*Neuquén/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'es-AR')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://marcoluna-nqn.github.io/luna-proyectos-web/')
  const schema = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent())!)
  expect(schema.name).toBe('LUNA Proyectos')
  for (const file of ['site.webmanifest', 'sitemap.xml', 'robots.txt', 'favicon.svg', 'icon-192.png', 'social/luna-og.jpg']) {
    const response = await request.get(file)
    expect(response.status(), file).toBe(200)
  }
  const response = await request.get('./')
  expect(await response.text()).toContain('Podés venir con un problema.')
})
