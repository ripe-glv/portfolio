import './assets/main.css'
import './assets/premium.css'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

const observer =
  'IntersectionObserver' in window
    ? new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            entry.target.classList.add('in')
            observer?.unobserve(entry.target)
          }),
        { threshold: 0, rootMargin: '0px 0px -8% 0px' },
      )
    : undefined

app.directive('reveal', {
  mounted(el: HTMLElement) {
    el.classList.add('reveal')
    if (observer) observer.observe(el)
    else el.classList.add('in')
  },
})

document.addEventListener('pointermove', (event) => {
  const card = (event.target as HTMLElement).closest<HTMLElement>(
    '.project-card, .about-facts article',
  )
  if (!card) return
  const rect = card.getBoundingClientRect()
  card.style.setProperty('--mx', `${event.clientX - rect.left}px`)
  card.style.setProperty('--my', `${event.clientY - rect.top}px`)
})

app.mount('#app')
