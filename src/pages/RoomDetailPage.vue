<template>
  <div class="room-detail" v-if="room">
    <!-- Gallery Hero -->
    <section class="room-gallery" ref="galleryRef">
      <div class="room-gallery__main" ref="mainImgRef">
        <img
          :src="room.images[activeImage]"
          :alt="room.name"
          class="room-gallery__main-img"
          @click="openLightbox(activeImage)"
        />
        <div class="room-gallery__main-overlay"></div>

        <!-- Category badge -->
        <div class="room-gallery__badge">
          {{ room.category }}
        </div>

        <!-- Navigation arrows -->
        <button class="room-gallery__prev" @click="prevImage" aria-label="Previous image">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <button class="room-gallery__next" @click="nextImage" aria-label="Next image">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>

      <!-- Thumbnails -->
      <div class="room-gallery__thumbs">
        <button
          v-for="(img, i) in room.images"
          :key="i"
          class="room-gallery__thumb"
          :class="{ 'room-gallery__thumb--active': activeImage === i }"
          @click="setImage(i)"
        >
          <img :src="img" :alt="`${room.name} view ${i + 1}`" />
        </button>
      </div>
    </section>

    <!-- Main content -->
    <div class="room-detail__body">
      <!-- Left: Room Info -->
      <div class="room-detail__info" ref="infoRef">
        <!-- Breadcrumb -->
        <nav class="room-detail__breadcrumb">
          <RouterLink to="/rooms">Rooms & Suites</RouterLink>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18l6-6-6-6"/></svg>
          <span>{{ room.category }}</span>
        </nav>

        <div class="room-detail__meta">
          <span class="room-detail__floor">{{ room.floor }} Floor</span>
          <span class="room-detail__separator">·</span>
          <span class="room-detail__view">{{ room.view }}</span>
        </div>

        <h1 class="room-detail__title" ref="titleRef">{{ room.name }}</h1>
        <p class="room-detail__tagline" ref="taglineRef">{{ room.tagline }}</p>

        <!-- Quick specs -->
        <div class="room-detail__specs" ref="specsRef">
          <div class="spec-item">
            <svg class="spec-item__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 13l2-5h14l2 5M3 13v5h18v-5M3 13h18"/></svg>
            <div>
              <span class="spec-item__label">Bed Type</span>
              <span class="spec-item__value">{{ room.beds }}</span>
            </div>
          </div>
          <div class="spec-item">
            <svg class="spec-item__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
            <div>
              <span class="spec-item__label">Room Size</span>
              <span class="spec-item__value">{{ room.size }} sq ft</span>
            </div>
          </div>
          <div class="spec-item">
            <svg class="spec-item__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            <div>
              <span class="spec-item__label">Max Guests</span>
              <span class="spec-item__value">{{ room.guests }} guests</span>
            </div>
          </div>
          <div class="spec-item">
            <svg class="spec-item__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 22a5 5 0 0 1-2-4v-3m0 0V9a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v6a5 5 0 0 1-5 5H9l-4 1z"/></svg>
            <div>
              <span class="spec-item__label">Bathrooms</span>
              <span class="spec-item__value">{{ room.bathrooms }}</span>
            </div>
          </div>
        </div>

        <!-- Description -->
        <div class="room-detail__description" ref="descRef">
          <p v-for="(para, i) in room.longDescription.split('\n\n')" :key="i">{{ para }}</p>
        </div>

        <!-- Amenities -->
        <div class="room-detail__amenities" ref="amenitiesRef">
          <h3 class="room-detail__amenities-title">Room Amenities</h3>
          <ul class="room-detail__amenities-list">
            <li
              v-for="amenity in room.amenities"
              :key="amenity"
              class="room-detail__amenity"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 6L9 17l-5-5"/></svg>
              {{ amenity }}
            </li>
          </ul>
        </div>

        <!-- Policies -->
        <div class="room-detail__policies">
          <h3 class="room-detail__amenities-title">Policies</h3>
          <div class="policies-grid">
            <div class="policy-item" v-for="p in policies" :key="p.label">
              <span class="policy-item__label">{{ p.label }}</span>
              <span class="policy-item__value">{{ p.value }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Booking Panel -->
      <div class="room-detail__booking-panel" ref="bookingRef">
        <div class="booking-panel">
          <div class="booking-panel__price">
            <span class="booking-panel__price-from">From</span>
            <span class="booking-panel__price-value">₦{{ Number(room.price).toLocaleString() }}</span>
            <span class="booking-panel__price-night">per night</span>
          </div>

          <div class="booking-panel__rating">
            <span class="booking-panel__stars">★★★★★</span>
            <span class="booking-panel__reviews">Forbes Five Star</span>
          </div>

          <div class="booking-panel__divider"></div>

          <BookingForm :compact="false" :preselectedRoom="room.id" />

          <div class="booking-panel__concierge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.26h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.1 6.1l.95-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <p>Prefer to book by phone? <a href="tel:+2341234567890">+234 123 456 7890</a></p>
          </div>
        </div>
      </div>
    </div>

    <!-- Similar rooms -->
    <section class="similar-rooms" ref="similarRef">
      <div class="similar-rooms__inner">
        <div class="similar-rooms__header">
          <span class="section-eyebrow">Continue Exploring</span>
          <h2 class="similar-rooms__title">Similar Rooms</h2>
        </div>
        <div class="similar-rooms__grid" ref="similarGridRef">
          <RoomCard
            v-for="r in similarRooms"
            :key="r.id"
            :room="r"
          />
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="lightbox">
        <div v-if="lightboxOpen" class="lightbox" @click.self="closeLightbox">
          <button class="lightbox__close" @click="closeLightbox" aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <button class="lightbox__prev" @click="prevImage" aria-label="Previous">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <div class="lightbox__image-wrap">
            <img :src="room.images[activeImage]" :alt="room.name" class="lightbox__image" />
          </div>
          <button class="lightbox__next" @click="nextImage" aria-label="Next">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <span class="lightbox__counter">{{ activeImage + 1 }} / {{ room.images.length }}</span>
        </div>
      </Transition>
    </Teleport>
  </div>

  <!-- 404 -->
  <div v-else class="room-not-found">
    <h2>Room not found</h2>
    <RouterLink to="/rooms" class="btn-primary">Back to Rooms</RouterLink>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BookingForm from '@/components/BookingForm.vue'
import RoomCard from '@/components/RoomCard.vue'
import { rooms } from '@/data/rooms'

gsap.registerPlugin(ScrollTrigger)

const route = useRoute()
const room = computed(() => rooms.find(r => r.slug === route.params.slug))
const similarRooms = computed(() =>
  rooms.filter(r => r.id !== room.value?.id).slice(0, 3)
)

const activeImage = ref(0)
const lightboxOpen = ref(false)

const setImage = (i) => { activeImage.value = i }
const nextImage = () => { activeImage.value = (activeImage.value + 1) % room.value.images.length }
const prevImage = () => { activeImage.value = (activeImage.value - 1 + room.value.images.length) % room.value.images.length }
const openLightbox = (i) => { activeImage.value = i; lightboxOpen.value = true }
const closeLightbox = () => { lightboxOpen.value = false }

const policies = [
  { label: 'Check-in', value: 'From 3:00 PM' },
  { label: 'Check-out', value: 'Until 12:00 PM' },
  { label: 'Cancellation', value: 'Free until 48 hrs prior' },
  { label: 'Pets', value: 'Upon request' },
  { label: 'Smoking', value: 'Non-smoking' },
  { label: 'Extra bed', value: 'Available on request' },
]

// Refs
const galleryRef = ref(null)
const mainImgRef = ref(null)
const infoRef = ref(null)
const titleRef = ref(null)
const taglineRef = ref(null)
const specsRef = ref(null)
const descRef = ref(null)
const amenitiesRef = ref(null)
const bookingRef = ref(null)
const similarRef = ref(null)
const similarGridRef = ref(null)

onMounted(() => {
  if (!room.value) return

  const tl = gsap.timeline({ delay: 0.2 })

  // Gallery entrance
  tl.fromTo(galleryRef.value,
    { opacity: 0 },
    { opacity: 1, duration: 0.8, ease: 'power2.out' }
  )

  // Title area
  tl.fromTo([titleRef.value, taglineRef.value],
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' },
    '-=0.4'
  )

  // Specs
  const specs = specsRef.value?.querySelectorAll('.spec-item')
  if (specs?.length) {
    tl.fromTo(specs,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' },
      '-=0.4'
    )
  }

  // Description scroll reveal
  if (descRef.value) {
    gsap.fromTo(descRef.value.children ? Array.from(descRef.value.children) : [],
      { opacity: 0, y: 25 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: descRef.value, start: 'top 80%' }
      }
    )
  }

  // Amenities
  if (amenitiesRef.value) {
    const items = amenitiesRef.value.querySelectorAll('.room-detail__amenity')
    gsap.fromTo(items,
      { opacity: 0, x: -15 },
      {
        opacity: 1, x: 0, duration: 0.6, stagger: 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: amenitiesRef.value, start: 'top 80%' }
      }
    )
  }

  // Booking panel
  gsap.fromTo(bookingRef.value,
    { opacity: 0, x: 30 },
    {
      opacity: 1, x: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: bookingRef.value, start: 'top 85%' }
    }
  )

  // Similar rooms
  if (similarGridRef.value) {
    const cards = similarGridRef.value.querySelectorAll('.room-card')
    gsap.fromTo(cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: similarRef.value, start: 'top 80%' }
      }
    )
  }
})

