<script setup>
defineProps({
  label: { type: String, default: "" },
  eyebrow: { type: String, default: "" },
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
  description: { type: String, default: "" },
});
</script>

<template>
  <div class="max-w-3xl space-y-3">
    <p v-if="eyebrow || label" class="text-xs uppercase tracking-[0.35em] text-amber-300">
      {{ eyebrow || label }}
    </p>
    <h2 class="text-3xl font-semibold leading-tight text-white md:text-4xl">{{ title }}</h2>
    <p v-if="subtitle || description" class="text-neutral-300">{{ subtitle || description }}</p>
  </div>
</template>
