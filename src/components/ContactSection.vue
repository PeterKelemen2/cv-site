<script setup>
import GradientBorderCard from '@/components/GradientBorderCard.vue'
import GradientBorderButton from '@/components/GradientBorderButton.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { Mail } from 'lucide-vue-next'

const { revealEl, revealed } = useScrollReveal()

const email = 'peter.kelemen456@gmail.com'

function openEmail() {
  window.location.href = `mailto:${email}`
}
</script>

<template>
  <section id="contact" ref="revealEl" class="reveal" :class="{ 'reveal-in': revealed }">
    <SectionHeading kicker="contact" title="Let's build something" />
    <GradientBorderCard :border-width="2" :colors="['#3b82f6', '#a855f7', '#ec4899']" class="w-full">
      <div class="p-6 md:p-8 flex flex-col gap-6">
        <p class="text-gray-300 max-w-2xl">
          I'm always interested in full-stack work that spans low-level systems and polished web
          interfaces. If you have a project in mind or just want to talk shop, reach out.
        </p>
        <div class="flex flex-wrap items-center gap-3">
          <GradientBorderButton @click="openEmail">
            <Mail class="size-5" />
            <span>{{ email }}</span>
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
            <span>github.com/PeterKelemen2</span>
          </a>
        </div>
      </div>
    </GradientBorderCard>
    <p class="mt-6 text-center text-xs text-gray-600 font-mono">
      Built with Vue 3 · Vite · Tailwind CSS — no template, just gradients.
    </p>
  </section>
</template>
