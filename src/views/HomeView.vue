<script setup>
import GradientBorderCard from '@/components/GradientBorderCard.vue'
</script>

<template>
  <div class="bg-gray-900 min-h-screen flex items-center justify-center gap-2">
    <GradientBorderCard :border-width="2" :colors="['#3672a4', '#ffd248']">
      <div class="p-6">Python</div>
    </GradientBorderCard>
    <GradientBorderCard :border-width="2" :colors="['#ea2d2e', '#0074bd']">
      <div class="p-6">Java</div>
    </GradientBorderCard>
    <GradientBorderCard :border-width="2" :colors="['#a37add', '#a37add', '#360092']">
      <div class="p-6">C#</div>
    </GradientBorderCard>
    <GradientBorderCard :border-width="2" :colors="['#e44d26', '#f16529', '#f7a541']">
      <div class="p-6">HTML</div>
    </GradientBorderCard>
  </div>
</template>

<style scoped></style>
