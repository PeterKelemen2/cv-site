import { ref, onMounted, onBeforeUnmount } from 'vue'

// Cycles through `phrases`, typing and erasing each one.
// Returns the live `text` plus a blinking-cursor flag.
export function useTypewriter(phrases, options = {}) {
  const {
    typeSpeed = 70,
    eraseSpeed = 40,
    holdTime = 1600,
    betweenTime = 400,
  } = options

  const text = ref('')
  const phraseIndex = ref(0)

  let timer
  let charIndex = 0
  let erasing = false
  let stopped = false

  function tick() {
    if (stopped) return
    const current = phrases[phraseIndex.value]

    if (!erasing) {
      charIndex++
      text.value = current.slice(0, charIndex)
      if (charIndex >= current.length) {
        erasing = true
        timer = setTimeout(tick, holdTime)
        return
      }
      timer = setTimeout(tick, typeSpeed)
    } else {
      charIndex--
      text.value = current.slice(0, charIndex)
      if (charIndex <= 0) {
        erasing = false
        phraseIndex.value = (phraseIndex.value + 1) % phrases.length
        timer = setTimeout(tick, betweenTime)
        return
      }
      timer = setTimeout(tick, eraseSpeed)
    }
  }

  onMounted(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      text.value = phrases[0]
      return
    }
    timer = setTimeout(tick, typeSpeed)
  })

  onBeforeUnmount(() => {
    stopped = true
    clearTimeout(timer)
  })

  return { text }
}
