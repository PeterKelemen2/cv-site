import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useGradientBorderAngle() {
  const borderEl = ref(null)

  function updateAngle() {
    if (!borderEl.value) return
    const w = borderEl.value.offsetWidth
    const h = borderEl.value.offsetHeight
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

  return { borderEl }
}
