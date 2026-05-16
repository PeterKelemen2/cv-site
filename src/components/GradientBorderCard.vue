<script setup>
import { computed } from 'vue'
import { useGradientBorderAngle } from '@/composables/useGradientBorderAngle'

const props = defineProps({
  borderWidth: {
    type: Number,
    default: 1,
  },
  colors: {
    type: Array,
    default: () => ['#f3e8ff', '#dd7ef0', '#a855f7', '#3b82f6'],
  },
  invert: {
    type: Boolean,
    default: false,
  },
})

if (props.invert) {
  props.colors.reverse()
}

const { borderEl } = useGradientBorderAngle()

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

// Pick a color at a fractional position (0–1) along the colors array
function colorAt(fraction) {
  const n = props.colors.length
  return props.colors[Math.round(fraction * (n - 1))]
}

const gradientStops = computed(() => {
  const n = props.colors.length
  const stops = props.colors.map((c, i) => `${c} ${(360 / n) * i}deg`)
  stops.push(`${props.colors[0]} 360deg`)
  return stops.join(', ')
})

const boxShadowBase = computed(() => {
  return [
    `-2px -2px 4px ${hexToRgba(colorAt(0), 0.2)}`,
    `0px -2px 4px ${hexToRgba(colorAt(1 / 3), 0.2)}`,
    `2px 2px 4px ${hexToRgba(colorAt(2 / 3), 0.2)}`,
    `-2px 2px 4px ${hexToRgba(colorAt(1), 0.2)}`,
  ].join(', ')
})

const boxShadowHover = computed(() => {
  return [
    `0 -2px 8px ${hexToRgba(colorAt(0), 0.18)}`,
    `2px -1px 8px ${hexToRgba(colorAt(1 / 3), 0.16)}`,
    `3px 0px 10px ${hexToRgba(colorAt(2 / 3), 0.16)}`,
    `2px 3px 10px ${hexToRgba(colorAt(1), 0.16)}`,
    `0px 4px 12px ${hexToRgba(colorAt(1), 0.14)}`,
    `-2px 3px 10px ${hexToRgba(colorAt(2 / 3), 0.16)}`,
    `-2px -1px 8px ${hexToRgba(colorAt(0), 0.14)}`,
    `0 0 10px ${hexToRgba(colorAt(1 / 2), 0.12)}`,
  ].join(', ')
})

const borderStyle = computed(() => ({
  '--gradient-stops': gradientStops.value,
  '--box-shadow-base': boxShadowBase.value,
  '--box-shadow-hover': boxShadowHover.value,
  padding: `${props.borderWidth}px`,
}))
</script>

<template>
  <div ref="borderEl" :style="borderStyle" class="gradient-border-card rounded-lg">
    <div class="relative z-10 h-full rounded-lg bg-gray-900">
      <slot />
    </div>
  </div>
</template>

<style scoped>
@property --gradient-angle {
  syntax: '<angle>';
  initial-value: 315deg;
  inherits: false;
}

.gradient-border-card {
  --gradient-angle: var(--base-angle, 315deg);
  position: relative;
  background: conic-gradient(from var(--gradient-angle), var(--gradient-stops));
  box-shadow: var(--box-shadow-base);
  transition:
    --gradient-angle 0.3s ease,
    box-shadow 0.3s ease;
}

.gradient-border-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: conic-gradient(from 360deg, var(--gradient-stops));
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.gradient-border-card:hover {
  --gradient-angle: 360deg;
  box-shadow: var(--box-shadow-hover);
}

.gradient-border-card:hover::before {
  opacity: 1;
}
</style>
