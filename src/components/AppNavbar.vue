<template>
  <header
    class="navbar"
    :class="{
      'navbar--scrolled': isScrolled,
      'navbar--hidden': isHidden,
    }"
  >
    <div class="navbar__inner">
      <!-- Logo -->
      <RouterLink to="/" class="navbar__logo" @click="closeMobile">
        <span class="navbar__logo-prefix">GRAND</span>
        <span class="navbar__logo-name">COMODORES</span>
        <span class="navbar__logo-sub">LAGOS · NIGERIA</span>
      </RouterLink>

      <!-- Desktop nav -->
      <nav class="navbar__nav" aria-label="Main navigation">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="navbar__link"
          :class="{ 'navbar__link--active': $route.path === item.path }"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <!-- CTA + Hamburger -->
      <div class="navbar__actions">
        <RouterLink to="/booking" class="navbar__cta" :class="{ 'navbar__cta--dark': isScrolled }">
          Book Now
        </RouterLink>
        <button
          class="navbar__hamburger"
          :class="{ 'navbar__hamburger--open': mobileOpen }"
          @click="toggleMobile"
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition name="mobile-menu">
      <div v-if="mobileOpen" class="navbar__mobile">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="navbar__mobile-link"
          @click="closeMobile"
        >
          {{ item.label }}
        </RouterLink>
        <RouterLink to="/booking" class="btn-primary navbar__mobile-cta" @click="closeMobile">
          Book Your Stay
        </RouterLink>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useNavbarScroll } from '@/composables/useAnimation'

const { isScrolled, isHidden } = useNavbarScroll()
const mobileOpen = ref(false)

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/rooms', label: 'Rooms & Suites' },
  { path: '/booking', label: 'Reservations' },
  { path: '/contact', label: 'Contact' },
]

const toggleMobile = () => { mobileOpen.value = !mobileOpen.value }
const closeMobile = () => { mobileOpen.value = false }
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: background 0.5s ease, backdrop-filter 0.5s ease, transform 0.4s ease, box-shadow 0.4s ease;
  transform: translateY(0);
}

.navbar--scrolled {
  background: rgba(10, 9, 8, 0.92);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  box-shadow: 0 1px 0 rgba(201, 169, 110, 0.15);
}

.navbar--hidden {
  transform: translateY(-100%);
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 3rem;
  max-width: 1600px;
  margin: 0 auto;
}

/* Logo */
.navbar__logo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1;
  letter-spacing: 0.08em;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.navbar__logo:hover { opacity: 0.8; }

.navbar__logo-prefix {
  font-family: 'Inter', sans-serif;
  font-size: 0.55rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  color: #C9A96E;
}

.navbar__logo-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.35rem;
  font-weight: 500;
  color: #FAF7F2;
  letter-spacing: 0.15em;
  margin-top: 0.1rem;
}

.navbar__logo-sub {
  font-family: 'Inter', sans-serif;
  font-size: 0.5rem;
  font-weight: 300;
  letter-spacing: 0.2em;
  color: rgba(250, 247, 242, 0.45);
  margin-top: 0.2rem;
}

/* Nav links */
.navbar__nav {
  display: flex;
  gap: 2.5rem;
}

.navbar__link {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(250, 247, 242, 0.75);
  text-decoration: none;
  position: relative;
  padding-bottom: 2px;
  transition: color 0.3s ease;
}

.navbar__link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: #C9A96E;
  transition: width 0.35s ease;
}

.navbar__link:hover,
.navbar__link--active {
  color: #FAF7F2;
}

.navbar__link:hover::after,
.navbar__link--active::after {
  width: 100%;
}

/* CTA */
.navbar__actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.navbar__cta {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #FAF7F2;
  border: 1px solid rgba(201, 169, 110, 0.6);
  padding: 0.6rem 1.5rem;
  text-decoration: none;
  transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}

.navbar__cta:hover,
.navbar__cta--dark {
  background: #C9A96E;
  border-color: #C9A96E;
}

/* Hamburger */
.navbar__hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.navbar__hamburger span {
  display: block;
  width: 24px;
  height: 1px;
  background: #FAF7F2;
  transition: all 0.3s ease;
  transform-origin: center;
}

.navbar__hamburger--open span:nth-child(1) {
  transform: translateY(6px) rotate(45deg);
}

.navbar__hamburger--open span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.navbar__hamburger--open span:nth-child(3) {
  transform: translateY(-6px) rotate(-45deg);
}

/* Mobile menu */
.navbar__mobile {
  display: flex;
  flex-direction: column;
  padding: 2rem 3rem 3rem;
  background: rgba(10, 9, 8, 0.97);
  backdrop-filter: blur(30px);
  border-top: 1px solid rgba(201, 169, 110, 0.1);
  gap: 0.5rem;
}

.navbar__mobile-link {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem;
  font-weight: 400;
  color: rgba(250, 247, 242, 0.85);
  text-decoration: none;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  transition: color 0.3s ease;
  letter-spacing: 0.05em;
}

.navbar__mobile-link:hover {
  color: #C9A96E;
}

.navbar__mobile-cta {
  margin-top: 1.5rem;
  align-self: flex-start;
  text-decoration: none;
}

/* Transition */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive */
@media (max-width: 900px) {
  .navbar__nav { display: none; }
  .navbar__hamburger { display: flex; }
  .navbar__inner { padding: 1.25rem 1.5rem; }
  .navbar__cta { display: none; }
}
</style>
