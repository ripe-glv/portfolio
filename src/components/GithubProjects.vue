<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import {
  featuredProjects,
  repositoryToProject,
  selectRepositories,
  type Repository,
  type Project,
} from '../data/projects'
import savedRepositories from '../data/repositories.json'
import savedPreviews from '../data/previews.json'

const previews: Record<string, string> = savedPreviews
const projects = ref<Project[]>([
  ...featuredProjects,
  ...savedRepositories.map(repositoryToProject),
])
const loading = ref(true)
const error = ref(false)
const failedPreviews = ref<Record<string, boolean>>({})
const track = ref<HTMLElement | null>(null)
let autoplay: ReturnType<typeof setInterval> | undefined
const projectCount = computed(() => projects.value.length)

function previewUrl(project: Project) {
  if (!project.hasWebsite) return
  const path = previews[project.projectUrl]
  return path ? `${import.meta.env.BASE_URL}${path}` : undefined
}

function projectHost(project: Project) {
  return new URL(project.projectUrl).hostname
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
      { signal: AbortSignal.timeout(10000) },
    )
    if (!response.ok) throw new Error('GitHub indisponível')

    const repositories = (await response.json()) as Repository[]
    projects.value = [
      ...featuredProjects,
      ...selectRepositories(repositories).map(repositoryToProject),
    ]
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
        <a
          v-if="project.hasWebsite"
          class="project-artwork"
          :href="project.projectUrl"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`Abrir ${project.title}`"
        >
          <div class="preview-toolbar" aria-hidden="true">
            <span class="preview-dots"><i></i><i></i><i></i></span>
            <span class="preview-address">{{ projectHost(project) }}</span>
            <span>↗</span>
          </div>
          <img
            v-if="previewUrl(project) && !failedPreviews[project.projectUrl]"
            class="project-screenshot"
            :src="previewUrl(project)"
            :alt="`Captura de tela de ${project.title}`"
            width="1440"
            height="900"
            loading="lazy"
            decoding="async"
            @error="failedPreviews[project.projectUrl] = true"
          />
          <div v-else class="preview-unavailable">
            <strong>{{ project.title }}</strong>
            <span>Preview indisponível · Abrir projeto ↗</span>
          </div>
        </a>
        <div v-else class="project-artwork" :class="`artwork-${project.visual}`">
          <div v-if="project.visual === 'game'" class="game-preview" aria-hidden="true">
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
      Exibindo os projetos salvos. Não foi possível atualizar a lista do GitHub agora.
    </p>
  </section>
</template>
