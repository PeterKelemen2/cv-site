import { ref, watch } from 'vue'

// Eases a number from 0 (or current) up to `target` once `active` becomes true.
// Returns a reactive `display` value rounded to `decimals`.
export function useAnimatedNumber(target, active, options = {}) {
  const { duration = 1100, decimals = 0 } = options

  const display = ref(0)

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3)
  }

  function run() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const end = typeof target === 'function' ? target() : target

    if (reduceMotion) {
      display.value = end
      return
    }

    const start = performance.now()
    function frame(now) {
      const progress = Math.min((now - start) / duration, 1)
      const eased = easeOutCubic(progress)
      const value = end * eased
      display.value = decimals ? Number(value.toFixed(decimals)) : Math.round(value)
      if (progress < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }

  watch(
    () => (typeof active === 'function' ? active() : active.value),
    (isActive) => {
      if (isActive) run()
    },
    { immediate: true },
  )

  return { display }
}
