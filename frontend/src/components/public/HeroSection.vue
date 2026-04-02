<script setup>
import { onMounted, ref } from "vue";
import { gsap } from "gsap";
import BaseButton from "../common/BaseButton.vue";

const heroRef = ref(null);

onMounted(() => {
  if (!heroRef.value) return;

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.from(".hero-badge", { y: 20, opacity: 0, duration: 0.7 })
    .from(".hero-title", { y: 40, opacity: 0, duration: 0.8 }, "-=0.3")
    .from(".hero-subtitle", { y: 22, opacity: 0, duration: 0.7 }, "-=0.35")
    .from(".hero-cta", { y: 18, opacity: 0, duration: 0.6 }, "-=0.3")
    .from(".hero-image", { scale: 1.08, opacity: 0, duration: 1.1 }, "-=0.65");
});
</script>

<template>
  <section
    ref="heroRef"
    class="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 md:p-12"
  >
    <div class="grid items-center gap-10 lg:grid-cols-2">
      <div class="space-y-6">
        <div class="hero-badge inline-flex rounded-full border border-brand-300/50 px-4 py-1 text-xs uppercase tracking-[0.28em] text-brand-300">
          Grand Comodores
        </div>
        <h1 class="hero-title text-4xl font-bold leading-tight md:text-6xl">
          A Luxury Coastal Escape in
          <span class="text-brand-300">Nigeria</span>
        </h1>
        <p class="hero-subtitle max-w-xl text-white/75">
          Discover refined comfort, curated dining, and serene waterfront living. Book an unforgettable premium experience.
        </p>
        <div class="hero-cta flex flex-wrap gap-3">
          <router-link to="/rooms">
            <BaseButton>Explore Rooms</BaseButton>
          </router-link>
          <router-link to="/admin/login">
            <BaseButton variant="secondary">Admin Login</BaseButton>
          </router-link>
        </div>
      </div>

      <div class="hero-image relative">
        <div class="absolute -inset-2 rounded-3xl bg-brand-300/20 blur-3xl"></div>
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80"
          alt="Luxury hotel facade"
          class="relative h-[340px] w-full rounded-3xl object-cover shadow-2xl shadow-black/50 md:h-[420px]"
        />
      </div>
    </div>
  </section>
</template>