// Reset on route change
watch(() => route.params.slug, () => {
  activeImage.value = 0
  window.scrollTo(0, 0)
})
</script>

<style scoped>
/* Gallery */
.room-gallery {
  position: relative;
  background: #0A0908;
}

.room-gallery__main {
  position: relative;
  width: 100%;
  height: 70vh;
  overflow: hidden;
  cursor: zoom-in;
}

.room-gallery__main-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.room-gallery__main:hover .room-gallery__main-img {
  transform: scale(1.02);
}

.room-gallery__main-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10,9,8,0.4) 0%, transparent 50%);
  pointer-events: none;
}

.room-gallery__badge {
  position: absolute;
  top: 2rem;
  left: 2rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #FAF7F2;
  background: rgba(10,9,8,0.55);
  backdrop-filter: blur(8px);
  padding: 0.4rem 0.85rem;
  border: 1px solid rgba(201,169,110,0.3);
}

.room-gallery__prev,
.room-gallery__next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(10,9,8,0.5);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.15);
  color: #FAF7F2;
  cursor: pointer;
  transition: background 0.3s ease;
  z-index: 10;
}

.room-gallery__prev { left: 1.5rem; }
.room-gallery__next { right: 1.5rem; }

.room-gallery__prev:hover,
.room-gallery__next:hover {
  background: rgba(201,169,110,0.4);
}

