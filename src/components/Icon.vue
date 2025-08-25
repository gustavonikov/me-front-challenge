<template>
  <svg :class="['icon', `-size-${size}`, colorClass]">
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  color: {
    type: String,
    default: 'inherit',
    validator: (value) => value === 'inherit' || ['neutral-500'].includes(value),
  },
})

const colorClass = computed(() => {
  return props.color !== 'inherit' ? `-color-${props.color}` : ''
})
</script>

<style lang="scss" scoped>
.icon {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
  fill: currentColor;

  &.-size-sm {
    height: 16px;
    width: 16px;
  }
  &.-size-md {
    height: 24px;
    width: 24px;
  }
  &.-size-lg {
    height: 32px;
    width: 32px;
  }

  &.-color-neutral-500 {
    color: $color-neutral-500;
  }
}
</style>
