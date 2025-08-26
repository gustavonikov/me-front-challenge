<template>
  <div class="collapse">
    <button
      class="collapse-header"
      @click="$emit('toggle')"
      :aria-expanded="open.toString()"
      :aria-controls="contentId"
      aria-label="Toggle Collapse"
      type="button"
    >
      <span class="chevron-collapse" :class="{ rotate: open }">
        <vIcon name="chevron-up" color="primary-500" size="xs" />
      </span>

      <slot name="title" />
    </button>

    <div class="collapse-body" v-show="open" :id="contentId">
      <slot name="body" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import vIcon from './Icon.vue'

const generateUniqueId = () => {
  return 'collapse-' + Math.random().toString(36).substring(2, 9)
}

const contentId = computed(() => {
  return generateUniqueId()
})

defineProps({
  open: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss" scoped>
.collapse {
  width: 100%;
}

.collapse-header {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.chevron-collapse {
  height: 20px;
  width: 20px;
  padding: 2px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  transition: transform 0.3s ease;
  background-color: $color-primary-50;

  &.rotate {
    transform: rotate(180deg);
  }
}

.collapse-body {
  margin-top: 16px;
}
</style>