.room-gallery__thumbs {
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  overflow-x: auto;
  background: #0A0908;
  scrollbar-width: none;
}

.room-gallery__thumbs::-webkit-scrollbar { display: none; }

.room-gallery__thumb {
  flex-shrink: 0;
  width: 80px;
  height: 56px;
  overflow: hidden;
  border: 2px solid transparent;
  cursor: pointer;
  opacity: 0.55;
  transition: opacity 0.3s ease, border-color 0.3s ease;
  padding: 0;
  background: none;
}

.room-gallery__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.room-gallery__thumb:hover { opacity: 0.8; }

.room-gallery__thumb--active {
  opacity: 1;
  border-color: #C9A96E;
}

/* Body layout */
.room-detail__body {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 0;
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 3rem;
  align-items: start;
}

/* Info */
.room-detail__breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  color: #9B968F;
}

.room-detail__breadcrumb a {
  color: #C9A96E;
  text-decoration: none;
  transition: color 0.3s ease;
}

.room-detail__breadcrumb a:hover { color: #A07840; }

.room-detail__meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.room-detail__floor,
.room-detail__view {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #C9A96E;
}

.room-detail__separator { color: rgba(201,169,110,0.3); }

.room-detail__title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.2rem, 4vw, 3rem);
  font-weight: 400;
  color: #0A0908;
  line-height: 1.15;
  margin-bottom: 0.5rem;
}

.room-detail__tagline {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  font-style: italic;
  color: #9B968F;
  margin-bottom: 2rem;
}

/* Specs */
.room-detail__specs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1.5rem 0;
  border-top: 1px solid rgba(201,169,110,0.12);
  border-bottom: 1px solid rgba(201,169,110,0.12);
  margin-bottom: 2.5rem;
}

.spec-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.spec-item__icon {
  color: #C9A96E;
  flex-shrink: 0;
}

.spec-item__label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #9B968F;
  margin-bottom: 0.15rem;
}

.spec-item__value {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.82rem;
  font-weight: 400;
  color: #1C1A18;
}

