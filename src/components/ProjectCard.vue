<script setup>
import { ref, computed } from 'vue'
import GradientBorderCard from '@/components/GradientBorderCard.vue'
import StatBadge from '@/components/StatBadge.vue'
import MiniGauge from '@/components/MiniGauge.vue'
import DownloadProgress from '@/components/DownloadProgress.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import pythonIcon from '@/assets/tech/python.svg'
import vueIcon from '@/assets/tech/vue.svg'
import dockerIcon from '@/assets/tech/docker.svg'
import dotnetIcon from '@/assets/tech/dotnet.svg'
import javaIcon from '@/assets/tech/java.svg'
import minecraftIcon from '@/assets/tech/minecraft.svg'
import papermcIcon from '@/assets/tech/papermc.svg'

const props = defineProps({
  project: { type: Object, required: true },
})

const techIcons = {
  Python: pythonIcon,
  Vue: vueIcon,
  Docker: dockerIcon,
  '.NET': dotnetIcon,
  'ASP.NET': dotnetIcon,
  Java: javaIcon,
  Minecraft: minecraftIcon,
  PaperMC: papermcIcon,
}

const smallSize = 'h-40 max-h-40 md:h-40 md:max-h-40'

const { revealEl, revealed } = useScrollReveal()

const slug = computed(() => `~/projects/${props.project.name.toLowerCase()}`)

const selectedTech = ref(null)
const slideDirection = ref('right')

function selectTech(techName) {
  if (selectedTech.value === techName) {
    selectedTech.value = null
    return
  }
  const oldIdx = props.project.technologies.findIndex((t) => t.name === selectedTech.value)
  const newIdx = props.project.technologies.findIndex((t) => t.name === techName)
  slideDirection.value = newIdx > oldIdx ? 'right' : 'left'
  selectedTech.value = techName
}

function getSelectedTech() {
  return props.project.technologies.find((t) => t.name === selectedTech.value) ?? null
}
</script>

