<template>
  <div
    :class="['skeleton', ...customClasses]"
    :style="styles"
    :data-testid="`${testId}-skeleton`"
  />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  width: {
    type: [String, Number],
    default: '100%',
  },
  height: {
    type: [String, Number],
    default: '16px',
  },
  customClasses: {
    type: Array,
    default: () => [],
  },
  radius: {
    type: [String, Number],
    default: null,
  },
  testId: {
    type: String,
    default: null,
  },
})

const styles = computed(() => {
  const style = {}

  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }

  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }

  if (props.radius) {
    style.borderRadius = typeof props.radius === 'number' ? `${props.radius}px` : props.radius
  }

  return style
})
</script>

<style lang="scss" scoped>
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-wave 1.5s infinite;
  border-radius: 4px;
  display: inline-block;
}

@keyframes skeleton-wave {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
