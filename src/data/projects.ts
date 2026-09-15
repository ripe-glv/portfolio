export interface Repository {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  fork: boolean
}

export interface Project {
  id: number | string
  title: string
  description: string
  projectUrl: string
  sourceUrl?: string
  hasWebsite: boolean
  visual?: 'game' | 'data' | 'code'
  tags: string[]
  eyebrow: string
}

export const featuredProjects: Project[] = [
  {
    id: 'cn-bahia',
    title: 'CN Bahia',
    description: 'Portal de notícias com as principais informações da Bahia, do Brasil e do mundo.',
    projectUrl: 'https://cnbahia.com.br/',
    hasWebsite: true,
    tags: ['Portal de notícias', 'Responsivo'],
    eyebrow: 'Projeto em destaque',
  },
  {
    id: 'advocacia-bll',
    title: 'Template para Advocacia',
    description:
      'Landing page elegante e responsiva para escritórios de advocacia, com foco em autoridade e conversão.',
    projectUrl: 'https://template-advocacia-bll.pages.dev/',
    hasWebsite: true,
    tags: ['Landing page', 'Responsivo', 'UI/UX'],
    eyebrow: 'Projeto em destaque',
  },
]

const nameMap: Record<string, string> = {
  'solar-saas': 'Solar SaaS',
  'pokemon-web-rpg': 'Pokémon Web RPG',
  pkmshinySensor: 'Pokémon Shiny Sensor',
  syntax: 'Syntax — Horror Game',
  'pbl3-redes': 'Laboratório de Redes',
  'pbl2-redes': 'Protocolos de Rede',
  'ic-filipe': 'Pesquisa em Ciência de Dados',
}

const descriptionMap: Record<string, string> = {
  'solar-saas': 'Plataforma SaaS para gestão e acompanhamento de usinas de energia solar.',
  'pokemon-web-rpg': 'RPG web inspirado em Pokémon, com exploração e mecânicas interativas.',
  pkmshinySensor: 'Sensor simulado para identificar o surgimento de Pokémon raros.',
  syntax: 'Jogo de horror e escape room com atmosfera imersiva e desafios narrativos.',
  'pbl3-redes': 'Projeto acadêmico sobre redes, comunicação e serviços distribuídos.',
  'pbl2-redes': 'Implementação prática de protocolos e fundamentos de redes.',
  'ic-filipe': 'Pesquisa aplicada usando notebooks, análise e ciência de dados.',
}

export function publishedUrl(value: string | null): string | undefined {
  if (!value?.trim()) return
  try {
    const url = new URL(value.includes('://') ? value : `https://${value}`)
    if (['https:', 'http:'].includes(url.protocol)) return url.href
  } catch {
    return
  }
}

export function selectRepositories(repositories: Repository[]): Repository[] {
  const featuredHosts = featuredProjects.map((project) => new URL(project.projectUrl).hostname)
  return repositories
    .filter((repo) => {
      const homepage = publishedUrl(repo.homepage)
      return (
        !repo.fork &&
        !['portfolio', 'ripe-glv'].includes(repo.name) &&
        !(homepage && featuredHosts.includes(new URL(homepage).hostname))
      )
    })
    .sort(
      (a, b) =>
        Number(Boolean(publishedUrl(b.homepage))) - Number(Boolean(publishedUrl(a.homepage))),
    )
    .slice(0, 7)
}

const visualMap: Record<string, Project['visual']> = {
  'pokemon-web-rpg': 'game',
  pkmshinySensor: 'game',
  syntax: 'game',
  'ic-filipe': 'data',
}

export function repositoryToProject(repo: Repository): Project {
  const homepage = publishedUrl(repo.homepage)
  return {
    id: repo.id,
    title: nameMap[repo.name] ?? repo.name.replaceAll('-', ' '),
    description:
      descriptionMap[repo.name] ??
      repo.description ??
      'Projeto autoral desenvolvido para explorar tecnologia, arquitetura e solução de problemas.',
    projectUrl: homepage || repo.html_url,
    sourceUrl: repo.html_url,
    hasWebsite: Boolean(homepage),
    visual: visualMap[repo.name] ?? (repo.language === 'Python' ? 'data' : 'code'),
    tags: [repo.language, homepage ? 'Aplicação web' : 'Open source'].filter((tag): tag is string =>
      Boolean(tag),
    ),
    eyebrow: homepage ? 'Projeto publicado' : 'Repositório',
  }
}
