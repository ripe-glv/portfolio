<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const roles = [
  'engenharia de software',
  'ciência de dados',
  'produtos digitais',
  'interfaces modernas',
]
const typed = ref(roles[0])
const frame = ref<HTMLElement | null>(null)
let timer: ReturnType<typeof setTimeout> | undefined

function type(index: number, chars: number, deleting: boolean) {
  const word = roles[index]!
  typed.value = word.slice(0, chars)
  let delay = deleting ? 28 : 55
  let next = chars + (deleting ? -1 : 1)
  let nextIndex = index
  let nextDeleting = deleting

  if (!deleting && chars === word.length) {
    delay = 1600
    nextDeleting = true
  } else if (deleting && chars === 0) {
    nextDeleting = false
    nextIndex = (index + 1) % roles.length
    next = 1
    delay = 300
  }
  timer = setTimeout(() => type(nextIndex, next, nextDeleting), delay)
}

function tilt(event: PointerEvent) {
  const el = frame.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const x = (event.clientX - rect.left) / rect.width - 0.5
  const y = (event.clientY - rect.top) / rect.height - 0.5
  el.style.setProperty('--ry', `${x * 10}deg`)
  el.style.setProperty('--rx', `${-y * 10}deg`)
}

function resetTilt() {
  frame.value?.style.setProperty('--rx', '0deg')
  frame.value?.style.setProperty('--ry', '0deg')
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  type(0, 0, false)
})
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <section id="inicio" class="hero section-wrap" aria-labelledby="hero-title">
    <div class="hero-copy">
      <p class="status-badge"><i aria-hidden="true"></i>Disponível para novos projetos</p>
      <p class="eyebrow">Desenvolvedor de software <span>·</span> Ciência de dados</p>
      <h1 id="hero-title">Transformo ideias em <em>soluções digitais.</em></h1>
      <p class="typed-line" aria-hidden="true">
        <span class="prompt">&gt;</span><span>{{ typed }}</span
        ><span class="caret"></span>
      </p>
      <p class="hero-description">
        Crio sistemas, sites e soluções com dados para ajudar negócios e pessoas a resolver
        problemas de forma moderna, eficiente e inteligente.
      </p>

      <div class="hero-actions">
        <a class="button button-primary" href="#projetos">
          Ver projetos
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
        </a>
        <a
          class="button button-secondary"
          href="https://github.com/ripe-glv"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.4 4 5 5 0 0 0 19.3.5S18.2.1 15 1.8a13.4 13.4 0 0 0-7 0C4.8.1 3.7.5 3.7.5A5 5 0 0 0 3.6 4a5.4 5.4 0 0 0-1.4 3.7c0 5.3 3.5 6.5 6.8 6.9A4.8 4.8 0 0 0 8 18v4"
            />
            <path d="M8 19c-3 .9-3-1.5-4-2" />
          </svg>
          GitHub
        </a>
      </div>
    </div>

    <div class="portrait-wrap" @pointermove="tilt" @pointerleave="resetTilt">
      <div ref="frame" class="portrait-frame">
        <div class="portrait-glow" aria-hidden="true"></div>
        <img src="../assets/profile.jpg" alt="Retrato de Filipe Galvão" />
      </div>
      <div class="float-chip c1" aria-hidden="true"><b>&lt;/&gt;</b> Software</div>
      <div class="float-chip c2" aria-hidden="true"><b>∿</b> Dados</div>
    </div>
  </section>
</template>
