<template>
  <footer class="footer">
    <div class="footer__top">
      <div class="footer__brand">
        <div class="footer__logo">
          <span class="footer__logo-prefix">GRAND</span>
          <span class="footer__logo-name">COMODORES</span>
          <span class="footer__logo-sub">LAGOS · NIGERIA</span>
        </div>
        <p class="footer__tagline">
          Africa's most refined address.<br />
          Where luxury meets heritage.
        </p>
        <div class="footer__socials">
          <a v-for="s in socials" :key="s.name" :href="s.url" class="footer__social" :aria-label="s.name" target="_blank" rel="noopener">
            <component :is="s.icon" />
          </a>
        </div>
      </div>

      <div class="footer__links">
        <div v-for="col in columns" :key="col.title" class="footer__col">
          <h4 class="footer__col-title">{{ col.title }}</h4>
          <ul class="footer__col-list">
            <li v-for="link in col.links" :key="link.label">
              <RouterLink v-if="link.to" :to="link.to" class="footer__col-link">{{ link.label }}</RouterLink>
              <a v-else :href="link.href" class="footer__col-link">{{ link.label }}</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer__contact">
        <h4 class="footer__col-title">Find Us</h4>
        <address class="footer__address">
          <p>1 Comodore Boulevard</p>
          <p>Victoria Island, Lagos</p>
          <p>Nigeria</p>
        </address>
        <div class="footer__contact-links">
          <a href="tel:+2341234567890" class="footer__contact-link">+234 123 456 7890</a>
          <a href="mailto:reservations@grandcomodores.com" class="footer__contact-link">reservations@grandcomodores.com</a>
        </div>
        <div class="footer__awards">
          <div v-for="award in awards" :key="award" class="footer__award">{{ award }}</div>
        </div>
      </div>
    </div>

    <div class="footer__bottom">
      <p class="footer__copy">
        &copy; {{ new Date().getFullYear() }} Grand Comodores Hotel & Residences. All rights reserved.
      </p>
      <div class="footer__legal">
        <a href="#" class="footer__legal-link">Privacy Policy</a>
        <a href="#" class="footer__legal-link">Terms of Use</a>
        <a href="#" class="footer__legal-link">Cookie Policy</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
const columns = [
  {
    title: 'The Hotel',
    links: [
      { label: 'Rooms & Suites', to: '/rooms' },
      { label: 'Dining', href: '#' },
      { label: 'Spa & Wellness', href: '#' },
      { label: 'Events & Meetings', href: '#' },
      { label: 'Gallery', href: '#' },
    ],
  },
  {
    title: 'Experiences',
    links: [
      { label: 'Lagos City Tours', href: '#' },
      { label: 'Cultural Immersions', href: '#' },
      { label: 'Private Dining', href: '#' },
      { label: 'Wellness Retreats', href: '#' },
      { label: 'Bespoke Packages', to: '/booking' },
    ],
  },
  {
    title: 'Guest Services',
    links: [
      { label: 'Book a Room', to: '/booking' },
      { label: 'Reservations', to: '/booking' },
      { label: 'Loyalty Programme', href: '#' },
      { label: 'Airport Transfer', href: '#' },
      { label: 'Contact Us', to: '/contact' },
    ],
  },
]

const awards = [
  'Forbes Five Star 2024',
  'Condé Nast #1 Nigeria',
  'World Travel Awards',
]

const socials = [
  { name: 'Instagram', url: '#', icon: IconInstagram },
  { name: 'X / Twitter', url: '#', icon: IconX },
  { name: 'Facebook', url: '#', icon: IconFacebook },
  { name: 'LinkedIn', url: '#', icon: IconLinkedIn },
]

// Inline SVG icon components
const IconInstagram = {
  template: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>`
}
const IconX = {
  template: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.75l7.73-8.835L2.25 2.25h6.94l4.26 5.628L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>`
}
const IconFacebook = {
  template: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`
}
const IconLinkedIn = {
  template: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`
}
</script>

<style scoped>
.footer {
  background: #0A0908;
  color: rgba(250, 247, 242, 0.65);
  padding-top: 5rem;
}

.footer__top {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 3rem 4rem;
  display: grid;
  grid-template-columns: 280px 1fr 280px;
  gap: 4rem;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.footer__logo {
  display: flex;
  flex-direction: column;
  line-height: 1;
  letter-spacing: 0.08em;
  margin-bottom: 1.5rem;
}

.footer__logo-prefix {
  font-family: 'Inter', sans-serif;
  font-size: 0.55rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  color: #C9A96E;
}

.footer__logo-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  font-weight: 500;
  color: #FAF7F2;
  letter-spacing: 0.15em;
  margin-top: 0.15rem;
}

.footer__logo-sub {
  font-family: 'Inter', sans-serif;
  font-size: 0.5rem;
  font-weight: 300;
  letter-spacing: 0.2em;
  color: rgba(250, 247, 242, 0.35);
  margin-top: 0.2rem;
}

.footer__tagline {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem;
  font-style: italic;
  color: rgba(250,247,242,0.45);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.footer__socials {
  display: flex;
  gap: 1rem;
}

.footer__social {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid rgba(255,255,255,0.1);
  color: rgba(250,247,242,0.5);
  transition: color 0.3s ease, border-color 0.3s ease;
}

.footer__social:hover {
  color: #C9A96E;
  border-color: rgba(201, 169, 110, 0.4);
}

.footer__links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.footer__col-title {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #C9A96E;
  margin-bottom: 1.25rem;
}

.footer__col-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer__col-link {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 300;
  color: rgba(250,247,242,0.5);
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: color 0.3s ease;
}

.footer__col-link:hover {
  color: rgba(250,247,242,0.9);
}

.footer__address {
  font-style: normal;
  margin-bottom: 1.25rem;
}

.footer__address p {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 300;
  color: rgba(250,247,242,0.5);
  line-height: 1.8;
}

.footer__contact-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.footer__contact-link {
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  font-weight: 300;
  color: rgba(250,247,242,0.55);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer__contact-link:hover {
  color: #C9A96E;
}

.footer__awards {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.footer__award {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: rgba(201,169,110,0.6);
  text-transform: uppercase;
}

.footer__bottom {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.75rem 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer__copy {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  color: rgba(250,247,242,0.25);
  letter-spacing: 0.02em;
}

.footer__legal {
  display: flex;
  gap: 1.5rem;
}

.footer__legal-link {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  color: rgba(250,247,242,0.25);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer__legal-link:hover {
  color: rgba(250,247,242,0.6);
}

@media (max-width: 1100px) {
  .footer__top {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .footer__links {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .footer__top { padding: 0 1.5rem 3rem; }
  .footer__bottom { padding: 1.5rem; flex-direction: column; gap: 1rem; text-align: center; }
  .footer__links { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .footer__links { grid-template-columns: 1fr; }
}
</style>
