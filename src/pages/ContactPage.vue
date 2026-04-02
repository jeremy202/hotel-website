<template>
  <div class="contact-page">
    <!-- Hero -->
    <section class="contact-hero" ref="heroRef">
      <div class="contact-hero__bg">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=2000&q=90"
          alt="Grand Comodores Contact"
          class="contact-hero__img"
          ref="heroImgRef"
        />
        <div class="contact-hero__overlay"></div>
      </div>
      <div class="contact-hero__content" ref="heroContentRef">
        <span class="contact-hero__eyebrow">Get In Touch</span>
        <h1 class="contact-hero__title">We're Here<br /><em>For You</em></h1>
        <p class="contact-hero__subtitle">
          Whether you're planning a stay, enquiring about events, or simply wish to speak with us — our team is ready.
        </p>
      </div>
    </section>

    <!-- Contact cards -->
    <section class="contact-cards" ref="cardsRef">
      <div class="contact-cards__inner">
        <div
          v-for="(card, i) in contactCards"
          :key="card.title"
          class="contact-card"
          ref="cardEls"
        >
          <div class="contact-card__icon">
            <component :is="card.icon" />
          </div>
          <h3 class="contact-card__title">{{ card.title }}</h3>
          <p class="contact-card__desc">{{ card.desc }}</p>
          <a :href="card.href" class="contact-card__action">{{ card.action }}</a>
        </div>
      </div>
    </section>

    <!-- Main contact section -->
    <section class="contact-main" ref="mainRef">
      <div class="contact-main__inner">
        <!-- Form -->
        <div class="contact-form-wrap" ref="formWrapRef">
          <div class="contact-form-header">
            <span class="section-eyebrow">Send a Message</span>
            <h2 class="contact-form-title">How Can We Help?</h2>
          </div>

          <form class="contact-form" @submit.prevent="onSubmit">
            <div class="contact-form__row">
              <div class="contact-form__field">
                <label class="contact-form__label">First Name</label>
                <input
                  v-model="form.firstName"
                  type="text"
                  class="contact-form__input"
                  placeholder="Your first name"
                  required
                />
              </div>
              <div class="contact-form__field">
                <label class="contact-form__label">Last Name</label>
                <input
                  v-model="form.lastName"
                  type="text"
                  class="contact-form__input"
                  placeholder="Your last name"
                />
              </div>
            </div>

            <div class="contact-form__row">
              <div class="contact-form__field">
                <label class="contact-form__label">Email Address</label>
                <input
                  v-model="form.email"
                  type="email"
                  class="contact-form__input"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div class="contact-form__field">
                <label class="contact-form__label">Phone Number</label>
                <input
                  v-model="form.phone"
                  type="tel"
                  class="contact-form__input"
                  placeholder="+234 801 234 5678"
                />
              </div>
            </div>

            <div class="contact-form__field">
              <label class="contact-form__label">Subject</label>
              <div class="contact-form__select-wrap">
                <select v-model="form.subject" class="contact-form__select">
                  <option value="">Select a subject</option>
                  <option v-for="s in subjects" :key="s" :value="s">{{ s }}</option>
                </select>
                <svg class="contact-form__select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 9l6 6 6-6"/></svg>
              </div>
            </div>

            <div class="contact-form__field">
              <label class="contact-form__label">Message</label>
              <textarea
                v-model="form.message"
                class="contact-form__input contact-form__textarea"
                rows="5"
                placeholder="Tell us how we can assist you..."
                required
              ></textarea>
            </div>

            <button type="submit" class="contact-form__submit" :disabled="submitted">
              <template v-if="!submitted">
                Send Message
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </template>
              <template v-else>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 6L9 17l-5-5"/></svg>
                Message Sent
              </template>
            </button>
          </form>
        </div>

        <!-- Info panel -->
        <div class="contact-info" ref="infoRef">
          <!-- Address -->
          <div class="contact-info-block">
            <div class="contact-info-block__icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div>
              <h4 class="contact-info-block__title">Our Address</h4>
              <p class="contact-info-block__text">1 Comodore Boulevard</p>
              <p class="contact-info-block__text">Victoria Island, Lagos</p>
              <p class="contact-info-block__text">Nigeria</p>
            </div>
          </div>

          <!-- Hours -->
          <div class="contact-info-block">
            <div class="contact-info-block__icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div>
              <h4 class="contact-info-block__title">Hours</h4>
              <p class="contact-info-block__text">Front Desk: 24 hours, 7 days</p>
              <p class="contact-info-block__text">Concierge: 7:00 AM – 11:00 PM</p>
              <p class="contact-info-block__text">Spa: 9:00 AM – 9:00 PM</p>
            </div>
          </div>

          <!-- How to find us -->
          <div class="contact-info-block">
            <div class="contact-info-block__icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="5 12 2 12 12 2 22 12 19 12"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/><path d="M9 21V12h6v9"/></svg>
            </div>
            <div>
              <h4 class="contact-info-block__title">Getting Here</h4>
              <p class="contact-info-block__text">5 min from Murtala Muhammed Airport (Private Transfer)</p>
              <p class="contact-info-block__text">Adjacent to Eko Atlantic City</p>
              <p class="contact-info-block__text">Valet parking available</p>
            </div>
          </div>

          <!-- Map placeholder -->
          <div class="contact-map" ref="mapRef">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000&q=90"
              alt="Grand Comodores Location Map"
              class="contact-map__img"
            />
            <div class="contact-map__overlay">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener"
                class="contact-map__link"
              >
                Open in Google Maps
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
          </div>

          <!-- Social -->
          <div class="contact-social">
            <h4 class="contact-social__title">Connect With Us</h4>
            <div class="contact-social__links">
              <a
                v-for="s in socials"
                :key="s.name"
                :href="s.url"
                class="contact-social__link"
                :aria-label="s.name"
              >
                <component :is="s.icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, h } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const heroRef = ref(null)
