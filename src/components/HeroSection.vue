<template>
  <section class="hero" ref="heroRef">
    <!-- Background image with Ken Burns effect -->
    <div class="hero__bg" ref="heroBgRef">
      <img
        src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=2400&q=90"
        alt="Grand Comodores Hotel"
        class="hero__bg-img"
        ref="heroImgRef"
      />
      <div class="hero__bg-overlay"></div>
    </div>

    <!-- Vertical text (left side) -->
    <div class="hero__vertical-text" ref="heroVertRef">
      <span>Victoria Island · Lagos · Nigeria</span>
    </div>

    <!-- Scroll indicator -->
    <div class="hero__scroll" ref="heroScrollRef">
      <div class="hero__scroll-line"></div>
      <span>Scroll</span>
    </div>

    <!-- Main content -->
    <div class="hero__content">
      <div class="hero__eyebrow" ref="eyebrowRef">
        <span class="hero__eyebrow-line"></span>
        <span class="hero__eyebrow-text">Est. 2018 · Victoria Island</span>
        <span class="hero__eyebrow-line"></span>
      </div>

      <h1 class="hero__title" ref="titleRef">
        <span class="hero__title-line" ref="titleLine1">Grand</span>
        <span class="hero__title-line hero__title-line--italic" ref="titleLine2">Comodores</span>
      </h1>

      <p class="hero__subtitle" ref="subtitleRef">
        Lagos' most distinguished address — where West African heritage<br class="hide-mobile" />
        meets the pinnacle of contemporary luxury.
      </p>

      <div class="hero__actions" ref="actionsRef">
        <RouterLink to="/booking" class="btn-primary hero__btn-book">
          Reserve Your Stay
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </RouterLink>
        <RouterLink to="/rooms" class="btn-outline hero__btn-rooms">
          Explore Rooms
        </RouterLink>
      </div>

      <!-- Stats strip -->
      <div class="hero__stats" ref="statsRef">
        <div class="hero__stat" v-for="stat in stats" :key="stat.label">
          <span class="hero__stat-value">{{ stat.value }}</span>
          <span class="hero__stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </div>

    <!-- Award badge -->
    <div class="hero__badge" ref="badgeRef">
      <div class="hero__badge-inner">
        <span class="hero__badge-top">Forbes</span>
        <span class="hero__badge-star">★★★★★</span>
        <span class="hero__badge-bottom">Five Star</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const heroRef = ref(null)
const heroBgRef = ref(null)
const heroImgRef = ref(null)
const heroVertRef = ref(null)
const heroScrollRef = ref(null)
const eyebrowRef = ref(null)
const titleRef = ref(null)
const titleLine1 = ref(null)
const titleLine2 = ref(null)
const subtitleRef = ref(null)
const actionsRef = ref(null)
const statsRef = ref(null)
const badgeRef = ref(null)

const stats = [
  { value: '29', label: 'Floors' },
  { value: '128', label: 'Suites' },
  { value: '5★', label: 'Rating' },
  { value: '6', label: 'Restaurants' },
]

onMounted(() => {
  const tl = gsap.timeline({ delay: 0.3 })

  // Background zoom in
  gsap.set(heroImgRef.value, { scale: 1.12, opacity: 0 })

  tl.to(heroImgRef.value, {
    scale: 1,
    opacity: 1,
    duration: 2.2,
    ease: 'power3.out',
  })

  // Eyebrow
  tl.fromTo(eyebrowRef.value,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
    '-=1.6'
  )

  // Title lines
  tl.fromTo([titleLine1.value, titleLine2.value],
    { opacity: 0, y: 80, skewY: 5 },
    { opacity: 1, y: 0, skewY: 0, duration: 1.2, stagger: 0.15, ease: 'power4.out' },
    '-=0.8'
  )

  // Subtitle
  tl.fromTo(subtitleRef.value,
    { opacity: 0, y: 25 },
    { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
    '-=0.7'
  )

  // Actions
  tl.fromTo(actionsRef.value,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
    '-=0.5'
  )

  // Stats
  tl.fromTo(statsRef.value?.children ? Array.from(statsRef.value.children) : [],
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' },
    '-=0.4'
  )

  // Badge
  tl.fromTo(badgeRef.value,
    { opacity: 0, scale: 0.7, rotation: -15 },
    { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: 'back.out(1.4)' },
    '-=0.5'
  )

  // Vertical text + scroll
  tl.fromTo([heroVertRef.value, heroScrollRef.value],
    { opacity: 0 },
    { opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out' },
    '-=0.5'
  )

  // Parallax on scroll
  gsap.to(heroImgRef.value, {
    y: '25%',
    ease: 'none',
    scrollTrigger: {
      trigger: heroRef.value,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  })

  // Continuous Ken Burns
  gsap.to(heroImgRef.value, {
    scale: 1.08,
    duration: 20,
    ease: 'none',
    repeat: -1,
    yoyo: true,
    delay: 2,
  })

  // Scroll indicator fade out
  ScrollTrigger.create({
    trigger: heroRef.value,
    start: 'top top',
    end: '20% top',
    onUpdate: (self) => {
      gsap.set(heroScrollRef.value, { opacity: 1 - self.progress * 5 })
    },
  })
})
</script>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 700px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Background */
.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero__bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transform-origin: center;
}

.hero__bg-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(10, 9, 8, 0.72) 0%,
    rgba(10, 9, 8, 0.45) 50%,
    rgba(10, 9, 8, 0.65) 100%
  );
}

