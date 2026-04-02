<script setup>
import { onMounted, reactive, ref } from "vue";
import { getAdminTransactions } from "../../services/adminApi";

const loading = ref(false);
const transactions = ref([]);
const filters = reactive({
  status: "",
  from: "",
  to: "",
});

async function loadTransactions() {
  loading.value = true;
  try {
    transactions.value = await getAdminTransactions({
      status: filters.status || undefined,
      from: filters.from || undefined,
      to: filters.to || undefined,
    });
  } finally {
    loading.value = false;
  }
}

onMounted(loadTransactions);
</script>

<template>
  <section class="space-y-6">
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold text-slate-100">Transactions</h1>
      <p class="text-sm text-slate-400">{{ transactions.length }} records</p>
    </header>

    <div class="grid gap-3 md:grid-cols-3">
      <select
        v-model="filters.status"
        class="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 outline-none focus:border-amber-400"
      >
        <option value="">All statuses</option>
        <option value="initialized">initialized</option>
        <option value="success">success</option>
        <option value="failed">failed</option>
      </select>
      <input
        v-model="filters.from"
        type="date"
        class="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 outline-none focus:border-amber-400"
      >
      <input
        v-model="filters.to"
        type="date"
        class="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 outline-none focus:border-amber-400"
      >
    </div>

    <button
      class="rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
      @click="loadTransactions"
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
            <th class="px-4 py-3">Amount</th>
            <th class="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/10 bg-slate-950/60">
          <tr v-if="loading">
            <td class="px-4 py-4 text-slate-500" colspan="5">Loading...</td>
          </tr>
          <tr v-for="tx in transactions" :key="tx.id" class="text-slate-200">
            <td class="px-4 py-3 font-mono text-xs">{{ tx.paystack_reference }}</td>
            <td class="px-4 py-3">{{ tx.guest_name || "-" }}</td>
            <td class="px-4 py-3">{{ tx.room_name || "-" }}</td>
            <td class="px-4 py-3">₦{{ Number(tx.amount || 0).toLocaleString() }}</td>
            <td class="px-4 py-3 capitalize">{{ tx.status }}</td>
          </tr>
          <tr v-if="!loading && !transactions.length">
            <td class="px-4 py-4 text-slate-500" colspan="5">No transactions found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
