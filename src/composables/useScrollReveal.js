import { ref, onMounted, onBeforeUnmount } from 'vue'

// Toggles `revealed` to true the first time the element scrolls into view.
// Respects prefers-reduced-motion by revealing immediately.
export function useScrollReveal(options = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -10% 0px', delay = 0 } = options

  const revealEl = ref(null)
  const revealed = ref(false)

  let observer

  onMounted(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealed.value = true
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (delay) {
              setTimeout(() => (revealed.value = true), delay)
            } else {
              revealed.value = true
            }
            observer.disconnect()
          }
        }
      },
      { threshold, rootMargin },
    )

    if (revealEl.value) observer.observe(revealEl.value)
  })

  onBeforeUnmount(() => observer?.disconnect())

  return { revealEl, revealed }
}
