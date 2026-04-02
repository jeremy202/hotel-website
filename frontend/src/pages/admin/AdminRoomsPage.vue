<script setup>
import { onMounted, reactive, ref } from "vue";
import { createRoom, fetchRooms } from "../../services/adminApi";

const rooms = ref([]);
const showForm = ref(false);
const loading = ref(false);
const form = reactive({
  name: "",
  slug: "",
  roomType: "",
  description: "",
  pricePerNight: 150000,
  maxGuests: 2,
  amenities: "",
});

async function loadRooms() {
  try {
    rooms.value = await fetchRooms();
  } catch {
    rooms.value = [];
  }
}

async function submitRoom() {
  loading.value = true;
  try {
    await createRoom({
      name: form.name,
      slug: form.slug,
      roomType: form.roomType,
      description: form.description,
      pricePerNight: Number(form.pricePerNight),
      maxGuests: Number(form.maxGuests),
      amenities: form.amenities
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      isAvailable: true,
    });
    showForm.value = false;
    form.name = "";
    form.slug = "";
    form.roomType = "";
    form.description = "";
    form.pricePerNight = 150000;
    form.maxGuests = 2;
    form.amenities = "";
    await loadRooms();
  } finally {
    loading.value = false;
  }
}

onMounted(loadRooms);
</script>

<template>
  <section class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold text-slate-100">Rooms</h1>
      <button
        class="rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
        @click="showForm = !showForm"
      >
        {{ showForm ? "Close" : "Add Room" }}
      </button>
    </div>

    <form
      v-if="showForm"
      class="grid gap-3 rounded-2xl border border-white/10 bg-slate-900/70 p-4 md:grid-cols-2"
      @submit.prevent="submitRoom"
    >
      <input v-model="form.name" class="rounded-xl border border-white/10 bg-slate-950 px-4 py-2 text-slate-100" placeholder="Room name" required>
      <input v-model="form.slug" class="rounded-xl border border-white/10 bg-slate-950 px-4 py-2 text-slate-100" placeholder="Slug (e.g. royal-suite)" required>
      <input v-model="form.roomType" class="rounded-xl border border-white/10 bg-slate-950 px-4 py-2 text-slate-100" placeholder="Room type" required>
      <input v-model.number="form.pricePerNight" type="number" class="rounded-xl border border-white/10 bg-slate-950 px-4 py-2 text-slate-100" placeholder="Price per night" required>
      <input v-model.number="form.maxGuests" type="number" class="rounded-xl border border-white/10 bg-slate-950 px-4 py-2 text-slate-100" placeholder="Max guests" required>
      <input v-model="form.amenities" class="rounded-xl border border-white/10 bg-slate-950 px-4 py-2 text-slate-100" placeholder="Amenities (comma separated)">
      <textarea
        v-model="form.description"
        class="rounded-xl border border-white/10 bg-slate-950 px-4 py-2 text-slate-100 md:col-span-2"
        rows="3"
        placeholder="Description"
        required
      />
      <button
        type="submit"
        class="rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 md:col-span-2"
        :disabled="loading"
      >
        {{ loading ? "Saving..." : "Save Room" }}
      </button>
    </form>

    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <article
        v-for="room in rooms"
        :key="room.id"
        class="rounded-2xl border border-white/10 bg-slate-900/70 p-4"
      >
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-white">{{ room.name }}</h2>
          <span class="text-xs text-slate-300">{{ room.room_type }}</span>
        </div>
        <p class="mt-2 text-sm text-slate-300">{{ room.description }}</p>
        <div class="mt-4 flex items-center justify-between">
          <strong class="text-amber-300">₦{{ Number(room.price_per_night).toLocaleString() }}</strong>
          <span class="text-xs text-slate-300">{{ room.max_guests }} guests</span>
        </div>
      </article>
    </div>
  </section>
</template>
