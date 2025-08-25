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
    validator: (value) => value === 'inherit' || ['neutral-300', 'neutral-500'].includes(value),
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
  width: 1em;
  height: 1em;

  &.-size-sm {
    font-size: 16px;
  }
  &.-size-md {
    font-size: 24px;
  }
  &.-size-lg {
    font-size: 32px;
  }

  &.-color-neutral-500 {
    color: $color-neutral-500;
  }
  &.-color-neutral-300 {
    color: $color-neutral-300;
  }
}
</style>
