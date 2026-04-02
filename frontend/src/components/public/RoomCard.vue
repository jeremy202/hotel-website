<script setup>
import BaseButton from "../common/BaseButton.vue";

defineProps({
  room: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <article
    class="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/70 hover:shadow-card"
  >
    <div class="relative h-52 overflow-hidden">
      <img
        :src="room.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'"
        :alt="room.name"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span class="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs text-brand-300">
        {{ room.room_type }}
      </span>
    </div>
    <div class="space-y-4 p-6">
      <div class="flex items-start justify-between gap-4">
        <h3 class="font-display text-xl text-white">{{ room.name }}</h3>
        <p class="text-sm font-semibold text-brand-300">₦{{ Number(room.price_per_night).toLocaleString() }}</p>
      </div>
      <p class="line-clamp-2 text-sm text-slate-300">{{ room.description }}</p>
      <RouterLink :to="`/rooms/${room.id}`">
        <BaseButton class="w-full">Explore room</BaseButton>
      </RouterLink>
    </div>
  </article>
</template>
