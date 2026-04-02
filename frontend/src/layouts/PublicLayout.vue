<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="min-h-screen bg-brand-950 text-slate-100">
    <header class="sticky top-0 z-30 border-b border-white/10 bg-brand-950/90 backdrop-blur">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <RouterLink to="/" class="font-display text-xl font-semibold tracking-wide text-brand-400">
          Grand Comodores
        </RouterLink>
        <nav class="hidden items-center gap-6 text-sm md:flex">
          <RouterLink to="/" class="nav-link">Home</RouterLink>
          <RouterLink to="/rooms" class="nav-link">Rooms</RouterLink>
          <RouterLink to="/admin/login" class="nav-link">Admin</RouterLink>
        </nav>
      </div>
    </header>

    <main>
      <RouterView />
    </main>

    <footer class="border-t border-white/10">
      <div class="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between md:px-8">
        <p>Grand Comodores Hotel • Lagos, Nigeria</p>
        <p>Premium comfort. Seamless bookings.</p>
      </div>
    </footer>
  </div>
</template>

