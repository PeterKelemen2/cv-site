<script setup>
defineProps({
  kicker: { type: String, default: '' },
  title: { type: String, required: true },
})
</script>

<template>
  <div class="flex flex-col gap-2 mb-8">
    <span v-if="kicker" class="mono-kicker text-xs text-blue-400/80">// {{ kicker }}</span>
    <h2 class="text-3xl md:text-4xl font-bold text-gray-100">
      {{ title }}
    </h2>
    <div class="h-px w-24 bg-linear-to-r from-blue-500 to-purple-500" />
  </div>
</template>
