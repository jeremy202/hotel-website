<template>
  <div class="home">
    <!-- Hero -->
    <HeroSection />

    <!-- Intro / Brand Statement -->
    <section class="intro section" ref="introRef">
      <div class="intro__inner container">
        <div class="intro__left" ref="introLeftRef">
          <div class="intro__ornament">
            <span class="ornament__line"></span>
            <span class="ornament__diamond"></span>
            <span class="ornament__line"></span>
          </div>
          <span class="section-eyebrow">Our Story</span>
        </div>
        <div class="intro__right">
          <h2 class="intro__heading" ref="introHeadingRef">
            The finest<br />
            <em>address</em> in Africa
          </h2>
          <div class="intro__body" ref="introBodyRef">
            <p>
              Grand Comodores was born from a singular conviction — that Nigerian luxury deserves its place among the world's finest addresses. Perched above Victoria Island, our 29-storey tower commands the meeting point of Lagos Lagoon and the Atlantic Ocean.
            </p>
            <p>
              Here, West African artistry and global sophistication are held in perfect tension. Every surface, every scent, every ritual of service has been conceived to honour both our heritage and our guests.
            </p>
          </div>
          <RouterLink to="/rooms" class="intro__link" ref="introLinkRef">
            Discover the Hotel
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Featured rooms -->
    <section class="featured-rooms section section--dark" ref="roomsRef">
      <div class="container">
        <div class="section-header" ref="roomsHeaderRef">
          <span class="section-eyebrow section-eyebrow--gold">Accommodations</span>
          <h2 class="section-title section-title--light">Rooms & Suites</h2>
          <p class="section-subtitle section-subtitle--light">
            Each of our 128 rooms and suites is a world unto itself — a curated sanctuary designed around beauty, comfort, and the spirit of Lagos.
          </p>
        </div>

        <div class="featured-rooms__grid" ref="roomGridRef">
          <RoomCard
            v-for="(room, i) in featuredRooms"
            :key="room.id"
            :room="room"
            class="featured-rooms__card"
          />
        </div>

        <div class="featured-rooms__cta">
          <RouterLink to="/rooms" class="btn-primary">
            View All Rooms & Suites
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Signature experiences / Amenities -->
    <section class="amenities section" ref="amenitiesRef">
      <div class="container">
        <div class="section-header" ref="amenitiesHeaderRef">
          <span class="section-eyebrow">Signature Experiences</span>
          <h2 class="section-title">Beyond the Room</h2>
          <p class="section-subtitle">
            Curated experiences that elevate every moment of your stay — from the pool at sunrise to the rooftop bar at dusk.
          </p>
        </div>

        <div class="amenities__grid" ref="amenitiesGridRef">
          <div
            v-for="(item, i) in amenities"
            :key="item.id"
            class="amenity-card"
            @mouseenter="onAmenityEnter($event.currentTarget, i)"
            @mouseleave="onAmenityLeave($event.currentTarget)"
          >
            <div class="amenity-card__image-wrap">
              <img :src="item.image" :alt="item.title" class="amenity-card__image" loading="lazy" />
              <div class="amenity-card__overlay"></div>
            </div>
            <div class="amenity-card__body">
              <h3 class="amenity-card__title">{{ item.title }}</h3>
              <p class="amenity-card__desc">{{ item.description }}</p>
              <span class="amenity-card__link">
                Learn more
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Immersive quote / split section -->
    <section class="quote-split" ref="quoteSplitRef">
      <div class="quote-split__image-half">
        <img
          src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1600&q=90"
          alt="Grand Comodores Pool"
          class="quote-split__image"
          ref="splitImgRef"
        />
        <div class="quote-split__image-overlay"></div>
        <div class="quote-split__image-label">Infinity Pool · 22nd Floor</div>
      </div>
      <div class="quote-split__text-half" ref="splitTextRef">
        <span class="section-eyebrow">Philosophy</span>
        <blockquote class="quote-split__quote">
          "Luxury is not a thing. It is the feeling of being entirely seen, entirely cared for."
        </blockquote>
        <cite class="quote-split__cite">— Emeka Okonkwo, Founder</cite>
        <div class="quote-split__stats">
          <div class="split-stat" v-for="s in splitStats" :key="s.label" ref="splitStatEls">
            <span class="split-stat__value">{{ s.value }}</span>
            <span class="split-stat__label">{{ s.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials section" ref="testimonialsRef">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">Guest Voices</span>
          <h2 class="section-title">What Our Guests Say</h2>
        </div>

        <div class="testimonials__track" ref="testimonialsTrack">
          <div
            v-for="t in testimonials"
            :key="t.id"
            class="testimonial-card"
          >
            <div class="testimonial-card__stars">★★★★★</div>
            <blockquote class="testimonial-card__quote">{{ t.quote }}</blockquote>
            <div class="testimonial-card__author">
              <img :src="t.avatar" :alt="t.name" class="testimonial-card__avatar" />
              <div>
                <span class="testimonial-card__name">{{ t.name }}</span>
                <span class="testimonial-card__title">{{ t.title }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Full CTA Section -->
    <section class="cta-section" ref="ctaRef">
      <div class="cta-section__bg">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=2000&q=90"
          alt="Grand Comodores exterior"
          class="cta-section__bg-img"
          ref="ctaBgImg"
        />
        <div class="cta-section__overlay"></div>
      </div>
      <div class="cta-section__content" ref="ctaContent">
        <span class="section-eyebrow section-eyebrow--gold">Begin Your Journey</span>
        <h2 class="cta-section__title">Reserve Your Stay at<br /><em>Grand Comodores</em></h2>
        <p class="cta-section__subtitle">
          Experience Lagos at its finest. Our reservations team is available around the clock to ensure every detail of your stay is beyond perfect.
        </p>
        <div class="cta-section__actions">
          <RouterLink to="/booking" class="btn-primary">
            Book Your Room
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </RouterLink>
          <a href="tel:+2341234567890" class="btn-outline">
            Call Us: +234 123 456 7890
          </a>
        </div>
      </div>
    </section>

    <!-- Inline booking strip -->
    <section class="booking-strip">
      <BookingForm :compact="true" />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from '@/components/HeroSection.vue'
import RoomCard from '@/components/RoomCard.vue'
import BookingForm from '@/components/BookingForm.vue'
import { rooms, amenities, testimonials } from '@/data/rooms'

gsap.registerPlugin(ScrollTrigger)

const featuredRooms = rooms.filter(r => r.featured)

const splitStats = [
  { value: '128', label: 'Rooms & Suites' },
  { value: '6', label: 'Dining Venues' },
  { value: '3,200', label: 'Sq ft Penthouse' },
]

// Refs
const introRef = ref(null)
const introLeftRef = ref(null)
const introHeadingRef = ref(null)
const introBodyRef = ref(null)
const introLinkRef = ref(null)
const roomsRef = ref(null)
const roomsHeaderRef = ref(null)
const roomGridRef = ref(null)
const amenitiesRef = ref(null)
const amenitiesHeaderRef = ref(null)
const amenitiesGridRef = ref(null)
const quoteSplitRef = ref(null)
const splitImgRef = ref(null)
const splitTextRef = ref(null)
const testimonialsRef = ref(null)
const testimonialsTrack = ref(null)
const ctaRef = ref(null)
const ctaBgImg = ref(null)
const ctaContent = ref(null)

const onAmenityEnter = (el) => {
  const img = el.querySelector('.amenity-card__image')
  gsap.to(img, { scale: 1.06, duration: 0.7, ease: 'power2.out' })
  gsap.to(el, { y: -4, duration: 0.4, ease: 'power2.out' })
}

const onAmenityLeave = (el) => {
  const img = el.querySelector('.amenity-card__image')
  gsap.to(img, { scale: 1, duration: 0.7, ease: 'power2.out' })
  gsap.to(el, { y: 0, duration: 0.4, ease: 'power2.out' })
}

onMounted(() => {
  // Intro section
  gsap.fromTo(introLeftRef.value,
    { opacity: 0, x: -30 },
    {
      opacity: 1, x: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: introRef.value, start: 'top 80%' }
    }
  )
  gsap.fromTo(introHeadingRef.value,
    { opacity: 0, y: 50 },
    {
      opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: introRef.value, start: 'top 75%' }
    }
  )
  gsap.fromTo([introBodyRef.value, introLinkRef.value],
    { opacity: 0, y: 30 },
    {
      opacity: 1, y: 0, duration: 0.9, stagger: 0.2, ease: 'power3.out',
      scrollTrigger: { trigger: introRef.value, start: 'top 70%' }
    }
  )

  // Rooms section header
  gsap.fromTo(roomsHeaderRef.value?.children ? Array.from(roomsHeaderRef.value.children) : [],
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: roomsRef.value, start: 'top 80%' }
    }
  )

  // Room cards stagger
  if (roomGridRef.value) {
    const cards = roomGridRef.value.querySelectorAll('.featured-rooms__card')
    gsap.fromTo(cards,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: roomGridRef.value, start: 'top 80%' }
      }
    )
  }

  // Amenities header
  gsap.fromTo(amenitiesHeaderRef.value?.children ? Array.from(amenitiesHeaderRef.value.children) : [],
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: amenitiesRef.value, start: 'top 80%' }
    }
  )

  // Amenity cards
  if (amenitiesGridRef.value) {
    const cards = amenitiesGridRef.value.querySelectorAll('.amenity-card')
    gsap.fromTo(cards,
      { opacity: 0, y: 50, scale: 0.97 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: amenitiesGridRef.value, start: 'top 80%' }
      }
    )
  }

  // Quote split - image reveal
  gsap.fromTo(splitImgRef.value,
    { clipPath: 'inset(100% 0% 0% 0%)' },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.4, ease: 'power4.out',
      scrollTrigger: { trigger: quoteSplitRef.value, start: 'top 75%' }
    }
  )

  // Split text
  const splitTextItems = splitTextRef.value?.children ? Array.from(splitTextRef.value.children) : []
  gsap.fromTo(splitTextItems,
    { opacity: 0, x: 40 },
    {
      opacity: 1, x: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: quoteSplitRef.value, start: 'top 70%' }
    }
  )

  // Testimonials
  if (testimonialsTrack.value) {
    const cards = testimonialsTrack.value.querySelectorAll('.testimonial-card')
    gsap.fromTo(cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: testimonialsRef.value, start: 'top 80%' }
      }
    )
  }

  // CTA parallax
  gsap.to(ctaBgImg.value, {
    y: '20%',
    ease: 'none',
    scrollTrigger: {
      trigger: ctaRef.value,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    }
  })

  // CTA content
  const ctaChildren = ctaContent.value?.children ? Array.from(ctaContent.value.children) : []
  gsap.fromTo(ctaChildren,
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: ctaRef.value, start: 'top 75%' }
    }
  )
})
</script>

