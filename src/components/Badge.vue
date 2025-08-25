<template>
  <span :class="['badge', `-bg-color-${bgColor}`, `-color-${color}`]">
    <slot>{{ text }}</slot>
  </span>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: '',
  },
  bgColor: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary'].includes(value),
  },
  color: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary'].includes(value),
  },
})
</script>

<style lang="scss" scoped>
.badge {
  display: inline-flex;
  padding: 4px 6px;
  border-radius: 8px;
  user-select: none;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
}

.bg-color-primary {
  background-color: $color-bg-primary;
}

.color-primary {
  color: $color-primary-500;
}
</style>
