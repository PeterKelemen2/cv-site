<script setup>
import { CodeXml, MailSearch } from 'lucide-vue-next'
import GradientBorderButton from './GradientBorderButton.vue'

const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
]

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function openEmail() {
  window.location.href = 'mailto:peter.kelemen456@gmail.com'
}
</script>

<template>
  <nav class="sticky top-0 z-50 shadow-md bg-black/95">
    <svg width="0" height="0" class="absolute">
      <defs>
        <linearGradient
          id="icon-gradient"
          x1="0"
          y1="0"
          x2="20"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stop-color="#3b82f6" />
          <stop offset="100%" stop-color="#a855f7" />
        </linearGradient>
      </defs>
    </svg>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-center h-16 relative">
        <div class="absolute left-0 top-1/2 -translate-y-1/2 flex items-center">
          <CodeXml class="size-10 icon-gradient" />
        </div>
        <div class="flex items-center space-x-1">
          <button
            v-for="link in navLinks"
            :key="link.id"
            type="button"
            class="nav-link relative px-3 py-2 rounded-md font-medium text-gray-400 transition-colors hover:text-white"
            @click="scrollToSection(link.id)"
          >
            {{ link.label }}
          </button>
        </div>
        <div class="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center">
          <GradientBorderButton @click="openEmail">
            <MailSearch class="size-5 md:hidden" />
            <span class="hidden md:inline">Let's connect</span>
          </GradientBorderButton>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.nav-link:hover::after {
  opacity: 1;

  background: linear-gradient(135deg, rgb(79, 135, 255) 0%, rgba(139, 92, 246, 1) 100%);

  box-shadow:
    -2px -2px 6px rgba(79, 135, 255, 0.45),
    2px 2px 8px rgba(139, 92, 246, 0.45),
    0 0 10px rgba(139, 92, 246, 0.25);
}

:deep(.icon-gradient) {
  stroke: url(#icon-gradient);
  filter: drop-shadow(0px 0px 6px rgba(183, 154, 250, 0.8));
}
</style>
