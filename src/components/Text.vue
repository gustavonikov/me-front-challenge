<template>
  <component :is="tag" :class="['text', `-type-${type}`, `-color-${color}`]" v-bind="attrs">
    <slot />
  </component>
</template>

<script setup>
import { defineProps, useAttrs } from 'vue'

defineProps({
  tag: {
    type: String,
    default: 'p',
  },
  type: {
    type: String,
    default: 'caption',
    validator: (value) =>
      [
        'headline-h4',
        'headline-h5',
        'headline-h6',
        'subtitle',
        'body-semibold',
        'caption',
      ].includes(value),
  },
  color: {
    type: String,
    default: 'neutral-500',
    validator: (value) =>
      ['neutral-white', 'neutral-300', 'neutral-500', 'neutral-700', 'success-500'].includes(value),
  },
})

const attrs = useAttrs()
</script>

<style lang="scss" scoped>
.text {
  margin: 0;
}

.-type-headline-h4 {
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
}

.-type-headline-h5 {
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.-type-headline-h6 {
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
}

.-type-subtitle {
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
}

.-type-body-semibold {
  font-weight: 600;
  font-size: 14px;
  line-height: 120%;
}

.-type-caption {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
}

.-color-neutral-white {
  color: $color-neutral-white;
}

.-color-neutral-300 {
  color: $color-neutral-300;
}

.-color-neutral-500 {
  color: $color-neutral-500;
}

.-color-neutral-700 {
  color: $color-neutral-700;
}

.-color-success-500 {
  color: $color-success-500;
}
</style>
