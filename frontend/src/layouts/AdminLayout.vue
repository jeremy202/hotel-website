<script setup>
import { computed } from "vue";
import { RouterLink, RouterView, useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";

const auth = useAuthStore();
const router = useRouter();

const navItems = computed(() => [
  { name: "Dashboard", path: "/admin" },
  { name: "Rooms", path: "/admin/rooms" },
  { name: "Bookings", path: "/admin/bookings" },
  { name: "Payments", path: "/admin/payments" },
]);

const logout = () => {
  auth.clearSession();
  router.push("/");
};
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-slate-100">
    <aside
      class="fixed inset-y-0 left-0 hidden w-64 border-r border-white/10 bg-slate-900/80 backdrop-blur-xl lg:block"
    >
      <div class="border-b border-white/10 p-6">
        <p class="font-serif text-2xl">Grand Comodores</p>
        <p class="text-sm text-slate-400">Admin Console</p>
      </div>
      <nav class="space-y-2 p-4">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="block rounded-lg px-4 py-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
          active-class="bg-brand-700/70 text-white"
        >
          {{ item.name }}
        </RouterLink>
      </nav>
      <div class="absolute bottom-0 w-full border-t border-white/10 p-4">
        <button
          class="w-full rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10"
          @click="logout"
        >
          Logout
        </button>
      </div>
    </aside>

    <main class="min-h-screen lg:pl-64">
      <header class="border-b border-white/10 bg-slate-900/60 px-6 py-4 backdrop-blur-xl">
        <div class="mx-auto flex max-w-7xl items-center justify-between">
          <p class="font-serif text-2xl">Admin Dashboard</p>
          <p class="text-sm text-slate-300">{{ auth.user?.fullName || "Administrator" }}</p>
        </div>
      </header>
      <section class="mx-auto max-w-7xl px-6 py-8">
        <RouterView />
      </section>
    </main>
  </div>
</template>
