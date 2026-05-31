<script setup>
// Ambient, slowly drifting gradient-mesh background.
// Purely decorative; disabled under prefers-reduced-motion via CSS.
</script>

<template>
  <div class="ambient-bg" aria-hidden="true">
    <span class="blob blob-a" />
    <span class="blob blob-b" />
    <span class="blob blob-c" />
    <div class="grid-overlay" />
  </div>
</template>

<style scoped>
.ambient-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.blob {
  position: absolute;
  border-radius: 9999px;
  filter: blur(90px);
  opacity: 0.22;
  will-change: transform;
}

.blob-a {
  width: 38vmax;
  height: 38vmax;
  top: -10vmax;
  left: -8vmax;
  background: radial-gradient(circle at 30% 30%, #3b82f6, transparent 70%);
  animation: drift-a 26s ease-in-out infinite;
}

.blob-b {
  width: 32vmax;
  height: 32vmax;
  bottom: -10vmax;
  right: -6vmax;
  background: radial-gradient(circle at 60% 40%, #a855f7, transparent 70%);
  animation: drift-b 32s ease-in-out infinite;
}

.blob-c {
  width: 26vmax;
  height: 26vmax;
  top: 35%;
  left: 55%;
  background: radial-gradient(circle at 50% 50%, #ec4899, transparent 70%);
  opacity: 0.14;
  animation: drift-c 38s ease-in-out infinite;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgba(148, 163, 184, 0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(148, 163, 184, 0.06) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
}

@keyframes drift-a {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(6vmax, 4vmax) scale(1.1);
  }
}

@keyframes drift-b {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(-5vmax, -3vmax) scale(1.08);
  }
}

@keyframes drift-c {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(-4vmax, 5vmax) scale(1.12);
  }
}

@media (prefers-reduced-motion: reduce) {
  .blob {
    animation: none;
  }
}
</style>