<style scoped>
/* ===========================
   Layout helpers
=========================== */
.container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 3rem;
}

.section {
  padding: 7rem 0;
}

.section--dark {
  background: #0A0908;
}

/* Section headers */
.section-header {
  text-align: center;
  max-width: 680px;
  margin: 0 auto 4rem;
}

.section-eyebrow {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #C9A96E;
  display: block;
  margin-bottom: 0.75rem;
}

.section-eyebrow--gold {
  color: #C9A96E;
}

.section-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 400;
  color: #0A0908;
  margin-bottom: 1rem;
  line-height: 1.15;
}

.section-title--light {
  color: #FAF7F2;
}

.section-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  font-weight: 300;
  line-height: 1.85;
  color: #6B6560;
  letter-spacing: 0.01em;
}

.section-subtitle--light {
  color: rgba(250,247,242,0.5);
}

/* ===========================
   Intro
=========================== */
.intro__inner {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 5rem;
  align-items: start;
}

.intro__left {
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}

.intro__ornament {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.ornament__line {
  display: block;
  width: 35px;
  height: 1px;
  background: #C9A96E;
}

.ornament__diamond {
  display: block;
  width: 6px;
  height: 6px;
  background: #C9A96E;
  transform: rotate(45deg);
}

.intro__heading {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.8rem, 5vw, 4rem);
  font-weight: 300;
  color: #0A0908;
  line-height: 1.15;
  margin-bottom: 1.75rem;
}

