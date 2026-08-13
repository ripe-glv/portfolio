<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

interface Repository {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  fork: boolean
}

interface Project {
  id: number | string
  title: string
  description: string
  projectUrl: string
  sourceUrl?: string
  tags: string[]
  visual: 'law' | 'solar' | 'game' | 'data' | 'code'
  eyebrow: string
}

const featuredProject: Project = {
  id: 'advocacia-bll',
  title: 'Template para Advocacia',
  description:
    'Landing page elegante e responsiva para escritórios de advocacia, com foco em autoridade e conversão.',
  projectUrl: 'https://template-advocacia-bll.pages.dev/',
  tags: ['Landing page', 'Responsivo', 'UI/UX'],
  visual: 'law',
  eyebrow: 'Projeto em destaque',
}

const projects = ref<Project[]>([featuredProject])
const loading = ref(true)
const error = ref(false)
const track = ref<HTMLElement | null>(null)
let autoplay: ReturnType<typeof setInterval> | undefined

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

const visualMap: Record<string, Project['visual']> = {
  'solar-saas': 'solar',
  'pokemon-web-rpg': 'game',
  pkmshinySensor: 'game',
  syntax: 'game',
  'ic-filipe': 'data',
}

const projectCount = computed(() => projects.value.length)

function repositoryToProject(repo: Repository): Project {
  const title = nameMap[repo.name] ?? repo.name.replaceAll('-', ' ')
  const tags = [repo.language, repo.homepage ? 'Aplicação web' : 'Open source'].filter(
    (tag): tag is string => Boolean(tag),
  )

  return {
    id: repo.id,
    title,
    description:
      descriptionMap[repo.name] ??
      repo.description ??
      'Projeto autoral desenvolvido para explorar tecnologia, arquitetura e solução de problemas.',
    projectUrl: repo.homepage || repo.html_url,
    sourceUrl: repo.html_url,
    tags,
    visual: visualMap[repo.name] ?? (repo.language === 'Python' ? 'data' : 'code'),
    eyebrow: repo.homepage ? 'Projeto publicado' : 'Repositório',
  }
}

function move(direction: 1 | -1) {
  const element = track.value
  if (!element) return

  const card = element.querySelector<HTMLElement>('.project-card')
  const step = (card?.offsetWidth ?? element.clientWidth) + 16
  const reachedEnd = element.scrollLeft + element.clientWidth >= element.scrollWidth - 8
  const reachedStart = element.scrollLeft <= 8

  if (direction === 1 && reachedEnd) {
    element.scrollTo({ left: 0, behavior: 'smooth' })
  } else if (direction === -1 && reachedStart) {
    element.scrollTo({ left: element.scrollWidth, behavior: 'smooth' })
  } else {
    element.scrollBy({ left: step * direction, behavior: 'smooth' })
  }
}

function stopAutoplay() {
  if (autoplay) clearInterval(autoplay)
  autoplay = undefined
}

function startAutoplay() {
  stopAutoplay()
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  autoplay = setInterval(() => move(1), 4500)
}

onMounted(async () => {
  try {
    const response = await fetch(
      'https://api.github.com/users/ripe-glv/repos?sort=updated&per_page=30',
    )
    if (!response.ok) throw new Error('GitHub indisponível')

    const repositories = (await response.json()) as Repository[]
    const selected = repositories
      .filter((repo) => !repo.fork && !['portfolio', 'ripe-glv'].includes(repo.name))
      .sort((a, b) => Number(Boolean(b.homepage)) - Number(Boolean(a.homepage)))
      .slice(0, 7)

    projects.value = [featuredProject, ...selected.map(repositoryToProject)]
  } catch {
    error.value = true
  } finally {
    loading.value = false
    startAutoplay()
  }
})

onBeforeUnmount(stopAutoplay)
</script>

<template>
  <section id="projetos" class="projects-section section-wrap" aria-labelledby="projects-title">
    <div class="projects-heading">
      <div>
        <p class="section-kicker"><span></span>Projetos selecionados</p>
        <h2 id="projects-title">Trabalhos que unem forma e função.</h2>
      </div>
      <div class="carousel-controls" aria-label="Controles do carrossel">
        <span aria-live="polite">{{ projectCount }} projetos</span>
        <button type="button" aria-label="Projeto anterior" @click="move(-1)">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <button type="button" aria-label="Próximo projeto" @click="move(1)">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
        </button>
      </div>
    </div>

    <div
      ref="track"
      class="projects-track"
      tabindex="0"
      aria-label="Carrossel de projetos"
      @mouseenter="stopAutoplay"
      @mouseleave="startAutoplay"
      @focusin="stopAutoplay"
      @focusout="startAutoplay"
      @keydown.left.prevent="move(-1)"
      @keydown.right.prevent="move(1)"
    >
      <article v-for="project in projects" :key="project.id" class="project-card">
        <div class="project-artwork" :class="`artwork-${project.visual}`">
          <div v-if="project.visual === 'law'" class="law-preview" aria-hidden="true">
            <div class="preview-nav"><span>BLL</span><i></i><i></i><i></i></div>
            <div class="law-copy">
              <small>Advocacia estratégica</small><b>Defesa com excelência.</b><i></i>
            </div>
            <div class="law-seal">§</div>
          </div>
          <div v-else-if="project.visual === 'solar'" class="dashboard-preview" aria-hidden="true">
            <div class="preview-sidebar"><i></i><i></i><i></i><i></i></div>
            <div class="dashboard-content">
              <span></span>
              <div class="bars"><i></i><i></i><i></i><i></i><i></i></div>
            </div>
            <div class="sun-orbit">☼</div>
          </div>
          <div v-else-if="project.visual === 'game'" class="game-preview" aria-hidden="true">
            <div class="pixel-moon"></div>
            <div class="pixel-ground"></div>
            <div class="game-mark">✦</div>
          </div>
          <div v-else-if="project.visual === 'data'" class="data-preview" aria-hidden="true">
            <div class="data-grid"></div>
            <svg viewBox="0 0 300 100">
              <path d="M0 85 C35 82 48 42 82 55 S128 72 155 35 205 18 230 45 270 56 300 10" />
            </svg>
            <div class="data-points"><i></i><i></i><i></i></div>
          </div>
          <div v-else class="code-preview" aria-hidden="true">
            <span>&lt;/&gt;</span><i></i><i></i><i></i><i></i>
          </div>
        </div>

        <div class="project-content">
          <p class="project-eyebrow">{{ project.eyebrow }}</p>
          <h3>{{ project.title }}</h3>
          <p class="project-description">{{ project.description }}</p>
          <ul class="project-tags" aria-label="Tecnologias e características">
            <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
          </ul>
          <div class="project-links">
            <a :href="project.projectUrl" target="_blank" rel="noopener noreferrer">
              Ver projeto
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
            </a>
            <a
              v-if="project.sourceUrl && project.sourceUrl !== project.projectUrl"
              class="source-link"
              :href="project.sourceUrl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver código no GitHub"
            >
              Código
            </a>
          </div>
        </div>
      </article>

      <article
        v-if="loading"
        class="project-card project-skeleton"
        aria-label="Carregando projetos"
      >
        <div></div>
        <span></span><span></span><span></span>
      </article>
    </div>

    <p v-if="error" class="projects-note">
      O projeto em destaque está disponível. Os repositórios do GitHub não puderam ser carregados
      agora.
    </p>
  </section>
</template>
