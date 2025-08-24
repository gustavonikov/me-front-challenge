<template>
  <svg class="icon" :class="[`-${name}`, sizeClass, colorClass]" :style="iconStyle" :title="title">
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
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value),
  },
  color: {
    type: String,
    default: 'inherit',
    validator: (value) => value === 'inherit' || ['neutral-500'].includes(value),
  },
})

const sizeClass = computed(() => {
  return `-size-${props.size}`
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

  &.-size-small {
    width: 16px;
    height: 16px;
  }
  &.-size-medium {
    width: 24px;
    height: 24px;
  }
  &.-size-large {
    width: 32px;
    height: 32px;
  }

  &.-color-neutral-500 {
    color: $color-neutral-500;
  }
}
</style>