.intro__heading em {
  font-style: italic;
  color: #C9A96E;
}

.intro__body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.intro__body p {
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  font-weight: 300;
  line-height: 1.9;
  color: #6B6560;
}

.intro__link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #C9A96E;
  text-decoration: none;
  border-bottom: 1px solid rgba(201,169,110,0.3);
  padding-bottom: 0.25rem;
  transition: gap 0.3s ease, border-color 0.3s ease;
}

.intro__link:hover {
  gap: 0.85rem;
  border-color: #C9A96E;
}

/* ===========================
   Featured Rooms
=========================== */
.featured-rooms__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.featured-rooms__cta {
  text-align: center;
}

/* ===========================
   Amenities
=========================== */
.amenities__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.amenity-card {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  will-change: transform;
  transition: box-shadow 0.4s ease;
}

.amenity-card:hover {
  box-shadow: 0 20px 50px rgba(10,9,8,0.12);
}

.amenity-card__image-wrap {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
}

.amenity-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform-origin: center;
}

.amenity-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10,9,8,0.8) 0%, rgba(10,9,8,0.2) 60%, transparent 100%);
}

.amenity-card__body {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
}

.amenity-card__title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3rem;
  font-weight: 400;
  color: #FAF7F2;
  margin-bottom: 0.4rem;
  line-height: 1.2;
}

