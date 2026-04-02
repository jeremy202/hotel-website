import { createRouter, createWebHistory } from 'vue-router'
import gsap from 'gsap'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/HomePage.vue'),
    meta: { title: 'Grand Comodores — Lagos Luxury Hotel' },
  },
  {
    path: '/rooms',
    name: 'Rooms',
    component: () => import('@/pages/RoomsPage.vue'),
    meta: { title: 'Rooms & Suites — Grand Comodores' },
  },
  {
    path: '/rooms/:slug',
    name: 'RoomDetail',
    component: () => import('@/pages/RoomDetailPage.vue'),
    meta: { title: 'Room Detail — Grand Comodores' },
  },
  {
    path: '/booking',
    name: 'Booking',
    component: () => import('@/pages/BookingPage.vue'),
    meta: { title: 'Reserve Your Stay — Grand Comodores' },
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/pages/ContactPage.vue'),
    meta: { title: 'Contact Us — Grand Comodores' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

router.afterEach(() => {
  gsap.from('main', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: 'power2.out',
    clearProps: 'all',
  })
})

export default router
