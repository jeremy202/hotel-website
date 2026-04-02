<template>
  <section class="mx-auto max-w-7xl px-6 py-12 lg:px-8">
    <SectionTitle
      eyebrow="Rooms"
      title="Find your perfect stay"
      description="Filter by budget and room type with smooth transitions."
    />

    <div class="mt-8 grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <div class="grid gap-4 md:grid-cols-4">
        <input
          v-model.number="filters.minPrice"
          class="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm outline-none"
          type="number"
          min="0"
          placeholder="Min price"
        />
        <input
          v-model.number="filters.maxPrice"
          class="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm outline-none"
          type="number"
          min="0"
          placeholder="Max price"
        />
        <select
          v-model="filters.type"
          class="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm outline-none"
        >
          <option value="">All room types</option>
          <option value="Deluxe">Deluxe</option>
          <option value="Executive">Executive</option>
          <option value="Presidential">Presidential</option>
        </select>
        <button
          class="rounded-xl bg-amber-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
          @click="loadRooms"
        >
          Apply Filters
        </button>
      </div>
    </div>

    <div class="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <RoomCard v-for="room in rooms" :key="room.id" :room="room" />
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import SectionTitle from "../../components/common/SectionTitle.vue";
import RoomCard from "../../components/public/RoomCard.vue";
import { fetchRooms } from "../../services/publicApi";

const rooms = ref([]);
const filters = ref({
  minPrice: "",
  maxPrice: "",
  type: "",
});

async function loadRooms() {
  rooms.value = await fetchRooms({
    minPrice: filters.value.minPrice || undefined,
    maxPrice: filters.value.maxPrice || undefined,
    type: filters.value.type || undefined,
    available: true,
  });
}

onMounted(loadRooms);
</script>