.amenity-card__desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 300;
  color: rgba(250,247,242,0.7);
  line-height: 1.6;
  margin-bottom: 0.75rem;
}

.amenity-card__link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #C9A96E;
  transition: gap 0.3s ease;
}

.amenity-card:hover .amenity-card__link {
  gap: 0.6rem;
}

/* ===========================
   Quote Split
=========================== */
.quote-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 600px;
}

.quote-split__image-half {
  position: relative;
  overflow: hidden;
}

.quote-split__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.quote-split__image-overlay {
  position: absolute;
  inset: 0;
  background: rgba(10,9,8,0.25);
}

.quote-split__image-label {
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(250,247,242,0.7);
  background: rgba(10,9,8,0.5);
  padding: 0.4rem 0.8rem;
  backdrop-filter: blur(6px);
}

.quote-split__text-half {
  background: #1C1A18;
  padding: 5rem 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
}

.quote-split__quote {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 300;
  font-style: italic;
  color: #FAF7F2;
  line-height: 1.5;
  border-left: 2px solid #C9A96E;
  padding-left: 1.5rem;
}

.quote-split__cite {
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #C9A96E;
  font-style: normal;
}

.quote-split__stats {
  display: flex;
  gap: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255,255,255,0.08);
  margin-top: 0.5rem;
}

.split-stat {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.split-stat__value {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem;
  font-weight: 400;
  color: #C9A96E;
  line-height: 1;
}

.split-stat__label {
  font-family: 'Inter', sans-serif;
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(250,247,242,0.35);
}

/* ===========================
   Testimonials
=========================== */
.testimonials__track {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.testimonial-card {
  background: #fff;
  border: 1px solid rgba(201,169,110,0.12);
  padding: 2rem 2rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.testimonial-card__stars {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: #C9A96E;
}

.testimonial-card__quote {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  font-weight: 400;
  font-style: italic;
  color: #1C1A18;
  line-height: 1.65;
  flex: 1;
}

.testimonial-card__author {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(201,169,110,0.12);
}

.testimonial-card__avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.testimonial-card__name {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  color: #0A0908;
  letter-spacing: 0.02em;
}

.testimonial-card__title {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 300;
  color: #9B968F;
  margin-top: 0.1rem;
}

/* ===========================
   CTA Section
=========================== */
.cta-section {
  position: relative;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.cta-section__bg {
  position: absolute;
  inset: 0;
}

.cta-section__bg-img {
  width: 100%;
  height: 120%;
  object-fit: cover;
  object-position: center;
}

.cta-section__overlay {
  position: absolute;
  inset: 0;
  background: rgba(10,9,8,0.68);
}

.cta-section__content {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 4rem 2rem;
  max-width: 700px;
}

.cta-section__title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 300;
  color: #FAF7F2;
  line-height: 1.2;
  margin: 0.75rem 0 1.25rem;
}

.cta-section__title em {
  font-style: italic;
  color: #C9A96E;
}

.cta-section__subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  font-weight: 300;
  line-height: 1.85;
  color: rgba(250,247,242,0.6);
  margin-bottom: 2.5rem;
}

.cta-section__actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* ===========================
   Booking Strip
=========================== */
.booking-strip {
  background: #0A0908;
}

/* ===========================
   Responsive
=========================== */
@media (max-width: 1100px) {
  .featured-rooms__grid { grid-template-columns: repeat(2, 1fr); }
  .amenities__grid { grid-template-columns: repeat(2, 1fr); }
  .testimonials__track { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 900px) {
  .intro__inner { grid-template-columns: 1fr; gap: 2.5rem; }
  .quote-split { grid-template-columns: 1fr; }
  .quote-split__image-half { min-height: 350px; }
  .quote-split__text-half { padding: 3rem 2rem; }
}

@media (max-width: 768px) {
  .container { padding: 0 1.5rem; }
  .section { padding: 4rem 0; }
  .featured-rooms__grid { grid-template-columns: 1fr; }
  .amenities__grid { grid-template-columns: 1fr; }
  .testimonials__track { grid-template-columns: 1fr; }
  .quote-split__stats { flex-wrap: wrap; gap: 1.5rem; }
}
</style>
