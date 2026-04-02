<template>
  <div class="rooms-page">
    <!-- Page Hero -->
    <section class="page-hero" ref="heroRef">
      <div class="page-hero__bg">
        <img
          src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=2000&q=90"
          alt="Rooms at Grand Comodores"
          class="page-hero__img"
          ref="heroImgRef"
        />
        <div class="page-hero__overlay"></div>
      </div>
      <div class="page-hero__content" ref="heroContentRef">
        <span class="page-hero__eyebrow">128 Rooms & Suites</span>
        <h1 class="page-hero__title">Where You Rest,<br /><em>You Reign</em></h1>
        <p class="page-hero__subtitle">
          From the Executive City Room to the Lagoon Penthouse, each accommodation tells a story of Nigerian craftsmanship and global luxury.
        </p>
      </div>
      <div class="page-hero__scroll">
        <div class="page-hero__scroll-line"></div>
      </div>
    </section>

    <!-- Filters -->
    <section class="filter-bar" ref="filterRef">
      <div class="filter-bar__inner">
        <button
          v-for="cat in categories"
          :key="cat"
          class="filter-btn"
          :class="{ 'filter-btn--active': activeCategory === cat }"
          @click="setCategory(cat)"
        >
          {{ cat }}
        </button>
      </div>
    </section>

    <!-- Rooms Grid -->
    <section class="rooms-grid-section" ref="gridSectionRef">
      <div class="rooms-container">
        <TransitionGroup name="room-list" tag="div" class="rooms-grid" @enter="onCardEnter" @leave="onCardLeave">
          <RoomCard
            v-for="room in filteredRooms"
            :key="room.id"
            :room="room"
            class="rooms-grid__card"
          />
        </TransitionGroup>

        <div v-if="filteredRooms.length === 0" class="rooms-empty">
          <p>No rooms found in this category.</p>
        </div>
      </div>
    </section>

    <!-- Split booking CTA -->
    <section class="rooms-cta">
      <div class="rooms-cta__inner">
        <div class="rooms-cta__text">
          <span class="section-eyebrow section-eyebrow--gold">Reserve</span>
          <h2 class="rooms-cta__title">Ready to Book?</h2>
          <p class="rooms-cta__subtitle">
            Our concierge team is available 24 hours to assist with your reservation and any special requirements.
          </p>
          <div class="rooms-cta__actions">
            <RouterLink to="/booking" class="btn-primary">
              Book a Room
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </RouterLink>
            <a href="tel:+2341234567890" class="rooms-cta__phone">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.26h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.1 6.1l.95-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              +234 123 456 7890
            </a>
          </div>
        </div>
        <div class="rooms-cta__image">
          <img
            src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1000&q=90"
            alt="Grand Comodores Luxury Suite"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RoomCard from '@/components/RoomCard.vue'
import { rooms } from '@/data/rooms'

gsap.registerPlugin(ScrollTrigger)

const heroRef = ref(null)
const heroImgRef = ref(null)
const heroContentRef = ref(null)
const filterRef = ref(null)
const gridSectionRef = ref(null)

const categories = ['All', ...new Set(rooms.map(r => r.category))]
const activeCategory = ref('All')

const filteredRooms = computed(() =>
  activeCategory.value === 'All'
    ? rooms
    : rooms.filter(r => r.category === activeCategory.value)
)

const setCategory = (cat) => {
  activeCategory.value = cat
}

const onCardEnter = (el, done) => {
  gsap.fromTo(el,
    { opacity: 0, y: 30, scale: 0.97 },
    { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out', onComplete: done }
  )
}

const onCardLeave = (el, done) => {
  gsap.to(el,
    { opacity: 0, y: -20, duration: 0.3, ease: 'power2.in', onComplete: done }
  )
}

onMounted(() => {
  // Hero entrance
  const heroTl = gsap.timeline()

  gsap.set(heroImgRef.value, { scale: 1.1, opacity: 0 })

  heroTl.to(heroImgRef.value, { scale: 1, opacity: 1, duration: 1.8, ease: 'power3.out' })

  const heroItems = heroContentRef.value?.children ? Array.from(heroContentRef.value.children) : []
  heroTl.fromTo(heroItems,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' },
    '-=1.2'
  )

  // Parallax
  gsap.to(heroImgRef.value, {
    y: '20%',
    ease: 'none',
    scrollTrigger: {
      trigger: heroRef.value,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  })

  // Filter bar
  gsap.fromTo(filterRef.value,
    { opacity: 0, y: 20 },
    {
      opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: filterRef.value, start: 'top 90%' },
    }
  )

  // Cards
  const cards = document.querySelectorAll('.rooms-grid__card')
  gsap.fromTo(cards,
    { opacity: 0, y: 50 },
    {
      opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: gridSectionRef.value, start: 'top 80%' },
    }
  )
})
</script>

