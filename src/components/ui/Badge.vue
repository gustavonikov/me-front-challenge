<template>
  <span :class="['badge', `-variant-${variant}`, `-size-${size}`]">
    <slot>{{ text }}</slot>
  </span>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'primary-light'].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
})
</script>

<style lang="scss" scoped>
.badge {
  display: inline-flex;
  user-select: none;
  font-weight: 500;
  line-height: 16px;
}

.-variant-primary {
  background-color: $color-primary-500;
  color: $color-neutral-white;
}

.-variant-primary-light {
  background-color: $color-primary-50;
  color: $color-primary-500;
}

.-size-sm {
  height: 20px;
  padding: 4px;
  font-size: 10px;
  border-radius: 6px;
}
.-size-md {
  height: 24px;
  padding: 4px;
  font-size: 12px;
  border-radius: 8px;
}
.-size-lg {
  height: 32px;
  padding: 8px;
  font-size: 14px;
  border-radius: 10px;
}
</style>
