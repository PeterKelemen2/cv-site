<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  label: { type: String, default: 'RPM' },
  max: { type: Number, default: 8000 },
  unit: { type: String, default: '' },
})

// Arc spans 240 degrees, from 150deg to 390deg (i.e. -30deg).
const START = 150
const SWEEP = 240
const RADIUS = 70
const CENTER = 90

const value = ref(0)
let frame
let stopped = false

function polar(angleDeg, r = RADIUS) {
  const a = (angleDeg * Math.PI) / 180
  return { x: CENTER + r * Math.cos(a), y: CENTER + r * Math.sin(a) }
}

function arcPath(fromFraction, toFraction, r = RADIUS) {
  const a0 = START + SWEEP * fromFraction
  const a1 = START + SWEEP * toFraction
  const p0 = polar(a0, r)
  const p1 = polar(a1, r)
  const large = a1 - a0 > 180 ? 1 : 0
  return `M ${p0.x} ${p0.y} A ${r} ${r} 0 ${large} 1 ${p1.x} ${p1.y}`
}

const trackPath = computed(() => arcPath(0, 1))
const valueFraction = computed(() => value.value / props.max)
const valuePath = computed(() => arcPath(0, Math.max(valueFraction.value, 0.0001)))

const needle = computed(() => {
  const angle = START + SWEEP * valueFraction.value
  return polar(angle, RADIUS - 8)
})

const displayValue = computed(() => Math.round(value.value))

// Smooth, looping idle sweep so the gauge always feels "alive".
onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) {
    value.value = props.max * 0.55
    return
  }
  const start = performance.now()
  function loop(now) {
    if (stopped) return
    const t = (now - start) / 1000
    // Blend two sines for a more organic rev pattern, clamp to [0.08, 0.92].
    const base = 0.5 + 0.34 * Math.sin(t * 0.9) + 0.12 * Math.sin(t * 2.7 + 1)
    value.value = Math.min(Math.max(base, 0.06), 0.95) * props.max
    frame = requestAnimationFrame(loop)
  }
  frame = requestAnimationFrame(loop)
})

onBeforeUnmount(() => {
  stopped = true
  cancelAnimationFrame(frame)
})
</script>

<template>
  <div class="flex flex-col items-center">
    <svg viewBox="0 0 180 150" class="w-full max-w-55">
      <defs>
        <linearGradient id="gauge-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#3b82f6" />
          <stop offset="60%" stop-color="#a855f7" />
          <stop offset="100%" stop-color="#ec4899" />
        </linearGradient>
      </defs>
      <path :d="trackPath" fill="none" stroke="#1f2937" stroke-width="10" stroke-linecap="round" />
      <path
        :d="valuePath"
        fill="none"
        stroke="url(#gauge-grad)"
        stroke-width="10"
        stroke-linecap="round"
      />
      <line
        :x1="CENTER"
        :y1="CENTER"
        :x2="needle.x"
        :y2="needle.y"
        stroke="#e5e7eb"
        stroke-width="3"
        stroke-linecap="round"
      />
      <circle :cx="CENTER" :cy="CENTER" r="6" fill="#e5e7eb" />
      <text
        :x="CENTER"
        y="128"
        text-anchor="middle"
        class="fill-gray-100 font-mono"
        font-size="22"
        font-weight="700"
      >
        {{ displayValue }}
      </text>
      <text
        :x="CENTER"
        y="144"
        text-anchor="middle"
        class="fill-gray-500 font-mono"
        font-size="9"
        letter-spacing="1"
      >
        {{ label }}{{ unit ? ' · ' + unit : '' }}
      </text>
    </svg>
  </div>
</template>
