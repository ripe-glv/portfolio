import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { chromium } from '@playwright/test'
import { featuredProjects, repositoryToProject, selectRepositories } from '../src/data/projects.ts'

const root = new URL('../', import.meta.url)
const repositoriesFile = new URL('src/data/repositories.json', root)
const previewsFile = new URL('src/data/previews.json', root)
let repositories = JSON.parse(await readFile(repositoriesFile, 'utf8'))
const previews = JSON.parse(await readFile(previewsFile, 'utf8'))

try {
  const response = await fetch(
    'https://api.github.com/users/ripe-glv/repos?sort=updated&per_page=30',
    {
      signal: AbortSignal.timeout(20000),
    },
  )
  if (!response.ok) throw new Error(`GitHub: HTTP ${response.status}`)
  repositories = selectRepositories(await response.json()).map(
    ({ id, name, description, html_url, homepage, language, fork }) => ({
      id,
      name,
      description,
      html_url,
      homepage,
      language,
      fork,
    }),
  )
  await writeFile(repositoriesFile, `${JSON.stringify(repositories, null, 2)}\n`)
} catch (error) {
  console.warn(`Usando a lista de repositórios salva: ${error.message}`)
}

await mkdir(new URL('public/previews/', root), { recursive: true })
const browser = await chromium.launch()
let failures = 0
try {
  for (const project of [...featuredProjects, ...repositories.map(repositoryToProject)]) {
    if (!project.hasWebsite) continue
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
      reducedMotion: 'reduce',
      locale: 'pt-BR',
      colorScheme: 'light',
    })
    try {
      const url = project.projectUrl
      try {
        const response = await page.goto(url, {
          waitUntil: 'domcontentloaded',
          timeout: 90000,
        })
        if (!response?.ok()) throw new Error(`HTTP ${response?.status()}`)
        await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {})
        await page.evaluate(async () => {
          await Promise.race([
            Promise.all([
              document.fonts.ready,
              Promise.all(
                Array.from(document.images)
                  .filter((image) => image.getBoundingClientRect().top < window.innerHeight)
                  .map((image) => image.decode().catch(() => {})),
              ),
            ]),
            new Promise((resolve) => setTimeout(resolve, 10000)),
          ])
        })
        const path = `previews/${project.id}.jpg`
        await page.screenshot({
          path: fileURLToPath(new URL(`public/${path}`, root)),
          type: 'jpeg',
          quality: 80,
          fullPage: false,
          animations: 'disabled',
        })
        previews[url] = path
        console.log(`Preview atualizado: ${project.title} (${url})`)
      } catch (error) {
        failures++
        console.error(`Não foi possível capturar ${url}: ${error.message}`)
      }
    } finally {
      await page.close()
    }
  }
} finally {
  await browser.close()
  await writeFile(previewsFile, `${JSON.stringify(previews, null, 2)}\n`)
}
if (failures) process.exitCode = 1
