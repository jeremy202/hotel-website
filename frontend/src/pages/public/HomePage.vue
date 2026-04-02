<template>
  <div class="space-y-20 pb-16">
    <HeroSection />

    <section id="featured-rooms" class="container mx-auto px-4">
      <SectionTitle
        eyebrow="Featured Suites"
        title="Curated Comfort with a Modern Nigerian Luxury Feel"
        description="From executive retreats to family-friendly spaces, discover rooms designed for premium rest and elevated experiences."
      />
      <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <RoomCard
          v-for="room in featuredRooms"
          :key="room.id"
          :room="room"
        />
      </div>
    </section>

    <section class="container mx-auto grid gap-8 px-4 lg:grid-cols-2">
      <div class="glass-panel rounded-3xl p-8">
        <h3 class="text-2xl font-semibold text-slate-100">Guest Stories</h3>
        <p class="mt-4 text-slate-300">
          “Grand Comodores was exceptional from check-in to check-out. The ambience felt world-class, and the team was deeply attentive.”
        </p>
        <p class="mt-3 text-sm text-brand-300">— Chioma A., Lagos</p>
      </div>
      <div class="glass-panel rounded-3xl p-8">
        <h3 class="text-2xl font-semibold text-slate-100">Book Direct Perks</h3>
        <ul class="mt-4 space-y-2 text-slate-300">
          <li>• Complimentary welcome drink</li>
          <li>• Flexible booking support</li>
          <li>• Priority room upgrade (subject to availability)</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import HeroSection from "../../components/public/HeroSection.vue";
import RoomCard from "../../components/public/RoomCard.vue";
import SectionTitle from "../../components/common/SectionTitle.vue";
import { fetchRooms } from "../../services/publicApi";

const featuredRooms = ref([]);

onMounted(async () => {
  const rooms = await fetchRooms({ available: true });
  featuredRooms.value = rooms.slice(0, 3);
});
</script>
