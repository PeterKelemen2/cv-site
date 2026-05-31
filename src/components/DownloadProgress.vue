<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// Fake SSE download job that loops: queued -> downloading -> done, then resets.
const STAGES = ['queued', 'downloading', 'done']

const progress = ref(0)
const stage = ref('queued')
const speed = ref(0)

let frame
let stopped = false

const filename = 'lecture-04.webm'

const statusColor = computed(() => {
  if (stage.value === 'done') return 'text-emerald-400'
  if (stage.value === 'downloading') return 'text-blue-400'
  return 'text-gray-400'
})

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) {
    progress.value = 100
    stage.value = 'done'
    speed.value = 0
    return
  }

  let cycleStart = performance.now()
  const QUEUE_MS = 700
  const DOWNLOAD_MS = 4200
  const DONE_MS = 1400
  const TOTAL = QUEUE_MS + DOWNLOAD_MS + DONE_MS

  function loop(now) {
    if (stopped) return
    const t = (now - cycleStart) % TOTAL
    if ((now - cycleStart) >= TOTAL) cycleStart = now

    if (t < QUEUE_MS) {
      stage.value = 'queued'
      progress.value = 0
      speed.value = 0
    } else if (t < QUEUE_MS + DOWNLOAD_MS) {
      stage.value = 'downloading'
      const p = (t - QUEUE_MS) / DOWNLOAD_MS
      progress.value = Math.round(p * 100)
      speed.value = 3.2 + Math.sin(t / 180) * 1.4
    } else {
      stage.value = 'done'
      progress.value = 100
      speed.value = 0
    }
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
  <div class="font-mono text-xs w-full">
    <div class="flex items-center justify-between gap-2 mb-2">
      <span class="text-gray-300 truncate">{{ filename }}</span>
      <span :class="statusColor" class="shrink-0 uppercase tracking-wide">{{ stage }}</span>
    </div>
    <div class="h-2 w-full rounded-full bg-gray-800 overflow-hidden">
      <div
        class="h-full rounded-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 transition-[width] duration-150 ease-linear"
        :style="{ width: progress + '%' }"
      />
    </div>
    <div class="flex items-center justify-between mt-2 text-[0.625rem] text-gray-500">
      <span>{{ progress }}%</span>
      <span v-if="stage === 'downloading'">{{ speed.toFixed(1) }} MiB/s</span>
      <span v-else-if="stage === 'done'" class="text-emerald-500">complete</span>
      <span v-else>waiting…</span>
    </div>
  </div>
</template>
