import { defineConfig } from '@playwright/test'
import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
// The machine's default temporary drive is full; scope browser temp files to this project.
mkdirSync('.tmp', { recursive: true })
process.env.TEMP = resolve('.tmp')
process.env.TMP = resolve('.tmp')
const sizes = [[360, 800], [390, 844], [430, 932], [768, 1024], [1440, 1000]]
export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  workers: 2,
  retries: 0,
  timeout: 45000,
  reporter: [['list'], ['json', { outputFile: 'artifacts/playwright-results.json' }], ['html', { open: 'never' }]],
  use: { baseURL: process.env.PUBLIC_TEST_URL || 'http://127.0.0.1:4173/luna-proyectos-web/', reducedMotion: 'reduce', trace: 'retain-on-failure', screenshot: 'only-on-failure' },
  projects: ['chromium', 'webkit'].flatMap(browser => sizes.map(([width, height]) => ({ name: `${browser}-${width}`, use: { browserName: browser as 'chromium' | 'webkit', viewport: { width, height }, deviceScaleFactor: 1 } }))),
  webServer: process.env.PUBLIC_TEST_URL ? undefined : { command: 'npm run preview -- --host 127.0.0.1 --port 4173 --strictPort', url: 'http://127.0.0.1:4173/luna-proyectos-web/', reuseExistingServer: !process.env.CI },
})
