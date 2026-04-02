<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetchRoomById } from "../../services/publicApi";
import BaseButton from "../../components/common/BaseButton.vue";
import { useGsapReveal } from "../../animations/useGsapReveal";

const route = useRoute();
const router = useRouter();
const room = ref(null);
const loading = ref(true);
const error = ref("");
const selectedImage = ref("");

const imageList = computed(() => room.value?.images || []);

onMounted(async () => {
  try {
    room.value = await fetchRoomById(route.params.id);
    selectedImage.value = imageList.value[0]?.image_url || "";
  } catch (err) {
    error.value = err.response?.data?.message || "Unable to load room details.";
  } finally {
    loading.value = false;
  }
});

useGsapReveal(".gsap-room-detail", { y: 24 });
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
    <div v-if="loading" class="rounded-2xl border border-white/10 bg-white/5 p-8">
      Loading room details...
    </div>
    <div v-else-if="error" class="rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-red-100">
      {{ error }}
    </div>
    <div v-else-if="room" class="gsap-room-detail grid gap-8 lg:grid-cols-2">
      <div class="space-y-4">
        <img
          :src="selectedImage || room.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80'"
          :alt="room.name"
          class="h-[360px] w-full rounded-2xl object-cover shadow-2xl shadow-black/40"
        />
        <div class="grid grid-cols-4 gap-3">
          <button
            v-for="image in room.images"
            :key="image.id"
            class="overflow-hidden rounded-xl border border-white/10"
            @click="selectedImage = image.image_url"
          >
            <img :src="image.image_url" :alt="room.name" class="h-20 w-full object-cover" />
          </button>
        </div>
      </div>

      <div class="space-y-6">
        <h1 class="font-display text-4xl text-white">{{ room.name }}</h1>
        <p class="text-slate-300">{{ room.description }}</p>
        <div class="flex items-center gap-4">
          <span class="text-3xl font-semibold text-brand-300">₦{{ Number(room.price_per_night).toLocaleString() }}</span>
          <span class="text-slate-400">per night</span>
        </div>
        <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p class="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Amenities</p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="amenity in room.amenities || []"
              :key="amenity"
              class="rounded-full border border-white/20 px-3 py-1 text-xs text-slate-200"
            >
              {{ amenity }}
            </span>
          </div>
        </div>
        <BaseButton @click="router.push({ name: 'booking', params: { roomId: room.id } })">
          Book this room
        </BaseButton>
      </div>
    </div>
  </div>
</template>