/* Description */
.room-detail__description {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.room-detail__description p {
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  font-weight: 300;
  line-height: 1.9;
  color: #6B6560;
}

/* Amenities */
.room-detail__amenities {
  margin-bottom: 2.5rem;
}

.room-detail__amenities-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3rem;
  font-weight: 400;
  color: #0A0908;
  margin-bottom: 1.25rem;
}

.room-detail__amenities-list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.65rem;
}

.room-detail__amenity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 300;
  color: #6B6560;
}

.room-detail__amenity svg {
  color: #C9A96E;
  flex-shrink: 0;
}

/* Policies */
.room-detail__policies {
  margin-bottom: 2.5rem;
}

.policies-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.policy-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.75rem;
  background: rgba(201,169,110,0.04);
  border: 1px solid rgba(201,169,110,0.1);
}

.policy-item__label {
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #9B968F;
}

.policy-item__value {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 300;
  color: #1C1A18;
}

/* Booking panel */
.room-detail__booking-panel {
  position: sticky;
  top: 100px;
}

.booking-panel {
  border: 1px solid rgba(201,169,110,0.15);
  overflow: hidden;
}

.booking-panel__price {
  padding: 1.5rem 2rem 0;
  background: #FAF7F2;
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
}

.booking-panel__price-from {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  color: #9B968F;
}

.booking-panel__price-value {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem;
  font-weight: 500;
  color: #0A0908;
  line-height: 1;
}

.booking-panel__price-night {
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  color: #9B968F;
}

.booking-panel__rating {
  padding: 0.5rem 2rem 1rem;
  background: #FAF7F2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.booking-panel__stars {
  font-size: 0.65rem;
  color: #C9A96E;
  letter-spacing: 0.1em;
}

.booking-panel__reviews {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  color: #9B968F;
}

.booking-panel__divider {
  height: 1px;
  background: rgba(201,169,110,0.12);
}

.booking-panel__concierge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: #FAF7F2;
  border-top: 1px solid rgba(201,169,110,0.1);
}

.booking-panel__concierge svg {
  color: #C9A96E;
  flex-shrink: 0;
}

.booking-panel__concierge p {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 300;
  color: #9B968F;
}

.booking-panel__concierge a {
  color: #C9A96E;
  text-decoration: none;
  font-weight: 400;
}

/* Similar rooms */
.similar-rooms {
  background: #FAF7F2;
  padding: 5rem 0;
  border-top: 1px solid rgba(201,169,110,0.1);
}

.similar-rooms__inner {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 3rem;
}

.similar-rooms__header {
  margin-bottom: 2.5rem;
}

.section-eyebrow {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #C9A96E;
  display: block;
  margin-bottom: 0.5rem;
}

.similar-rooms__title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.5rem;
  font-weight: 400;
  color: #0A0908;
}

.similar-rooms__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(10,9,8,0.97);
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox__close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  color: #FAF7F2;
  cursor: pointer;
  transition: background 0.3s ease;
}

.lightbox__close:hover { background: rgba(201,169,110,0.3); }

.lightbox__prev,
.lightbox__next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  color: #FAF7F2;
  cursor: pointer;
  transition: background 0.3s ease;
}

.lightbox__prev { left: 2rem; }
.lightbox__next { right: 2rem; }

.lightbox__prev:hover,
.lightbox__next:hover { background: rgba(201,169,110,0.3); }

.lightbox__image-wrap {
  max-width: 90vw;
  max-height: 90vh;
}

.lightbox__image {
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
}

.lightbox__counter {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  color: rgba(250,247,242,0.4);
}

.lightbox-enter-active, .lightbox-leave-active { transition: opacity 0.3s ease; }
.lightbox-enter-from, .lightbox-leave-to { opacity: 0; }

/* 404 */
.room-not-found {
  padding: 10rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

/* Responsive */
@media (max-width: 1100px) {
  .room-detail__body { grid-template-columns: 1fr; }
  .room-detail__booking-panel { position: static; }
  .similar-rooms__grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .room-detail__body { padding: 2.5rem 1.5rem; }
  .similar-rooms__inner { padding: 0 1.5rem; }
  .similar-rooms__grid { grid-template-columns: 1fr; }
  .room-detail__specs { grid-template-columns: 1fr; }
  .room-detail__amenities-list { grid-template-columns: 1fr; }
  .policies-grid { grid-template-columns: 1fr; }
  .room-gallery__main { height: 50vh; }
}
</style>
