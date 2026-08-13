<script setup lang="ts">
import AboutMe from './components/AboutMe.vue'
import GithubProjects from './components/GithubProjects.vue'

const year = new Date().getFullYear()
</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <a class="brand" href="#inicio" aria-label="Ir para o início">
        <span class="brand-dot" aria-hidden="true"></span>
        <span>Filipe Galvão</span>
      </a>

      <nav class="main-nav" aria-label="Navegação principal">
        <a href="#projetos">Projetos</a>
        <a href="#sobre">Sobre</a>
        <a href="#contato">Contato</a>
        <a
          class="nav-social"
          href="https://github.com/ripe-glv"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </a>
      </nav>
    </header>

    <main>
      <AboutMe />
      <GithubProjects />

      <section id="sobre" class="about-section section-wrap" aria-labelledby="about-title">
        <div class="section-kicker"><span></span>Sobre mim</div>
        <div class="about-layout">
          <div>
            <h2 id="about-title">Código, dados e produto no mesmo raciocínio.</h2>
            <p>
              Sou Engenheiro de Software e Cientista de Dados. Gosto de transformar problemas
              complexos em produtos digitais claros, funcionais e bem estruturados — da ideia à
              experiência final.
            </p>
          </div>

          <div class="about-facts" aria-label="Informações profissionais">
            <article>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path
                  d="M3 12h18M12 3c2.6 2.5 4 5.5 4 9s-1.4 6.5-4 9c-2.6-2.5-4-5.5-4-9s1.4-6.5 4-9Z"
                />
              </svg>
              <div>
                <strong>Baseado no Brasil</strong><span>Disponível para trabalho remoto</span>
              </div>
            </article>
            <article>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 3h8l2 4v5a6 6 0 0 1-12 0V7l2-4Z" />
                <path d="m9 18-2 3 5-2 5 2-2-3" />
              </svg>
              <div>
                <strong>Software + Dados</strong
                ><span>Soluções completas e orientadas a resultado</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="contato" class="contact-section section-wrap" aria-labelledby="contact-title">
        <div class="contact-copy">
          <span class="section-kicker"><span></span>Contato</span>
          <h2 id="contact-title">Vamos construir algo incrível.</h2>
          <p>Estou aberto a conversar sobre projetos, parcerias e oportunidades.</p>
        </div>
        <div class="contact-links">
          <a href="https://linkedin.com/in/filipeglv/" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M8 10v7M8 7v.01M12 17v-4a3 3 0 0 1 6 0v4M12 10v7" />
            </svg>
            <span><small>LinkedIn</small>linkedin.com/in/filipeglv</span>
          </a>
          <a href="https://github.com/ripe-glv" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.4 4 5 5 0 0 0 19.3.5S18.2.1 15 1.8a13.4 13.4 0 0 0-7 0C4.8.1 3.7.5 3.7.5A5 5 0 0 0 3.6 4a5.4 5.4 0 0 0-1.4 3.7c0 5.3 3.5 6.5 6.8 6.9A4.8 4.8 0 0 0 8 18v4"
              />
              <path d="M8 19c-3 .9-3-1.5-4-2" />
            </svg>
            <span><small>GitHub</small>github.com/ripe-glv</span>
          </a>
          <a href="https://instagram.com/filipeglv7" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
            </svg>
            <span><small>Instagram</small>@filipeglv7</span>
          </a>
          <a href="https://wa.me/5575988283981" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.4-4.7A8.5 8.5 0 1 1 20.5 11.6Z" />
              <path
                d="M8.2 7.8c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.8 1.8c.1.2.1.4 0 .6l-.7.9c-.2.2-.1.4 0 .6.6 1.1 1.5 2 2.6 2.6.2.1.4.2.6 0l.9-1.1c.2-.2.4-.3.6-.2l1.8.8c.3.1.4.3.4.5 0 .5-.2 1.5-.7 1.9-.5.5-1.3.8-2.2.8-1.1 0-2.8-.6-4.7-2.2-1.5-1.3-2.7-3-3.1-4.2-.4-1.1 0-2.1.4-2.8.4-.6.9-.9 1.6-1Z"
              />
            </svg>
            <span><small>WhatsApp</small>(75) 98828-3981</span>
          </a>
        </div>
      </section>
    </main>

    <footer class="site-footer section-wrap">
      <span>© {{ year }} Filipe Galvão</span>
      <span>Engenharia de Software · Ciência de Dados</span>
    </footer>
  </div>
</template>
