<script setup lang="ts">
import AboutMe from './components/AboutMe.vue'
import GithubProjects from './components/GithubProjects.vue'
</script>

<template>
  <header>
    <!-- We can add a simple header or nav here if needed, but for a simple portfolio, AboutMe serves as the hero section -->
  </header>

  <main>
    <AboutMe />
    <GithubProjects />
  </main>

  <footer class="footer">
    <p>SYSTEM_STATUS: <span class="footer-highlight">ONLINE</span> // &copy; {{ new Date().getFullYear() }} Filipe G.</p>
  </footer>
</template>

<style scoped>
header {
  line-height: 1.5;
  margin-bottom: 2rem;
}

.footer {
  text-align: center;
  padding: 2rem 0;
  margin-top: 5rem;
  border-top: 1px dashed var(--color-border);
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 1px;
}

.footer-highlight {
  color: var(--color-accent);
}
</style>
