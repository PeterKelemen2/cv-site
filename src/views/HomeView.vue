<script setup>
import AmbientBackground from '@/components/AmbientBackground.vue'
import HeroSection from '@/components/HeroSection.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import { projects } from '@/data/projects'
</script>

<template>
  <div class="relative bg-gray-900 min-h-full">
    <AmbientBackground />
    <div
      class="relative z-10 mx-auto w-full max-w-5xl px-4 md:px-8 py-12 md:py-20 flex flex-col gap-24"
    >
      <HeroSection />

      <section id="projects">
        <SectionHeading kicker="work" title="Selected Projects" />
        <div class="flex flex-col gap-12">
          <ProjectCard v-for="project in projects" :key="project.name" :project="project" />
        </div>
      </section>

      <SkillsSection />

      <ContactSection />
    </div>
  </div>
</template>
