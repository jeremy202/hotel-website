<template>
  <button
    :type="type"
    class="btn"
    :class="[
      variant === 'secondary' ? 'btn-secondary' : 'btn-primary',
      full ? 'w-full' : '',
      small ? 'px-4 py-2 text-sm' : '',
    ]"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: { type: String, default: "button" },
  variant: { type: String, default: "primary" },
  ghost: { type: Boolean, default: false },
  full: { type: Boolean, default: false },
  small: { type: Boolean, default: false },
});
</script>
