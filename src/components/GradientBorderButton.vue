<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

defineProps({
  label: {
    type: String,
    default: "Let's connect",
  },
})

const borderEl = ref(null)

function updateAngle() {
  if (!borderEl.value) return
  const w = borderEl.value.offsetWidth
  const h = borderEl.value.offsetHeight
  // Angle (clockwise from top) to the top-left corner from the element center
  const deg = (Math.atan2(-w / 2, h / 2) * (180 / Math.PI) + 360) % 360
  borderEl.value.style.setProperty('--base-angle', `${deg}deg`)
}

let observer

onMounted(() => {
  updateAngle()
  observer = new ResizeObserver(updateAngle)
  observer.observe(borderEl.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div ref="borderEl" class="connect-border inline-block p-px rounded-lg">
    <button
      class="relative z-10 px-3 py-2 rounded-lg bg-gray-900 text-gray-200 flex items-center gap-2"
    >
      <slot />
      <span v-if="!$slots.default" class="hidden md:inline">{{ label }}</span>
    </button>
  </div>
</template>

<style scoped>
@property --gradient-angle {
  syntax: '<angle>';
  initial-value: 315deg;
  inherits: false;
}

.connect-border {
  --gradient-angle: var(--base-angle, 315deg);
  position: relative;
  background: conic-gradient(
    from var(--gradient-angle),
    #f3e8ff 0deg,
    #dd7ef0 10deg,
    #a855f7 135deg,
    #3b82f6 180deg,
    #3b82f6 270deg,
    #3b82f6 300deg,
    #a855f7 335deg,
    #dd7ef0 350deg,
    #f3e8ff 360deg
  );
  box-shadow:
    -2px -2px 4px rgba(233, 213, 255, 0.2),
    0px -2px 4px rgba(192, 132, 252, 0.2),
    2px 2px 4px rgba(37, 99, 235, 0.2),
    -2px 2px 4px rgba(147, 51, 234, 0.2);
  transition:
    --gradient-angle 0.3s ease,
    box-shadow 0.3s ease;
}

.connect-border::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: conic-gradient(
    from 360deg,
    #e9d5ff 0deg,
    #c084fc 60deg,
    #9333ea 100deg,
    #2563eb 120deg,
    #2563eb 230deg,
    #9333ea 270deg,
    #e9d5ff 360deg
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.connect-border:hover {
  --gradient-angle: 360deg;
  box-shadow:
    0 -2px 8px rgba(233, 213, 255, 0.18),
    2px -1px 8px rgba(192, 132, 252, 0.16),
    3px 0px 10px rgba(147, 51, 234, 0.16),
    2px 3px 10px rgba(37, 99, 235, 0.16),
    0px 4px 12px rgba(37, 99, 235, 0.14),
    -2px 3px 10px rgba(147, 51, 234, 0.16),
    -2px -1px 8px rgba(233, 213, 255, 0.14),
    0 0 10px rgba(147, 51, 234, 0.12);
}

.connect-border:hover::before {
  opacity: 1;
}
</style>
