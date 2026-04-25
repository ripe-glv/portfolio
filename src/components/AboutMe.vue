<script setup lang="ts">
import { ref, onMounted } from 'vue'

const textToType = "> Software Engineer & Data Scientist_"
const typedText = ref("")

onMounted(() => {
  let i = 0
  const speed = 100 // ms per char
  
  setTimeout(() => {
    const typeWriter = setInterval(() => {
      if (i < textToType.length) {
        typedText.value += textToType.charAt(i)
        i++
      } else {
        clearInterval(typeWriter)
      }
    }, speed)
  }, 800) // Delay start to match fade-in
})
</script>

<template>
  <section class="about-me cyber-card animate-fade-in-up" style="animation-delay: 0.1s;">
    <div class="profile">
      
      <div class="avatar-wrapper">
        <div class="avatar-border-spin"></div>
        <div class="avatar-core">
          <img src="../assets/profile.jpg" alt="Filipe Galvão" class="avatar-img" />
        </div>
      </div>
      
      <div class="info">
        <div class="greeting-badge">HELLO_WORLD</div>
        <h1>Filipe G.</h1>
        <h2 class="subtitle-terminal">{{ typedText }}<span class="cursor" v-if="typedText.length === textToType.length"></span></h2>
        
        <p class="bio">
          Engenheiro de Software e Cientista de Dados apaixonado por criar modelos inteligentes, arquiteturas escaláveis e experiências hiper-modernas.
          <br/><span class="highlight">Construindo o futuro, transformando dados em código.</span>
        </p>
        
        <div class="links">
          <a href="https://linkedin.com/in/filipeglv/" target="_blank" rel="noopener noreferrer" class="cyber-btn">
            [ LINKEDIN ]
            <div class="btn-glitch-layer"></div>
          </a>
          <a href="https://github.com/ripe-glv" target="_blank" rel="noopener noreferrer" class="cyber-btn">
            [ GITHUB ]
            <div class="btn-glitch-layer"></div>
          </a>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.about-me {
  margin-bottom: 4rem;
  overflow: hidden;
}

/* Background Cyber Element */
.about-me::after {
  content: "</>";
  position: absolute;
  right: -20px;
  bottom: -40px;
  font-family: var(--font-mono);
  font-size: 10rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.02);
  z-index: 0;
  pointer-events: none;
}

.profile {
  display: flex;
  gap: 3rem;
  align-items: center;
  position: relative;
  z-index: 2;
}

/* Avatar Animations */
.avatar-wrapper {
  position: relative;
  width: 140px;
  height: 140px;
  flex-shrink: 0;
}

.avatar-border-spin {
  position: absolute;
  inset: -5px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, transparent 0%, transparent 60%, var(--color-accent) 80%, var(--color-accent-purple) 100%);
  animation: spin 3s linear infinite;
  filter: blur(2px);
}

.avatar-core {
  position: absolute;
  inset: 2px;
  background: var(--color-bg-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 900;
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.8);
  overflow: hidden;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Info Section */
.info {
  flex-grow: 1;
}

.greeting-badge {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-accent);
  background: rgba(0, 240, 255, 0.1);
  padding: 0.2rem 0.8rem;
  border: 1px solid var(--color-accent);
  border-radius: 4px;
  margin-bottom: 1rem;
  letter-spacing: 1px;
}

.info h1 {
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 0.2rem;
  text-transform: uppercase;
  letter-spacing: -1px;
  background: linear-gradient(135deg, #fff, var(--color-text-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle-terminal {
  font-family: var(--font-mono);
  font-size: 1.2rem;
  color: var(--color-accent-hover);
  margin-bottom: 1.5rem;
  min-height: 1.8rem;
}

.cursor {
  display: inline-block;
  width: 10px;
  height: 1.2rem;
  background-color: var(--color-accent);
  margin-left: 5px;
  vertical-align: middle;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.bio {
  font-size: 1.15rem;
  color: var(--color-text-secondary);
  line-height: 1.8;
  margin-bottom: 2rem;
  max-width: 650px;
}

.highlight {
  color: var(--color-text-primary);
  font-weight: 600;
}

/* Cyber Buttons */
.links {
  display: flex;
  gap: 1.5rem;
}

.cyber-btn {
  position: relative;
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 1px;
  padding: 0.75rem 2rem;
  background: rgba(17, 24, 39, 0.8);
  border: 1px solid var(--color-border);
  color: var(--color-accent);
  overflow: hidden;
  transition: all var(--transition-fast);
}

.cyber-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.2), transparent);
  transition: all 0.5s ease;
}

.cyber-btn:hover {
  background: rgba(0, 240, 255, 0.1);
  box-shadow: 0 0 15px var(--color-accent-glow);
  transform: translateY(-2px);
  color: #fff;
}

.cyber-btn:hover::before {
  left: 100%;
}

@media (max-width: 768px) {
  .profile {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
  
  .info h1 {
    font-size: 2.5rem;
  }
  
  .links {
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>
