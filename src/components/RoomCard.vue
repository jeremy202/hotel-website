<template>
  <article class="room-card" ref="cardRef" @mouseenter="onEnter" @mouseleave="onLeave">
    <RouterLink :to="`/rooms/${room.slug}`" class="room-card__link">
      <!-- Image -->
      <div class="room-card__image-wrap" ref="imageWrapRef">
        <img
          :src="room.images[0]"
          :alt="room.name"
          class="room-card__image"
          ref="imageRef"
          loading="lazy"
        />
        <div class="room-card__image-overlay"></div>
        <div class="room-card__category">{{ room.category }}</div>
      </div>

      <!-- Body -->
      <div class="room-card__body">
        <div class="room-card__meta">
          <span class="room-card__floor">{{ room.floor }} Floor</span>
          <span class="room-card__view">{{ room.view }}</span>
        </div>

        <h3 class="room-card__name">{{ room.name }}</h3>
        <p class="room-card__tagline">{{ room.tagline }}</p>
        <p class="room-card__desc">{{ room.description }}</p>

        <div class="room-card__details">
          <span class="room-card__detail">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 13l2-5h14l2 5M3 13v5h18v-5M3 13h18"/><rect x="9" y="18" width="6" height="3" rx="0.5"/></svg>
            {{ room.beds }}
          </span>
          <span class="room-card__detail">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 12h16M4 6h16M4 18h16"/></svg>
            {{ room.size }} sq ft
          </span>
          <span class="room-card__detail">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Up to {{ room.guests }}
          </span>
        </div>

        <div class="room-card__footer">
          <div class="room-card__price">
            <span class="room-card__price-from">From</span>
            <span class="room-card__price-value">₦{{ Number(room.price).toLocaleString() }}</span>
            <span class="room-card__price-night">/night</span>
          </div>
          <span class="room-card__cta">
            Discover
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>
        </div>
      </div>
    </RouterLink>
  </article>
</template>

<script setup>
import { ref } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  room: {
    type: Object,
    required: true,
  },
})

const cardRef = ref(null)
const imageRef = ref(null)

const onEnter = () => {
  gsap.to(imageRef.value, {
    scale: 1.06,
    duration: 0.8,
    ease: 'power2.out',
  })
  gsap.to(cardRef.value, {
    y: -6,
    duration: 0.5,
    ease: 'power2.out',
  })
}

const onLeave = () => {
  gsap.to(imageRef.value, {
    scale: 1,
    duration: 0.8,
    ease: 'power2.out',
  })
  gsap.to(cardRef.value, {
    y: 0,
    duration: 0.5,
    ease: 'power2.out',
  })
}
</script>

<style scoped>
.room-card {
  background: #fff;
  border: 1px solid rgba(201, 169, 110, 0.12);
  overflow: hidden;
  position: relative;
  transition: box-shadow 0.5s ease;
  will-change: transform;
}

.room-card:hover {
  box-shadow: 0 24px 60px rgba(10, 9, 8, 0.14);
}

.room-card__link {
  display: block;
  text-decoration: none;
  color: inherit;
}

/* Image */
.room-card__image-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.room-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: none; /* managed by GSAP */
}

.room-card__image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10,9,8,0.35) 0%, transparent 60%);
  pointer-events: none;
}

.room-card__category {
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #FAF7F2;
  background: rgba(10,9,8,0.55);
  backdrop-filter: blur(8px);
  padding: 0.35rem 0.8rem;
  border: 1px solid rgba(201,169,110,0.3);
}

/* Body */
.room-card__body {
  padding: 1.5rem 1.75rem 1.75rem;
}

.room-card__meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.room-card__floor,
.room-card__view {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  color: #C9A96E;
  text-transform: uppercase;
}

.room-card__floor::after {
  content: '·';
  margin-left: 1rem;
  color: rgba(201,169,110,0.4);
}

.room-card__name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: #0A0908;
  margin-bottom: 0.25rem;
  line-height: 1.2;
}

.room-card__tagline {
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.9rem;
  font-style: italic;
  color: #9B968F;
  margin-bottom: 0.75rem;
}

.room-card__desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  font-weight: 300;
  line-height: 1.7;
  color: #6B6560;
  margin-bottom: 1.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.room-card__details {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem 0;
  border-top: 1px solid rgba(201,169,110,0.1);
  border-bottom: 1px solid rgba(201,169,110,0.1);
  margin-bottom: 1.25rem;
}

.room-card__detail {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  font-weight: 400;
  color: #9B968F;
  letter-spacing: 0.02em;
}

.room-card__detail svg {
  color: #C9A96E;
  flex-shrink: 0;
}

/* Footer */
.room-card__footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.room-card__price {
  display: flex;
  align-items: baseline;
  gap: 0.3rem;
}

.room-card__price-from {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  color: #9B968F;
  letter-spacing: 0.05em;
}

.room-card__price-value {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  font-weight: 500;
  color: #0A0908;
  line-height: 1;
}

.room-card__price-night {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  color: #9B968F;
}

.room-card__cta {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #C9A96E;
  transition: gap 0.3s ease;
}

.room-card:hover .room-card__cta {
  gap: 0.65rem;
}
</style>
