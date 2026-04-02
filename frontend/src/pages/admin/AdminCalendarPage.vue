<script setup>
import { onMounted, ref } from "vue";
import { getAdminCalendar } from "../../services/adminApi";
import SectionTitle from "../../components/common/SectionTitle.vue";

const loading = ref(false);
const items = ref([]);

async function loadCalendar() {
  loading.value = true;
  try {
    items.value = await getAdminCalendar();
  } finally {
    loading.value = false;
  }
}

onMounted(loadCalendar);
</script>

<template>
  <div class="space-y-6">
    <SectionTitle
      title="Availability Calendar"
      subtitle="Current pending and confirmed room reservations."
    />

    <div class="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
      <table class="min-w-full divide-y divide-slate-200 text-sm">
        <thead class="bg-slate-50">
          <tr>
            <th class="px-4 py-3 text-left font-semibold text-slate-600">Room</th>
            <th class="px-4 py-3 text-left font-semibold text-slate-600">Check-in</th>
            <th class="px-4 py-3 text-left font-semibold text-slate-600">Check-out</th>
            <th class="px-4 py-3 text-left font-semibold text-slate-600">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-if="loading">
            <td class="px-4 py-4 text-slate-500" colspan="4">Loading calendar...</td>
          </tr>
          <tr v-for="item in items" :key="`${item.room_id}-${item.check_in}-${item.check_out}`">
            <td class="px-4 py-3">{{ item.room_name }}</td>
            <td class="px-4 py-3">{{ item.check_in }}</td>
            <td class="px-4 py-3">{{ item.check_out }}</td>
            <td class="px-4 py-3 capitalize">{{ item.status }}</td>
          </tr>
          <tr v-if="!loading && !items.length">
            <td class="px-4 py-4 text-slate-500" colspan="4">No calendar items found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