/* Vertical text */
.hero__vertical-text {
  position: absolute;
  left: 2.5rem;
  bottom: 8rem;
  z-index: 10;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  color: rgba(201, 169, 110, 0.7);
  text-transform: uppercase;
}

/* Scroll indicator */
.hero__scroll {
  position: absolute;
  right: 2.5rem;
  bottom: 4rem;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.hero__scroll-line {
  width: 1px;
  height: 60px;
  background: linear-gradient(to bottom, transparent, #C9A96E);
  animation: scrollLine 2s ease-in-out infinite;
}

@keyframes scrollLine {
  0% { transform: scaleY(0); transform-origin: top; }
  50% { transform: scaleY(1); transform-origin: top; }
  51% { transform: scaleY(1); transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}

.hero__scroll span {
  font-family: 'Inter', sans-serif;
  font-size: 0.55rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(250, 247, 242, 0.45);
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
}

/* Main content */
.hero__content {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 0 2rem;
  max-width: 900px;
}

/* Eyebrow */
.hero__eyebrow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.hero__eyebrow-line {
  display: block;
  width: 40px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #C9A96E);
}

.hero__eyebrow-line:last-child {
  background: linear-gradient(90deg, #C9A96E, transparent);
}

.hero__eyebrow-text {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 400;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #C9A96E;
}

/* Title */
.hero__title {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.75rem;
  overflow: visible;
}

.hero__title-line {
  display: block;
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(4.5rem, 12vw, 9rem);
  font-weight: 300;
  color: #FAF7F2;
  line-height: 0.95;
  letter-spacing: -0.01em;
}

.hero__title-line--italic {
  font-style: italic;
  font-weight: 400;
  color: #FAF7F2;
  margin-top: -0.1em;
}

/* Subtitle */
.hero__subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 300;
  line-height: 1.8;
  color: rgba(250, 247, 242, 0.65);
  letter-spacing: 0.02em;
  margin-bottom: 2.5rem;
}

/* Actions */
.hero__actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 4rem;
}

.hero__btn-book,
.hero__btn-rooms {
  text-decoration: none;
}

/* Stats */
.hero__stats {
  display: flex;
  gap: 3rem;
  justify-content: center;
  padding-top: 2.5rem;
  border-top: 1px solid rgba(255,255,255,0.1);
}

.hero__stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.hero__stat-value {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.75rem;
  font-weight: 400;
  color: #C9A96E;
  letter-spacing: 0.05em;
  line-height: 1;
}

.hero__stat-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(250, 247, 242, 0.4);
}

/* Award badge */
.hero__badge {
  position: absolute;
  bottom: 5rem;
  left: 6rem;
  z-index: 10;
}

.hero__badge-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border: 1px solid rgba(201,169,110,0.45);
  border-radius: 50%;
  padding: 0.5rem;
  background: rgba(10,9,8,0.4);
  backdrop-filter: blur(10px);
}

.hero__badge-top {
  font-family: 'Inter', sans-serif;
  font-size: 0.5rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(250,247,242,0.65);
}

.hero__badge-star {
  font-size: 0.55rem;
  color: #C9A96E;
  letter-spacing: 0.05em;
  line-height: 1.6;
}

.hero__badge-bottom {
  font-family: 'Inter', sans-serif;
  font-size: 0.5rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(250,247,242,0.65);
}

/* Responsive */
@media (max-width: 768px) {
  .hero__vertical-text { display: none; }
  .hero__badge { display: none; }
  .hero__scroll { right: 1.5rem; bottom: 2rem; }
  .hero__stats { gap: 1.5rem; }
  .hero__content { padding: 0 1.5rem; }
  .hide-mobile { display: none; }
}
</style>
