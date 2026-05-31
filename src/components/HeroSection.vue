<script setup>
import { useTypewriter } from '@/composables/useTypewriter'
import { useScrollReveal } from '@/composables/useScrollReveal'
import GradientBorderButton from '@/components/GradientBorderButton.vue'
import MiniGauge from '@/components/MiniGauge.vue'
import { Mail, MapPin } from 'lucide-vue-next'

const { text } = useTypewriter([
  'full-stack applications',
  'real-time dashboards',
  'secure backend systems',
  'clean Vue interfaces',
  'low-level device drivers',
])

const { revealEl, revealed } = useScrollReveal({ threshold: 0 })

function openEmail() {
  window.location.href = 'mailto:peter.kelemen456@gmail.com'
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section
    id="home"
    ref="revealEl"
    class="reveal flex flex-col md:flex-row items-center gap-10"
    :class="{ 'reveal-in': revealed }"
  >
    <div class="flex flex-col gap-5 md:flex-1">
      <div
        class="inline-flex w-fit items-center gap-2 rounded-full border border-gray-700/70 bg-gray-900/60 px-3 py-1 backdrop-blur-sm"
      >
        <span class="relative flex size-2">
          <span
            class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"
          />
          <span class="relative inline-flex size-2 rounded-full bg-emerald-500" />
        </span>
        <span class="font-mono text-xs text-gray-300">available for work</span>
      </div>

      <h1 class="text-4xl md:text-5xl font-bold leading-tight">
        Hi, I'm
        <span
          class="bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
          >Péter Kelemen</span
        >
      </h1>

      <p class="text-xl text-gray-300 font-mono h-7">
        I build
        <span class="text-gray-100">{{ text }}</span
        ><span class="caret">▍</span>
      </p>

      <p class="text-gray-400 max-w-xl">
        A software developer who enjoys building full-stack applications end to end — from low-level
        device communication and background services to clean, real-time web interfaces. I work
        across .NET, Python, and Vue, and care about secure, maintainable systems that ship in
        production.
      </p>

      <div class="flex items-center gap-2 text-sm text-gray-500">
        <MapPin class="size-4" />
        <span>Available remotely</span>
      </div>

      <div class="flex flex-wrap items-center gap-3 pt-1">
        <GradientBorderButton @click="openEmail">
          <Mail class="size-5" />
          <span>Get in touch</span>
        </GradientBorderButton>
        <a
          href="https://github.com/PeterKelemen2"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2.5 text-sm text-gray-200 transition-colors hover:border-gray-500 hover:bg-gray-800"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
            alt="GitHub"
            class="size-5"
            style="filter: invert(1) brightness(2)"
          />
          <span>GitHub</span>
        </a>
        <button
          class="text-sm text-gray-400 underline-offset-4 hover:text-gray-200 hover:underline"
          @click="scrollTo('projects')"
        >
          View projects ↓
        </button>
      </div>
    </div>

    <div class="w-full md:w-80 shrink-0">
      <div
        class="rounded-xl border border-gray-700/60 bg-gray-950/50 p-5 backdrop-blur-sm flex flex-col gap-3"
      >
        <div class="flex items-center justify-between">
          <span class="mono-kicker text-[0.625rem] text-gray-500">// telemetry</span>
          <span class="font-mono text-[0.625rem] text-emerald-500">● live</span>
        </div>
        <MiniGauge label="RPM" :max="8000" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.caret {
  animation: blink 1.1s step-end infinite;
  color: #a855f7;
}
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .caret {
    animation: none;
  }
}
</style>
