import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Core animation composable — provides reusable GSAP utilities
 */
export function useAnimation() {

  /**
   * Fade + slide up reveal for a single element
   */
  const revealUp = (element, options = {}) => {
    const {
      delay = 0,
      duration = 1.1,
      y = 50,
      ease = 'power3.out',
      trigger = element,
      start = 'top 85%',
    } = options

    return gsap.fromTo(element,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease,
        scrollTrigger: trigger ? {
          trigger,
          start,
          toggleActions: 'play none none none',
        } : null,
      }
    )
  }

  /**
   * Staggered reveal for multiple child elements
   */
  const revealStagger = (elements, options = {}) => {
    const {
      delay = 0,
      duration = 1,
      stagger = 0.12,
      y = 40,
      ease = 'power3.out',
      trigger = elements[0],
      start = 'top 80%',
    } = options

    return gsap.fromTo(elements,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        delay,
        ease,
        scrollTrigger: trigger ? {
          trigger,
          start,
          toggleActions: 'play none none none',
        } : null,
      }
    )
  }

  /**
   * Clip-path image reveal (wipe from bottom)
   */
  const revealImage = (element, options = {}) => {
    const {
      duration = 1.4,
      ease = 'power4.out',
      trigger = element,
      start = 'top 85%',
      delay = 0,
    } = options

    return gsap.fromTo(element,
      { clipPath: 'inset(100% 0% 0% 0%)', opacity: 1 },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration,
        delay,
        ease,
        scrollTrigger: trigger ? {
          trigger,
          start,
          toggleActions: 'play none none none',
        } : null,
      }
    )
  }

  /**
   * Parallax scroll effect
   */
  const parallax = (element, options = {}) => {
    const {
      speed = 0.3,
      trigger = element,
    } = options

    return gsap.to(element, {
      y: () => -ScrollTrigger.maxScroll(window) * speed,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  }

  /**
   * Horizontal scroll progress line
   */
  const scrollProgress = (element) => {
    return gsap.to(element, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0,
      },
    })
  }

  /**
   * Scale + fade hero entrance (no scroll trigger)
   */
  const heroEntrance = (elements, options = {}) => {
    const {
      delay = 0,
      stagger = 0.15,
    } = options

    return gsap.fromTo(elements,
      { opacity: 0, y: 60, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.4,
        delay,
        stagger,
        ease: 'power4.out',
      }
    )
  }

  /**
   * Fade in from direction
   */
  const fadeIn = (element, options = {}) => {
    const {
      direction = 'up',
      distance = 30,
      duration = 0.9,
      delay = 0,
      ease = 'power2.out',
    } = options

    const from = {
      opacity: 0,
      x: direction === 'left' ? -distance : direction === 'right' ? distance : 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
    }

    return gsap.fromTo(element, from, {
      opacity: 1, x: 0, y: 0,
      duration, delay, ease,
    })
  }

  /**
   * Number counter animation
   */
  const countUp = (element, end, options = {}) => {
    const {
      duration = 2,
      delay = 0,
      ease = 'power2.out',
      trigger = element,
    } = options

    const obj = { value: 0 }
    return gsap.to(obj, {
      value: end,
      duration,
      delay,
      ease,
      onUpdate: () => {
        element.textContent = Math.round(obj.value).toLocaleString()
      },
      scrollTrigger: trigger ? {
        trigger,
        start: 'top 80%',
        toggleActions: 'play none none none',
      } : null,
    })
  }

  return {
    revealUp,
    revealStagger,
    revealImage,
    parallax,
    scrollProgress,
    heroEntrance,
    fadeIn,
    countUp,
  }
}

/**
 * Navbar scroll behavior composable
 */
export function useNavbarScroll() {
  const isScrolled = ref(false)
  const isHidden = ref(false)
  let lastScrollY = 0

  const onScroll = () => {
    const y = window.scrollY
    isScrolled.value = y > 60
    isHidden.value = y > lastScrollY && y > 200
    lastScrollY = y
  }

  onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
  onUnmounted(() => window.removeEventListener('scroll', onScroll))

  return { isScrolled, isHidden }
}

/**
 * Scroll-triggered section animations via Intersection Observer
 */
export function useScrollReveal() {
  const observer = ref(null)

  onMounted(() => {
    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('[data-reveal]').forEach(el => {
      observer.value.observe(el)
    })
  })

  onUnmounted(() => {
    if (observer.value) observer.value.disconnect()
  })
}
