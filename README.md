# Grand Comodores — Lagos Luxury Hotel Website

A visually stunning, premium hotel website for **Grand Comodores**, a fictional Nigerian luxury hotel. Built with an emphasis on cinematic animations, elegant UI, and immersive user experience.

## Tech Stack

- **Vue 3** (Composition API)
- **Vite 8**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **GSAP** (with ScrollTrigger) — all animations
- **Vue Router 4**

## Design System

### Color Palette
| Token | Value | Usage |
|---|---|---|
| `--color-cream` | `#FAF7F2` | Background |
| `--color-gold` | `#C9A96E` | Accents, CTAs |
| `--color-obsidian` | `#0A0908` | Dark sections |
| `--color-charcoal` | `#1C1A18` | Text |
| `--color-stone` | `#6B6560` | Body copy |

### Typography
- **Display / Headings**: Cormorant Garamond (serif, weights 300–600)
- **Body / UI**: Inter (sans-serif, weights 300–600)

## Pages

| Route | Description |
|---|---|
| `/` | Homepage with fullscreen hero, room previews, amenities, testimonials, CTA |
| `/rooms` | All rooms with category filters and staggered grid |
| `/rooms/:slug` | Room detail with image gallery, lightbox, and booking panel |
| `/booking` | Full booking form with real-time price calculation |
| `/contact` | Contact form, info panel, map integration |

## Key Features

### Animations (GSAP)
- **Hero entrance**: Cinematic text reveal with skew + parallax background
- **Scroll reveals**: `revealUp`, `revealStagger`, `revealImage` (clip-path wipe)
- **Parallax**: Background images on hero and CTA sections
- **Card hover**: GSAP-managed scale and elevation transitions
- **Page loader**: Gold progress bar loader on first visit
- **Page transitions**: Fade + translateY between routes

### Components
- `AppNavbar` — Transparent → frosted glass on scroll, auto-hides on scroll down
- `HeroSection` — Fullscreen with Ken Burns effect, stats strip, scroll indicator
- `RoomCard` — Hover elevation + image zoom via GSAP
- `BookingForm` — Real-time night count + tax calculation, compact & full variants
- `PageLoader` — Cinematic loading screen

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── assets/
├── components/
│   ├── AppNavbar.vue
│   ├── AppFooter.vue
│   ├── HeroSection.vue
│   ├── RoomCard.vue
│   ├── BookingForm.vue
│   └── PageLoader.vue
├── composables/
│   └── useAnimation.js      # GSAP utility composables
├── data/
│   └── rooms.js             # Mock room & amenity data
├── pages/
│   ├── HomePage.vue
│   ├── RoomsPage.vue
│   ├── RoomDetailPage.vue
│   ├── BookingPage.vue
│   └── ContactPage.vue
├── router/
│   └── index.js
└── styles/
    └── main.css             # Design system, globals
```
