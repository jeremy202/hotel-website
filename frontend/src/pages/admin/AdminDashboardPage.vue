<template>
  <section class="space-y-6">
    <h1 class="text-2xl font-semibold text-slate-100">Dashboard overview</h1>
    <div class="grid gap-4 md:grid-cols-3">
      <article class="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm">
        <p class="text-sm text-slate-400">Revenue</p>
        <p class="mt-2 text-2xl font-semibold text-white">
          ₦{{ Number(analytics.revenue || 0).toLocaleString() }}
        </p>
      </article>
      <article class="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm">
        <p class="text-sm text-slate-400">Bookings</p>
        <p class="mt-2 text-2xl font-semibold text-white">{{ analytics.totalBookings || 0 }}</p>
      </article>
      <article class="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm">
        <p class="text-sm text-slate-400">Occupancy</p>
        <p class="mt-2 text-2xl font-semibold text-white">{{ analytics.occupancyRate || 0 }}%</p>
      </article>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAdminAnalytics } from "../../services/adminApi";

const analytics = ref({});

onMounted(async () => {
  analytics.value = await getAdminAnalytics();
});
</script>
