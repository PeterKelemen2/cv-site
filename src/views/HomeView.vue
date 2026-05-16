<script setup>
import GradientBorderCard from '@/components/GradientBorderCard.vue'

const smallSize = 'h-40 max-h-40'
const bigSize = 'h-128 max-h-128'
</script>

<template>
  <div class="bg-gray-900 min-h-screen flex items-center justify-center p-8">
    <div class="flex flex-col gap-2 w-full max-w-5xl">
      <GradientBorderCard
        :border-width="2"
        :colors="['#3b82f6', '#a855f7', '#ec4899', '#f97316']"
        class="w-full"
        :class="bigSize"
      >
        <div class="h-full p-6" />
      </GradientBorderCard>
      <div class="flex gap-2">
        <GradientBorderCard
          :border-width="2"
          :colors="['#3672a4', '#ffd248']"
          class="flex-1"
          :class="smallSize"
        >
          <div class="h-full p-6 flex items-center justify-center text-gray-200">Python</div>
        </GradientBorderCard>
        <GradientBorderCard
          :border-width="2"
          :colors="['#ea2d2e', '#0074bd']"
          class="flex-1"
          :class="smallSize"
        >
          <div class="h-full p-6 flex items-center justify-center text-gray-200">Java</div>
        </GradientBorderCard>
        <GradientBorderCard
          :border-width="2"
          :colors="['#a37add', '#a37add', '#360092']"
          class="flex-1"
          :class="smallSize"
        >
          <div class="h-full p-6 flex items-center justify-center text-gray-200">C#</div>
        </GradientBorderCard>
        <GradientBorderCard
          :border-width="2"
          :colors="['#e44d26', '#f16529', '#f7a541']"
          class="flex-1"
          :class="smallSize"
        >
          <div class="h-full p-6 flex items-center justify-center text-gray-200">HTML</div>
        </GradientBorderCard>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
