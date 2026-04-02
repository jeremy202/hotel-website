<template>
  <Transition name="loader">
    <div v-if="visible" class="loader">
      <div class="loader__inner">
        <div class="loader__brand">
          <span class="loader__prefix">GRAND</span>
          <span class="loader__name">Comodores</span>
          <span class="loader__sub">LAGOS · NIGERIA</span>
        </div>
        <div class="loader__progress">
          <div class="loader__progress-bar" ref="barRef"></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const visible = ref(true)
const barRef = ref(null)

onMounted(() => {
  const tl = gsap.timeline()

  // Animate bar fill
  tl.to(barRef.value, {
    scaleX: 1,
    duration: 1.8,
    ease: 'power2.inOut',
    transformOrigin: 'left center',
  })

  // Exit
  tl.to('.loader__inner', {
    opacity: 0,
    y: -20,
    duration: 0.5,
    ease: 'power3.in',
  })

  tl.to('.loader', {
    opacity: 0,
    duration: 0.4,
    ease: 'power2.in',
    onComplete: () => { visible.value = false }
  }, '-=0.2')
})
</script>

<style scoped>
.loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #0A0908;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.loader__brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
}

.loader__prefix {
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: #C9A96E;
  text-transform: uppercase;
}

.loader__name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 3rem;
  font-weight: 300;
  color: #FAF7F2;
  letter-spacing: 0.08em;
  font-style: italic;
}

.loader__sub {
  font-family: 'Inter', sans-serif;
  font-size: 0.5rem;
  font-weight: 300;
  letter-spacing: 0.25em;
  color: rgba(250,247,242,0.3);
  text-transform: uppercase;
}

.loader__progress {
  width: 200px;
  height: 1px;
  background: rgba(255,255,255,0.08);
  overflow: hidden;
}

.loader__progress-bar {
  height: 100%;
  background: linear-gradient(90deg, transparent, #C9A96E, transparent);
  transform: scaleX(0);
  transform-origin: left center;
}

.loader-enter-active, .loader-leave-active { transition: opacity 0.4s ease; }
.loader-enter-from, .loader-leave-to { opacity: 0; }
</style>
