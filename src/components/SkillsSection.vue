<script setup>
import GradientBorderCard from '@/components/GradientBorderCard.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { revealEl, revealed } = useScrollReveal()

const groups = [
  {
    title: 'Languages',
    colors: ['#3b82f6', '#a855f7'],
    items: ['C# / .NET', 'Python', 'Java', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    title: 'Backend',
    colors: ['#512bd4', '#1ba1e2'],
    items: [
      'ASP.NET',
      'FastAPI',
      'PaperMC / Bukkit',
      'SQLAlchemy',
      'REST',
      'Server-Sent Events',
      'JWT / OAuth 2.0',
    ],
  },
  {
    title: 'Frontend',
    colors: ['#41b883', '#35495e'],
    items: ['Vue 3', 'Vite', 'Tailwind CSS', 'Pinia', 'SVG / Canvas'],
  },
  {
    title: 'Infrastructure',
    colors: ['#1d63ed', '#2496ed'],
    items: ['Docker', 'nginx', 'supervisord', 'Gradle', 'SQLite', 'SFTP / SSH'],
  },
]
</script>

<template>
  <section id="skills" ref="revealEl" class="reveal" :class="{ 'reveal-in': revealed }">
    <SectionHeading kicker="stack" title="Skills & Tooling" />
    <div class="grid gap-4 sm:grid-cols-2">
      <GradientBorderCard
        v-for="group in groups"
        :key="group.title"
        :border-width="2"
        :colors="group.colors"
        class="w-full"
      >
        <div class="h-full p-5 flex flex-col gap-3">
          <h3 class="mono-kicker text-xs text-gray-400">{{ group.title }}</h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="item in group.items"
              :key="item"
              class="rounded-md border border-gray-700/70 bg-gray-800/50 px-2.5 py-1 text-sm text-gray-200"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </GradientBorderCard>
    </div>
  </section>
</template>
