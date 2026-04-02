<template>
  <div class="booking-page">
    <!-- Page Hero -->
    <section class="booking-hero" ref="heroRef">
      <div class="booking-hero__bg">
        <img
          src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=2000&q=90"
          alt="Reserve at Grand Comodores"
          class="booking-hero__img"
          ref="heroImgRef"
        />
        <div class="booking-hero__overlay"></div>
      </div>
      <div class="booking-hero__content" ref="heroContentRef">
        <span class="booking-hero__eyebrow">Reservations</span>
        <h1 class="booking-hero__title">Reserve Your<br /><em>Stay</em></h1>
        <p class="booking-hero__subtitle">
          Every stay at Grand Comodores is a uniquely crafted experience. Let us begin yours.
        </p>
      </div>
    </section>

    <!-- Main booking layout -->
    <div class="booking-layout">
      <!-- Left: Booking form -->
      <div class="booking-layout__form" ref="formRef">
        <BookingForm :compact="false" />
      </div>

      <!-- Right: Experience highlights -->
      <div class="booking-layout__aside" ref="asideRef">
        <!-- Why Book Direct -->
        <div class="booking-aside-card">
          <h3 class="booking-aside-card__title">Why Book Direct</h3>
          <ul class="booking-perks">
            <li v-for="perk in perks" :key="perk.title" class="booking-perk">
              <div class="booking-perk__icon">
                <component :is="perk.icon" />
              </div>
              <div>
                <span class="booking-perk__title">{{ perk.title }}</span>
                <span class="booking-perk__desc">{{ perk.desc }}</span>
              </div>
            </li>
          </ul>
        </div>

        <!-- Featured room preview -->
        <div class="booking-featured" ref="featuredRef">
          <img
            src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=90"
            alt="Grand Premier Suite"
            class="booking-featured__image"
          />
          <div class="booking-featured__overlay">
            <div class="booking-featured__body">
              <span class="booking-featured__label">Most Popular</span>
              <h4 class="booking-featured__title">Grand Premier Suite</h4>
              <p class="booking-featured__price">From ₦850,000 / night</p>
              <RouterLink to="/rooms/grand-premier-suite" class="booking-featured__link">
                View Suite
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </RouterLink>
            </div>
          </div>
        </div>

        <!-- Contact -->
        <div class="booking-aside-card booking-contact">
          <h3 class="booking-aside-card__title">Need Assistance?</h3>
          <p class="booking-contact__desc">
            Our concierge team is available around the clock to help you craft the perfect stay.
          </p>
          <div class="booking-contact__methods">
            <a href="tel:+2341234567890" class="booking-contact__method">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.26h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.1 6.1l.95-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <div>
                <span>Telephone</span>
                <span>+234 123 456 7890</span>
              </div>
            </a>
            <a href="mailto:reservations@grandcomodores.com" class="booking-contact__method">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <div>
                <span>Email</span>
                <span>reservations@grandcomodores.com</span>
              </div>
            </a>
            <a href="#" class="booking-contact__method">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <div>
                <span>Live Chat</span>
                <span>Available 24/7</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Trust signals -->
    <section class="booking-trust" ref="trustRef">
      <div class="booking-trust__inner">
        <div v-for="t in trust" :key="t.label" class="trust-item">
          <component :is="t.icon" class="trust-item__icon" />
          <span class="trust-item__label">{{ t.label }}</span>
          <span class="trust-item__desc">{{ t.desc }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, h } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BookingForm from '@/components/BookingForm.vue'

gsap.registerPlugin(ScrollTrigger)

const heroRef = ref(null)
const heroImgRef = ref(null)
const heroContentRef = ref(null)
const formRef = ref(null)
const asideRef = ref(null)
const featuredRef = ref(null)
const trustRef = ref(null)

