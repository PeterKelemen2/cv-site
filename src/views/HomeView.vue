<script setup>
import GradientBorderCard from '@/components/GradientBorderCard.vue'
import { projects } from '@/data/projects'
import { reactive } from 'vue'
import pythonIcon from '@/assets/tech/python.svg'
import vueIcon from '@/assets/tech/vue.svg'
import dockerIcon from '@/assets/tech/docker.svg'
import dotnetIcon from '@/assets/tech/dotnet.svg'

const techIcons = {
  Python: pythonIcon,
  Vue: vueIcon,
  Docker: dockerIcon,
  '.NET': dotnetIcon,
  'ASP.NET': dotnetIcon,
}

const smallSize = 'h-40 max-h-40 md:h-40 md:max-h-40'

const selectedTechs = reactive(Object.fromEntries(projects.map((p) => [p.name, null])))
const slideDirections = reactive(Object.fromEntries(projects.map((p) => [p.name, 'right'])))

function selectTech(projectName, techName) {
  if (selectedTechs[projectName] === techName) {
    selectedTechs[projectName] = null
    return
  }
  const project = projects.find((p) => p.name === projectName)
  const oldIdx = project.technologies.findIndex((t) => t.name === selectedTechs[projectName])
  const newIdx = project.technologies.findIndex((t) => t.name === techName)
  slideDirections[projectName] = newIdx > oldIdx ? 'right' : 'left'
  selectedTechs[projectName] = techName
}

function getSelectedTech(project) {
  return project.technologies.find((t) => t.name === selectedTechs[project.name]) ?? null
}
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
            >I'm a software developer who enjoys building full-stack applications end to end - from
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
              <Transition name="panel">
                <div v-if="getSelectedTech(project)">
                  <div class="border-t border-gray-700 pt-4 overflow-hidden">
                    <Transition :name="'slide-' + slideDirections[project.name]" mode="out-in">
                      <div :key="selectedTechs[project.name]" class="flex flex-col gap-1.5">
                        <h3
                          class="text-sm font-semibold"
                          :style="{
                            background: `linear-gradient(to right, ${getSelectedTech(project).colors[0]}, ${getSelectedTech(project).colors[getSelectedTech(project).colors.length - 1]})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }"
                        >
                          {{ getSelectedTech(project).name }}
                        </h3>
                        <p class="text-sm text-gray-300 leading-relaxed">
                          {{ getSelectedTech(project).techDescription }}
                        </p>
                      </div>
                    </Transition>
                  </div>
                </div>
              </Transition>
            </div>
          </GradientBorderCard>
          <div class="flex gap-2">
            <GradientBorderCard
              v-for="tech in project.technologies"
              :key="tech.name"
              :border-width="selectedTechs[project.name] === tech.name ? 2 : 2"
              :colors="tech.colors"
              class="flex-1 cursor-pointer select-none transition-opacity"
              :class="[
                smallSize,
                selectedTechs[project.name] !== null && selectedTechs[project.name] !== tech.name
                  ? 'opacity-40'
                  : 'opacity-100',
              ]"
              @click="selectTech(project.name, tech.name)"
            >
              <div class="relative h-full overflow-hidden group">
                <img
                  v-if="techIcons[tech.name]"
                  :src="techIcons[tech.name]"
                  alt=""
                  aria-hidden="true"
                  class="absolute pointer-events-none select-none w-auto transition-opacity duration-300"
                  :class="
                    selectedTechs[project.name] === tech.name
                      ? 'opacity-100'
                      : 'opacity-30 group-hover:opacity-100'
                  "
                  style="top: 50%; left: 38%; transform: translate(-50%, -50%); height: 130%"
                />
                <span
                  class="absolute bottom-4 left-4 text-sm font-semibold tracking-wide text-gray-200 z-10"
                  >{{ tech.name }}</span
                >
              </div>
            </GradientBorderCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Panel appear / disappear with height animation */
.panel-enter-active,
.panel-leave-active {
  transition:
    max-height 0.3s ease,
    opacity 0.3s ease;
  overflow: hidden;
}
.panel-enter-from,
.panel-leave-to {
  max-height: 0;
  opacity: 0;
}
.panel-enter-to,
.panel-leave-from {
  max-height: 20rem;
  opacity: 1;
}

/* Slide right — new chip is to the right of the previous one */
.slide-right-enter-active,
.slide-right-leave-active {
  transition:
    transform 0.22s ease,
    opacity 0.22s ease;
}
.slide-right-enter-from {
  transform: translateX(32px);
  opacity: 0;
}
.slide-right-leave-to {
  transform: translateX(-32px);
  opacity: 0;
}

/* Slide left — new chip is to the left of the previous one */
.slide-left-enter-active,
.slide-left-leave-active {
  transition:
    transform 0.22s ease,
    opacity 0.22s ease;
}
.slide-left-enter-from {
  transform: translateX(-32px);
  opacity: 0;
}
.slide-left-leave-to {
  transform: translateX(32px);
  opacity: 0;
}
</style>