const heroImgRef = ref(null)
const heroContentRef = ref(null)
const cardsRef = ref(null)
const cardEls = ref([])
const mainRef = ref(null)
const formWrapRef = ref(null)
const infoRef = ref(null)
const mapRef = ref(null)

const subjects = [
  'Room Reservations',
  'Dining & Events',
  'Spa & Wellness',
  'Corporate Enquiry',
  'Wedding & Functions',
  'Media & Press',
  'General Enquiry',
]

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
})

const submitted = ref(false)

const onSubmit = () => {
  submitted.value = true
  setTimeout(() => { submitted.value = false }, 4000)
}

// Icons
const IconPhone = { render: () => h('svg', { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 1.5 }, [h('path', { d: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.26h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.1 6.1l.95-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z' })]) }
const IconEmail = { render: () => h('svg', { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 1.5 }, [h('path', { d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' }), h('polyline', { points: '22,6 12,13 2,6' })]) }
const IconLocation = { render: () => h('svg', { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 1.5 }, [h('path', { d: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' }), h('circle', { cx: 12, cy: 10, r: 3 })]) }
const IconWhatsApp = { render: () => h('svg', { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 1.5 }, [h('path', { d: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z' })]) }

const contactCards = [
  {
    icon: IconPhone,
    title: 'Call Us',
    desc: 'Speak directly with our reservations team, available 24 hours a day.',
    href: 'tel:+2341234567890',
    action: '+234 123 456 7890',
  },
  {
    icon: IconEmail,
    title: 'Email Us',
    desc: 'Send us your enquiry and we will respond within 2 hours.',
    href: 'mailto:reservations@grandcomodores.com',
    action: 'reservations@grandcomodores.com',
  },
  {
    icon: IconWhatsApp,
    title: 'WhatsApp',
    desc: 'Chat with our concierge team on WhatsApp for instant assistance.',
    href: '#',
    action: 'Start Chat',
  },
  {
    icon: IconLocation,
    title: 'Visit Us',
    desc: '1 Comodore Boulevard, Victoria Island, Lagos — accessible from all major routes.',
    href: 'https://maps.google.com',
    action: 'Get Directions',
  },
]

const socials = [
  {
    name: 'Instagram',
    url: '#',
    icon: { render: () => h('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 1.5 }, [h('rect', { x: 2, y: 2, width: 20, height: 20, rx: 5 }), h('circle', { cx: 12, cy: 12, r: 5 })]) }
  },
  {
    name: 'Facebook',
    url: '#',
    icon: { render: () => h('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'currentColor' }, [h('path', { d: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' })]) }
  },
  {
    name: 'X',
    url: '#',
    icon: { render: () => h('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'currentColor' }, [h('path', { d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.75l7.73-8.835L2.25 2.25h6.94l4.26 5.628L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z' })]) }
  },
]

onMounted(() => {
  // Hero
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
    scrollTrigger: { trigger: heroRef.value, start: 'top top', end: 'bottom top', scrub: true }
  })

  // Contact cards
  const cards = cardsRef.value?.querySelectorAll('.contact-card')
  if (cards) {
    gsap.fromTo(cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: cardsRef.value, start: 'top 80%' }
      }
    )
  }

  // Form
  gsap.fromTo(formWrapRef.value,
    { opacity: 0, x: -30 },
    {
      opacity: 1, x: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: mainRef.value, start: 'top 80%' }
    }
  )

  // Info
  gsap.fromTo(infoRef.value,
    { opacity: 0, x: 30 },
    {
      opacity: 1, x: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: mainRef.value, start: 'top 75%' }
    }
  )

  // Map reveal
  gsap.fromTo(mapRef.value,
    { clipPath: 'inset(100% 0% 0% 0%)' },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.2, ease: 'power4.out',
      scrollTrigger: { trigger: mapRef.value, start: 'top 85%' }
    }
  )
})
</script>

<style scoped>
/* Hero */
.contact-hero {
  position: relative;
  height: 60vh;
  min-height: 450px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-hero__bg {
  position: absolute;
  inset: 0;
}

.contact-hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.contact-hero__overlay {
  position: absolute;
  inset: 0;
  background: rgba(10,9,8,0.62);
}

.contact-hero__content {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 0 2rem;
}

.contact-hero__eyebrow {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #C9A96E;
  display: block;
  margin-bottom: 1rem;
}

.contact-hero__title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 300;
  color: #FAF7F2;
  line-height: 1.1;
  margin-bottom: 1rem;
}

.contact-hero__title em { font-style: italic; color: #C9A96E; }

.contact-hero__subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  font-weight: 300;
  line-height: 1.8;
  color: rgba(250,247,242,0.65);
  max-width: 500px;
  margin: 0 auto;
}

/* Contact cards */
.contact-cards {
  background: #0A0908;
  padding: 4rem 3rem;
}

.contact-cards__inner {
  max-width: 1300px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.contact-card {
  padding: 2rem 1.5rem;
  border: 1px solid rgba(201,169,110,0.1);
  background: rgba(255,255,255,0.02);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: background 0.3s ease, border-color 0.3s ease;
}

.contact-card:hover {
  background: rgba(255,255,255,0.04);
  border-color: rgba(201,169,110,0.25);
}

.contact-card__icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(201,169,110,0.25);
  color: #C9A96E;
  flex-shrink: 0;
  margin-bottom: 0.25rem;
}

.contact-card__title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  font-weight: 400;
  color: #FAF7F2;
}

.contact-card__desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  font-weight: 300;
  color: rgba(250,247,242,0.45);
  line-height: 1.65;
  flex: 1;
}

.contact-card__action {
  display: inline-block;
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: #C9A96E;
  text-decoration: none;
  border-bottom: 1px solid rgba(201,169,110,0.3);
  padding-bottom: 0.2rem;
  transition: border-color 0.3s ease;
}

.contact-card__action:hover { border-color: #C9A96E; }

/* Main section */
.contact-main {
  padding: 5rem 3rem;
  background: #FAF7F2;
}

.contact-main__inner {
  max-width: 1300px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 5rem;
  align-items: start;
}

/* Form */
.contact-form-header {
  margin-bottom: 2rem;
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

.contact-form-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.5rem;
  font-weight: 400;
  color: #0A0908;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.contact-form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.contact-form__label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #6B6560;
  margin-bottom: 0.5rem;
}

.contact-form__input {
  width: 100%;
  padding: 0.875rem 1rem;
  background: transparent;
  border: 1px solid rgba(201, 169, 110, 0.25);
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 300;
  color: #1C1A18;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  appearance: none;
}

.contact-form__input::placeholder { color: #C5BFBA; }

.contact-form__input:focus {
  border-color: #C9A96E;
  box-shadow: 0 0 0 3px rgba(201,169,110,0.08);
}

.contact-form__textarea {
  resize: vertical;
  min-height: 120px;
}

.contact-form__select-wrap {
  position: relative;
}

.contact-form__select {
  width: 100%;
  padding: 0.875rem 2.5rem 0.875rem 1rem;
  background: transparent;
  border: 1px solid rgba(201,169,110,0.25);
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 300;
  color: #1C1A18;
  outline: none;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  transition: border-color 0.3s ease;
}

.contact-form__select:focus { border-color: #C9A96E; }

.contact-form__select-arrow {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #C9A96E;
  pointer-events: none;
}

.contact-form__submit {
  width: 100%;
  padding: 1rem;
  background: #C9A96E;
  color: #FAF7F2;
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background 0.3s ease, transform 0.2s ease;
}

.contact-form__submit:hover:not(:disabled) {
  background: #A07840;
  transform: translateY(-1px);
}

.contact-form__submit:disabled { opacity: 0.7; cursor: not-allowed; }

/* Info panel */
.contact-info-block {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem 0;
  border-bottom: 1px solid rgba(201,169,110,0.1);
}

.contact-info-block:first-child { padding-top: 0; }

.contact-info-block__icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(201,169,110,0.08);
  color: #C9A96E;
  flex-shrink: 0;
  margin-top: 0.15rem;
}

.contact-info-block__title {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #C9A96E;
  margin-bottom: 0.5rem;
}

.contact-info-block__text {
  font-family: 'Inter', sans-serif;
  font-size: 0.82rem;
  font-weight: 300;
  color: #6B6560;
  line-height: 1.7;
}

/* Map */
.contact-map {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

.contact-map__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.contact-map__overlay {
  position: absolute;
  inset: 0;
  background: rgba(10,9,8,0.35);
  display: flex;
  align-items: flex-end;
  padding: 1rem;
}

.contact-map__link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #FAF7F2;
  background: rgba(10,9,8,0.7);
  backdrop-filter: blur(6px);
  padding: 0.5rem 1rem;
  text-decoration: none;
  border: 1px solid rgba(255,255,255,0.15);
  transition: background 0.3s ease;
}

.contact-map__link:hover { background: rgba(201,169,110,0.5); }

/* Social */
.contact-social__title {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #9B968F;
  margin-bottom: 0.75rem;
}

.contact-social__links {
  display: flex;
  gap: 0.75rem;
}

.contact-social__link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: 1px solid rgba(201,169,110,0.2);
  color: #9B968F;
  transition: color 0.3s ease, border-color 0.3s ease;
}

.contact-social__link:hover {
  color: #C9A96E;
  border-color: rgba(201,169,110,0.5);
}

@media (max-width: 1100px) {
  .contact-cards__inner { grid-template-columns: repeat(2, 1fr); }
  .contact-main__inner { grid-template-columns: 1fr; gap: 3rem; }
}

@media (max-width: 768px) {
  .contact-cards { padding: 3rem 1.5rem; }
  .contact-main { padding: 3rem 1.5rem; }
  .contact-cards__inner { grid-template-columns: 1fr; }
  .contact-form__row { grid-template-columns: 1fr; }
}
</style>
