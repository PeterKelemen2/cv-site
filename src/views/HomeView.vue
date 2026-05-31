<script setup>
import GradientBorderCard from '@/components/GradientBorderCard.vue'
import { projects } from '@/data/projects'

const smallSize = 'h-40 max-h-40 md:h-40 md:max-h-40'
</script>

<template>
  <div class="bg-gray-900 min-h-full flex items-center justify-center p-4 md:p-8">
    <div class="flex flex-col md:flex-row gap-6 md:gap-8 w-full max-w-7xl items-start">
      <div class="flex flex-col gap-4 md:flex-1 md:sticky md:top-8">
        <div>
          <span class="text-3xl"
            >Hi, I'm
            <span
              class="bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-bold"
              >Péter Kelemen</span
            ></span
          >
        </div>
        <div>
          <span class="text-gray-300"
            >I'm a software developer who enjoys building full-stack applications end to end — from
            low-level device communication and background services to clean, real-time web
            interfaces. I work across .NET, Python, and Vue, and I care about secure, maintainable
            systems that ship in production. Below are a couple of projects that show how I bring
            those pieces together.</span
          >
        </div>
      </div>
      <div class="flex flex-col gap-8 w-full max-w-4xl">
        <div v-for="project in projects" :key="project.name" class="flex flex-col gap-2">
          <GradientBorderCard :border-width="2" :colors="project.cardColors" class="w-full">
            <div class="h-full p-6 flex flex-col gap-4">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h2 class="text-2xl font-bold text-gray-100">{{ project.name }}</h2>
                  <p class="text-sm text-gray-400">{{ project.tagline }}</p>
                </div>
                <a
                  :href="project.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center shrink-0 rounded-md border border-gray-700 px-3 py-1.5 text-sm text-gray-200 transition-colors hover:border-gray-500 hover:bg-gray-800"
                  ><img
                    src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
                    alt="GitHub"
                    class="w-4 h-4 mr-2"
                    style="filter: invert(1) brightness(2)"
                  />
                  GitHub →</a
                >
              </div>
              <p class="text-gray-300">{{ project.description }}</p>
              <ul class="flex flex-col gap-1.5 text-sm text-gray-300">
                <li
                  v-for="feature in project.features"
                  :key="feature"
                  class="flex items-start gap-2"
                >
                  <span
                    class="mt-2 size-1.5 shrink-0 rounded-full bg-linear-to-r from-blue-500 to-purple-500"
                  />
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>
          </GradientBorderCard>
          <div class="flex gap-2">
            <GradientBorderCard
              v-for="tech in project.technologies"
              :key="tech.name"
              :border-width="2"
              :colors="tech.colors"
              class="flex-1"
              :class="smallSize"
            >
              <div class="h-full p-6 flex items-center justify-center text-gray-200">
                {{ tech.name }}
              </div>
            </GradientBorderCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
