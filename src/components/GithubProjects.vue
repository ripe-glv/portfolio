<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Repository {
  id: number
  name: string
  description: string
  html_url: string
  homepage: string | null
  language: string
  stargazers_count: number
  forks_count: number
}

const repos = ref<Repository[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const response = await fetch('https://api.github.com/users/ripe-glv/repos?sort=updated&per_page=6')
    if (!response.ok) {
      throw new Error('SYSTEM_ERROR: Falha ao carregar os repositórios')
    }
    const data = await response.json()
    // Filter out forks and get top ones
    repos.value = data.filter((repo: any) => !repo.fork).slice(0, 6)
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="github-projects animate-fade-in-up" style="animation-delay: 0.3s;">
    
    <div class="section-header">
      <div class="tech-lines"></div>
      <h2 class="section-title">
        <span class="bracket">{</span> LATEST_PROJECTS <span class="bracket">}</span>
      </h2>
      <div class="tech-lines"></div>
    </div>
    
    <div v-if="loading" class="loading-state cyber-card">
      <div class="cyber-loader">
        <div class="spinner"></div>
        <span>FETCHING_DATA...</span>
      </div>
    </div>

    <div v-else-if="error" class="error-state cyber-card">
      <span class="error-icon">⚠</span>
      <p>{{ error }}</p>
    </div>

    <div v-else class="projects-grid">
      <a 
        v-for="(repo, index) in repos" 
        :key="repo.id" 
        :href="repo.homepage || repo.html_url" 
        target="_blank" 
        rel="noopener noreferrer"
        class="project-card cyber-card animate-fade-in-up"
        :style="`animation-delay: ${0.4 + (index * 0.1)}s`"
      >
        <div class="card-header">
          <svg class="folder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          </svg>
          <h3>{{ repo.name }}</h3>
        </div>
        <p class="description">{{ repo.description || 'Nenhuma descrição fornecida para este diretório.' }}</p>
        
        <div class="card-footer">
          <div class="stats">
            <span v-if="repo.language" class="stat badge">
              <span class="dot"></span>
              {{ repo.language }}
            </span>
            <span class="stat icon-stat">
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              {{ repo.stargazers_count }}
            </span>
            <span class="stat icon-stat">
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><circle cx="18" cy="6" r="3"></circle><path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"></path><path d="M12 12v3"></path></svg>
              {{ repo.forks_count }}
            </span>
          </div>
        </div>
      </a>
    </div>
  </section>
</template>

<style scoped>
.github-projects {
  margin-bottom: 4rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.tech-lines {
  flex-grow: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-border), transparent);
}

.section-title {
  font-family: var(--font-mono);
  font-size: 1.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--color-text-primary);
  margin: 0;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
}

.bracket {
  color: var(--color-accent);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.project-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.folder-icon {
  width: 20px;
  height: 20px;
  color: var(--color-accent);
}

.card-header h3 {
  font-family: var(--font-mono);
  font-size: 1.15rem;
  color: var(--color-accent);
  margin: 0;
}

.description {
  flex-grow: 1;
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.card-footer {
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 1rem;
}

.stats {
  display: flex;
  gap: 1.25rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-text-secondary);
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.icon-stat {
  color: #f8fafc;
}

.icon-stat svg {
  color: var(--color-text-secondary);
}

.badge {
  color: var(--color-accent);
}

.dot {
  width: 8px;
  height: 8px;
  background-color: var(--color-accent);
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0 0 8px var(--color-accent-glow);
}

/* Loading & Error */
.loading-state, .error-state {
  text-align: center;
  padding: 4rem 2rem;
  font-family: var(--font-mono);
  color: var(--color-accent);
  letter-spacing: 1px;
}

.cyber-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 2px solid rgba(0, 240, 255, 0.1);
  border-left-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  box-shadow: 0 0 15px var(--color-accent-glow);
}

.error-state {
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.3);
}

.error-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
