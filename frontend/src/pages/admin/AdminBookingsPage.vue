<template>
  <section class="space-y-6">
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold text-slate-100">Bookings</h1>
      <p class="text-sm text-slate-400">{{ bookings.length }} records</p>
    </header>

    <div class="grid gap-3 md:grid-cols-3">
      <input
        v-model="filters.status"
        type="text"
        placeholder="Status (pending/confirmed/cancelled)"
        class="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 outline-none focus:border-amber-400"
      >
      <input
        v-model="filters.startDate"
        type="date"
        class="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 outline-none focus:border-amber-400"
      >
      <input
        v-model="filters.endDate"
        type="date"
        class="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 outline-none focus:border-amber-400"
      >
    </div>

    <button
      class="rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
      @click="loadBookings"
    >
      Refresh
    </button>

    <div class="overflow-x-auto rounded-2xl border border-white/10">
      <table class="min-w-full divide-y divide-white/10 text-sm">
        <thead class="bg-slate-900/80 text-left text-slate-300">
          <tr>
            <th class="px-4 py-3">Reference</th>
            <th class="px-4 py-3">Guest</th>
            <th class="px-4 py-3">Room</th>
            <th class="px-4 py-3">Dates</th>
            <th class="px-4 py-3">Total</th>
            <th class="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/10 bg-slate-950/60">
          <tr v-for="booking in bookings" :key="booking.id" class="text-slate-200">
            <td class="px-4 py-3">{{ booking.booking_reference }}</td>
            <td class="px-4 py-3">{{ booking.guest_name }}</td>
            <td class="px-4 py-3">{{ booking.room_name }}</td>
            <td class="px-4 py-3">{{ booking.check_in }} - {{ booking.check_out }}</td>
            <td class="px-4 py-3">₦{{ Number(booking.total_amount).toLocaleString() }}</td>
            <td class="px-4 py-3 capitalize">{{ booking.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { getAdminBookings } from "../../services/adminApi";

const bookings = ref([]);
const filters = reactive({
  status: "",
  startDate: "",
  endDate: "",
});

async function loadBookings() {
  try {
    bookings.value = await getAdminBookings(filters);
  } catch (error) {
    console.error("Failed to load bookings", error);
  }
}

onMounted(loadBookings);
</script>