// Perk icons as render functions
const IconBestRate = { render: () => h('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 1.5 }, [h('path', { d: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' })]) }
const IconFlexible = { render: () => h('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 1.5 }, [h('path', { d: 'M9 11l3 3L22 4' }), h('path', { d: 'M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' })]) }
const IconUpgrade = { render: () => h('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 1.5 }, [h('polyline', { points: '17 11 12 6 7 11' }), h('polyline', { points: '17 18 12 13 7 18' })]) }
const IconEarlyLate = { render: () => h('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 1.5 }, [h('circle', { cx: 12, cy: 12, r: 10 }), h('polyline', { points: '12 6 12 12 16 14' })]) }

const perks = [
  { icon: IconBestRate, title: 'Best Rate Guarantee', desc: 'Always the lowest available price, guaranteed.' },
  { icon: IconFlexible, title: 'Free Cancellation', desc: 'Cancel without charge up to 48 hours before arrival.' },
  { icon: IconUpgrade, title: 'Complimentary Upgrade', desc: 'Subject to availability upon arrival.' },
  { icon: IconEarlyLate, title: 'Flexible Check-in', desc: 'Early check-in and late check-out on request.' },
]

// Trust icons
const IconSecure = { render: () => h('svg', { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 1.5 }, [h('path', { d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' })]) }
const IconAward = { render: () => h('svg', { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 1.5 }, [h('circle', { cx: 12, cy: 8, r: 6 }), h('path', { d: 'M15.477 12.89L17 22l-5-3-5 3 1.523-9.11' })]) }
const IconClock = { render: () => h('svg', { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 1.5 }, [h('circle', { cx: 12, cy: 12, r: 10 }), h('polyline', { points: '12 6 12 12 16 14' })]) }
const IconHeart = { render: () => h('svg', { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 1.5 }, [h('path', { d: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' })]) }

const trust = [
  { icon: IconSecure, label: 'Secure Booking', desc: '256-bit SSL encrypted payment processing' },
  { icon: IconAward, label: 'Forbes Five Star', desc: 'Internationally recognised excellence' },
  { icon: IconClock, label: '24/7 Concierge', desc: 'Always available, always exceptional' },
  { icon: IconHeart, label: 'Guest First', desc: 'Every request, every detail, always' },
]

onMounted(() => {
  const tl = gsap.timeline({ delay: 0.2 })

  gsap.set(heroImgRef.value, { scale: 1.08, opacity: 0 })

  tl.to(heroImgRef.value, { scale: 1, opacity: 1, duration: 1.8, ease: 'power3.out' })

  const heroItems = heroContentRef.value?.children ? Array.from(heroContentRef.value.children) : []
  tl.fromTo(heroItems,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' },
    '-=1.2'
  )

  gsap.to(heroImgRef.value, {
    y: '20%',
    ease: 'none',
    scrollTrigger: {
      trigger: heroRef.value,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    }
  })

  gsap.fromTo(formRef.value,
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: formRef.value, start: 'top 85%' }
    }
  )

  const asideItems = asideRef.value?.children ? Array.from(asideRef.value.children) : []
  gsap.fromTo(asideItems,
    { opacity: 0, x: 30 },
    {
      opacity: 1, x: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: asideRef.value, start: 'top 80%' }
    }
  )

  if (trustRef.value) {
    const items = trustRef.value.querySelectorAll('.trust-item')
    gsap.fromTo(items,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: trustRef.value, start: 'top 80%' }
      }
    )
  }
})
</script>

<style scoped>
/* Hero */
.booking-hero {
  position: relative;
  height: 60vh;
  min-height: 450px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.booking-hero__bg {
  position: absolute;
  inset: 0;
}

.booking-hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.booking-hero__overlay {
  position: absolute;
  inset: 0;
  background: rgba(10,9,8,0.62);
}

.booking-hero__content {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 0 2rem;
}

.booking-hero__eyebrow {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #C9A96E;
  display: block;
  margin-bottom: 1rem;
}

.booking-hero__title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 300;
  color: #FAF7F2;
  line-height: 1.1;
  margin-bottom: 1rem;
}

.booking-hero__title em { font-style: italic; color: #C9A96E; }

.booking-hero__subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  font-weight: 300;
  line-height: 1.8;
  color: rgba(250,247,242,0.65);
}

/* Layout */
.booking-layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 4rem;
  max-width: 1300px;
  margin: 0 auto;
  padding: 4rem 3rem;
  align-items: start;
}

/* Aside */
.booking-aside-card {
  border: 1px solid rgba(201,169,110,0.12);
  padding: 1.75rem;
  background: #fff;
  margin-bottom: 1.5rem;
}

.booking-aside-card__title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.25rem;
  font-weight: 400;
  color: #0A0908;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(201,169,110,0.12);
}

.booking-perks {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.booking-perk {
  display: flex;
  align-items: flex-start;
  gap: 0.875rem;
}

.booking-perk__icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(201,169,110,0.08);
  color: #C9A96E;
  flex-shrink: 0;
}

.booking-perk__title {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  color: #1C1A18;
  margin-bottom: 0.15rem;
}

.booking-perk__desc {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  font-weight: 300;
  color: #9B968F;
  line-height: 1.5;
}

/* Featured room */
.booking-featured {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.booking-featured__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.booking-featured:hover .booking-featured__image {
  transform: scale(1.04);
}

.booking-featured__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10,9,8,0.8) 0%, transparent 60%);
  display: flex;
  align-items: flex-end;
}

.booking-featured__body {
  padding: 1.25rem;
  width: 100%;
}

.booking-featured__label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.58rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #C9A96E;
  margin-bottom: 0.3rem;
}

.booking-featured__title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  font-weight: 400;
  color: #FAF7F2;
  margin-bottom: 0.25rem;
}

.booking-featured__price {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: rgba(250,247,242,0.6);
  margin-bottom: 0.6rem;
}

.booking-featured__link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #C9A96E;
  text-decoration: none;
  transition: gap 0.3s ease;
}

.booking-featured:hover .booking-featured__link { gap: 0.6rem; }

/* Contact methods */
.booking-contact__desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 300;
  color: #6B6560;
  line-height: 1.7;
  margin-bottom: 1.25rem;
}

.booking-contact__methods {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.booking-contact__method {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(201,169,110,0.04);
  border: 1px solid rgba(201,169,110,0.1);
  text-decoration: none;
  transition: background 0.3s ease;
}

.booking-contact__method:hover { background: rgba(201,169,110,0.08); }

.booking-contact__method svg { color: #C9A96E; flex-shrink: 0; }

.booking-contact__method span:first-child {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.58rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #9B968F;
  margin-bottom: 0.1rem;
}

.booking-contact__method span:last-child {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  font-weight: 300;
  color: #1C1A18;
}

/* Trust */
.booking-trust {
  background: #0A0908;
  padding: 4rem 3rem;
}

.booking-trust__inner {
  max-width: 1300px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.trust-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.75rem;
  padding: 2rem 1rem;
  border: 1px solid rgba(201,169,110,0.08);
}

.trust-item__icon {
  color: #C9A96E;
}

.trust-item__label {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  font-weight: 400;
  color: #FAF7F2;
}

.trust-item__desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  font-weight: 300;
  color: rgba(250,247,242,0.4);
  line-height: 1.6;
}

@media (max-width: 1100px) {
  .booking-layout { grid-template-columns: 1fr; }
  .booking-trust__inner { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .booking-layout { padding: 2.5rem 1.5rem; gap: 2.5rem; }
  .booking-trust { padding: 3rem 1.5rem; }
  .booking-trust__inner { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
}

@media (max-width: 480px) {
  .booking-trust__inner { grid-template-columns: 1fr; }
}
</style>