<template>
  <div ref="revealEl" class="reveal flex flex-col gap-2" :class="{ 'reveal-in': revealed }">
    <GradientBorderCard :border-width="2" :colors="project.cardColors" class="w-full">
      <div class="relative h-full p-6 flex flex-col gap-5 overflow-hidden">
        <!-- decorative corner glow -->
        <div
          class="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full blur-3xl opacity-20"
          :style="{
            background: `radial-gradient(circle, ${project.cardColors[0]}, transparent 70%)`,
          }"
        />

        <div class="relative flex items-start justify-between gap-4">
          <div class="flex flex-col gap-1.5">
            <span class="mono-kicker text-[0.625rem] text-gray-500">{{ slug }}</span>
            <h3 class="text-2xl font-bold leading-tight">
              <span
                :style="{
                  background: `linear-gradient(to right, ${project.cardColors[0]}, ${project.cardColors[project.cardColors.length - 1]})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }"
                >{{ project.name }}</span
              >
            </h3>
            <p class="text-sm text-gray-400">{{ project.tagline }}</p>
          </div>
          <a
            :href="project.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center shrink-0 rounded-md border border-gray-700 px-3 py-1.5 text-sm text-gray-200 transition-colors hover:border-gray-500 hover:bg-gray-800"
            ><img
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
              alt="GitHub"
              class="w-4 h-4 mr-2"
              style="filter: invert(1) brightness(2)"
            />
            <span>GitHub</span>
            <span class="ml-1 transition-transform group-hover:translate-x-0.5">→</span></a
          >
        </div>

        <!-- architecture as a terminal command line -->
        <div
          class="relative flex items-center gap-2 rounded-md border border-gray-800 bg-gray-950/60 px-3 py-2 font-mono text-xs"
        >
          <span class="text-emerald-500 select-none">$</span>
          <span class="text-gray-400">{{ project.architecture }}</span>
        </div>

        <div class="relative flex flex-col gap-5 md:flex-row md:gap-6">
          <div class="flex flex-col gap-4 md:flex-1">
            <p class="text-gray-300">{{ project.description }}</p>
            <div class="flex flex-col gap-2">
              <span class="mono-kicker text-[0.625rem] text-gray-500">// highlights</span>
              <ul class="flex flex-col gap-1.5 text-sm text-gray-300">
                <li
                  v-for="feature in project.features"
                  :key="feature"
                  class="flex items-start gap-2"
                >
                  <span
                    class="mt-0.5 font-mono text-xs bg-clip-text text-transparent"
                    :style="{
                      backgroundImage: `linear-gradient(to right, ${project.cardColors[0]}, ${project.cardColors[project.cardColors.length - 1]})`,
                    }"
                    >▹</span
                  >
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div
            v-if="project.widget"
            class="md:w-56 shrink-0 rounded-lg border border-gray-700/60 bg-gray-950/40 p-4 flex flex-col gap-2"
          >
            <span class="mono-kicker text-[0.625rem] text-gray-500">// live preview</span>
            <div class="flex-1 flex items-center justify-center">
              <MiniGauge v-if="project.widget === 'gauge'" label="RPM" :max="8000" />
              <DownloadProgress v-else-if="project.widget === 'progress'" />
            </div>
          </div>
        </div>

        <div v-if="project.stats" class="relative grid grid-cols-2 sm:grid-cols-4 gap-2">
          <StatBadge
            v-for="stat in project.stats"
            :key="stat.label"
            :label="stat.label"
            :value="stat.value"
          />
        </div>

        <Transition name="panel">
          <div v-if="getSelectedTech()" class="relative">
            <div class="border-t border-gray-700 pt-4 overflow-hidden">
              <Transition :name="'slide-' + slideDirection" mode="out-in">
                <div :key="selectedTech" class="flex gap-3">
                  <span
                    class="mt-1 w-1 shrink-0 self-stretch rounded-full"
                    :style="{
                      background: `linear-gradient(to bottom, ${getSelectedTech().colors[0]}, ${getSelectedTech().colors[getSelectedTech().colors.length - 1]})`,
                    }"
                  />
                  <div class="flex flex-col gap-1.5">
                    <div class="flex items-center gap-2">
                      <img
                        v-if="techIcons[getSelectedTech().name]"
                        :src="techIcons[getSelectedTech().name]"
                        alt=""
                        aria-hidden="true"
                        class="size-4 object-contain"
                      />
                      <h4
                        class="mono-kicker text-sm font-semibold"
                        :style="{
                          background: `linear-gradient(to right, ${getSelectedTech().colors[0]}, ${getSelectedTech().colors[getSelectedTech().colors.length - 1]})`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }"
                      >
                        {{ getSelectedTech().name }}
                      </h4>
                      <span class="font-mono text-[0.625rem] text-gray-600"
                        >// role in project</span
                      >
                    </div>
                    <p class="text-sm text-gray-300 leading-relaxed">
                      {{ getSelectedTech().techDescription }}
                    </p>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </Transition>
      </div>
    </GradientBorderCard>

    <div class="flex gap-2">
      <GradientBorderCard
        v-for="(tech, index) in project.technologies"
        :key="tech.name"
        :border-width="2"
        :colors="tech.colors"
        class="flex-1 cursor-pointer select-none transition-all duration-300"
        :class="[
          smallSize,
          selectedTech !== null && selectedTech !== tech.name
            ? 'opacity-40 hover:opacity-70'
            : 'opacity-100',
          selectedTech === tech.name ? '-translate-y-1' : '',
        ]"
        @click="selectTech(tech.name)"
      >
        <div class="relative h-full overflow-hidden group">
          <!-- color glow tint -->
          <div
            class="absolute inset-0 transition-opacity duration-300"
            :class="selectedTech === tech.name ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'"
            :style="{
              background: `radial-gradient(120% 90% at 30% 120%, ${tech.colors[0]}33, transparent 70%)`,
            }"
          />
          <img
            v-if="techIcons[tech.name]"
            :src="techIcons[tech.name]"
            alt=""
            aria-hidden="true"
            class="absolute pointer-events-none select-none w-auto transition-all duration-300"
            :class="
              selectedTech === tech.name
                ? 'opacity-100 scale-105'
                : 'opacity-30 group-hover:opacity-100 group-hover:scale-105'
            "
            style="top: 50%; left: 38%; transform: translate(-50%, -50%); height: 130%"
          />
          <!-- index marker -->
          <span class="absolute top-3 left-4 font-mono text-[0.625rem] text-gray-500 z-10"
            >0{{ index + 1 }}</span
          >
          <!-- active indicator -->
          <span
            class="absolute top-3 right-4 z-10 transition-opacity duration-300"
            :class="selectedTech === tech.name ? 'opacity-100' : 'opacity-0'"
          >
            <span class="relative flex size-2">
              <span
                class="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                :style="{ backgroundColor: tech.colors[0] }"
              />
              <span
                class="relative inline-flex size-2 rounded-full"
                :style="{ backgroundColor: tech.colors[0] }"
              />
            </span>
          </span>
          <!-- label -->
          <div class="absolute bottom-4 left-4 z-10 flex flex-col gap-1">
            <span class="text-sm font-semibold tracking-wide text-gray-100">{{ tech.name }}</span>
            <span
              class="h-0.5 rounded-full transition-all duration-300"
              :class="selectedTech === tech.name ? 'w-8' : 'w-4 group-hover:w-8'"
              :style="{
                background: `linear-gradient(to right, ${tech.colors[0]}, ${tech.colors[tech.colors.length - 1]})`,
              }"
            />
          </div>
        </div>
      </GradientBorderCard>
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
