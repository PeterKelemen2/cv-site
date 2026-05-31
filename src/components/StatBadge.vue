<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: String, required: true },
})
</script>

<template>
  <div
    class="flex flex-col gap-0.5 rounded-md border border-gray-700/70 bg-gray-900/60 px-3 py-2 backdrop-blur-sm"
  >
    <span class="mono-kicker text-[0.625rem] text-gray-500">{{ label }}</span>
    <span
      class="font-mono text-sm font-semibold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
      >{{ value }}</span
    >
  </div>
</template>