<style scoped>
/* Page Hero */
.page-hero {
  position: relative;
  height: 70vh;
  min-height: 500px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-hero__bg {
  position: absolute;
  inset: 0;
}

.page-hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.page-hero__overlay {
  position: absolute;
  inset: 0;
  background: rgba(10,9,8,0.6);
}

.page-hero__content {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 0 2rem;
  max-width: 750px;
}

.page-hero__eyebrow {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #C9A96E;
  display: block;
  margin-bottom: 1rem;
}

.page-hero__title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(3rem, 8vw, 5.5rem);
  font-weight: 300;
  color: #FAF7F2;
  line-height: 1.1;
  margin-bottom: 1.25rem;
}

.page-hero__title em {
  font-style: italic;
  color: rgba(250,247,242,0.85);
}

.page-hero__subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  font-weight: 300;
  line-height: 1.8;
  color: rgba(250,247,242,0.65);
}

.page-hero__scroll {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page-hero__scroll-line {
  width: 1px;
  height: 50px;
  background: linear-gradient(to bottom, transparent, #C9A96E);
  animation: scrollLine 2s ease-in-out infinite;
}

@keyframes scrollLine {
  0% { transform: scaleY(0); transform-origin: top; }
  50% { transform: scaleY(1); transform-origin: top; }
  51% { transform: scaleY(1); transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}

/* Filter bar */
.filter-bar {
  position: sticky;
  top: 72px;
  z-index: 100;
  background: #FAF7F2;
  border-bottom: 1px solid rgba(201,169,110,0.15);
  padding: 0 3rem;
}

.filter-bar__inner {
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  gap: 0;
  overflow-x: auto;
  scrollbar-width: none;
}

.filter-bar__inner::-webkit-scrollbar { display: none; }

.filter-btn {
  padding: 1.1rem 1.75rem;
  background: none;
  border: none;
  font-family: 'Inter', sans-serif;
  font-size: 0.68rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #9B968F;
  cursor: pointer;
  white-space: nowrap;
  border-bottom: 2px solid transparent;
  transition: color 0.3s ease, border-color 0.3s ease;
  position: relative;
}

.filter-btn:hover { color: #1C1A18; }

.filter-btn--active {
  color: #C9A96E;
  border-bottom-color: #C9A96E;
}

/* Grid */
.rooms-grid-section {
  padding: 4rem 0 6rem;
}

.rooms-container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 3rem;
}

.rooms-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.rooms-empty {
  text-align: center;
  padding: 4rem;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  color: #9B968F;
}

/* Transitions */
.room-list-enter-active,
.room-list-leave-active {
  transition: none; /* managed by GSAP */
}

/* CTA Section */
.rooms-cta {
  background: #0A0908;
  padding: 5rem 3rem;
}

.rooms-cta__inner {
  max-width: 1300px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.section-eyebrow { color: #C9A96E; }
.section-eyebrow--gold { color: #C9A96E; }

.rooms-cta__title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 400;
  color: #FAF7F2;
  margin: 0.5rem 0 1rem;
  line-height: 1.15;
}

.rooms-cta__subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  font-weight: 300;
  line-height: 1.8;
  color: rgba(250,247,242,0.5);
  margin-bottom: 2rem;
}

.rooms-cta__actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.rooms-cta__phone {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 400;
  color: rgba(250,247,242,0.5);
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: color 0.3s ease;
}

.rooms-cta__phone:hover { color: #C9A96E; }

.rooms-cta__image {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4/3;
}

.rooms-cta__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 1100px) {
  .rooms-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .filter-bar { padding: 0 1.5rem; }
  .rooms-container { padding: 0 1.5rem; }
  .rooms-grid { grid-template-columns: 1fr; }
  .rooms-cta__inner { grid-template-columns: 1fr; gap: 2.5rem; }
  .rooms-cta { padding: 3rem 1.5rem; }
}
</style>
