<template>
  <div class="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
    <h1 class="font-display text-3xl text-white">Admin Login</h1>
    <p class="mt-2 text-sm text-slate-300">Sign in to manage bookings and rooms.</p>

    <form class="mt-8 space-y-4" @submit.prevent="submit">
      <div>
        <label class="mb-1 block text-sm text-slate-300">Email</label>
        <input
          v-model="form.email"
          type="email"
          class="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-brand-400 focus:outline-none"
          required
        />
      </div>
      <div>
        <label class="mb-1 block text-sm text-slate-300">Password</label>
        <input
          v-model="form.password"
          type="password"
          class="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-brand-400 focus:outline-none"
          required
        />
      </div>
      <button
        class="w-full rounded-xl bg-brand-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-105"
        :disabled="loading"
      >
        {{ loading ? "Signing in..." : "Sign In" }}
      </button>
      <p v-if="error" class="text-sm text-rose-400">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/authStore";

const router = useRouter();
const authStore = useAuthStore();

const form = reactive({
  email: "",
  password: "",
});

const loading = ref(false);
const error = ref("");

const submit = async () => {
  try {
    loading.value = true;
    error.value = "";
    await authStore.login(form);
    router.push("/admin");
  } catch (err) {
    error.value = err.response?.data?.message || "Login failed";
  } finally {
    loading.value = false;
  }
};
</script>
