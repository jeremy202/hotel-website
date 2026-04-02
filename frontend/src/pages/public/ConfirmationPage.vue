<template>
  <section class="mx-auto max-w-3xl px-4 py-14 sm:px-6">
    <div
      class="confirmation-card overflow-hidden rounded-3xl border border-emerald-400/30 bg-emerald-500/10 p-8 text-center shadow-2xl shadow-emerald-900/30"
    >
      <p class="text-sm uppercase tracking-[0.3em] text-emerald-300">Reservation confirmed</p>
      <h1 class="mt-3 text-3xl font-semibold text-white sm:text-4xl">
        Thank you for choosing Grand Comodores
      </h1>
      <p class="mt-4 text-slate-200">
        Your booking is confirmed and a receipt has been sent to your email. We look forward to welcoming you.
      </p>

      <div class="mt-8 space-y-3 text-left">
        <div
          v-if="reference"
          class="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-slate-200"
        >
          <span class="text-slate-400">Payment reference:</span>
          <span class="ml-2 font-medium text-white">{{ reference }}</span>
        </div>
        <div
          v-if="bookingId"
          class="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-slate-200"
        >
          <span class="text-slate-400">Booking ID:</span>
          <span class="ml-2 font-medium text-white">{{ bookingId }}</span>
        </div>
      </div>

      <router-link
        to="/rooms"
        class="mt-8 inline-flex items-center rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:scale-[1.02]"
      >
        Explore more rooms
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { gsap } from "gsap";
import { onMounted } from "vue";

const route = useRoute();

const reference = computed(() => route.query.reference);
const bookingId = computed(() => route.query.bookingId);

onMounted(() => {
  gsap.from(".confirmation-card", {
    y: 24,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
  });
});
</script>
