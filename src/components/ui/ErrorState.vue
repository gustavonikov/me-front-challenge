<template>
  <div class="error-card">
    <slot name="img">
      <img
        src="/src/assets/imgs/error_data_failed_dog.png"
        alt="Dog sad after a error happened"
        class="error-image"
      />
    </slot>

    <slot name="title">
      <vText type="headline-h5" class="error-title">Oops, something went wrong.</vText>
    </slot>

    <slot name="message">
      <vText type="body-semibold" class="error-message">
        We couldn't load the page data. Please try again later.
      </vText>
    </slot>

    <slot name="action">
      <button class="retry-button" @click="onRetry">Try again</button>
    </slot>
  </div>
</template>
 
<script setup>
import { defineEmits } from 'vue'

import vText from '@/components/ui/Text.vue'

const emit = defineEmits(['retry'])

function onRetry() {
  emit('retry')
}
</script>

<style lang="scss" scoped>
.error-card {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
  padding: 24px;
}

.error-image {
  width: 200px;
  height: auto;
}

.retry-button {
  padding: 12px 24px;
  background-color: $color-primary-500;
  color: $color-neutral-white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
}
</style>
