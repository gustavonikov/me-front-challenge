<template>
  <div class="page-container">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  containerClasses: {
    type: Array,
    default: () => [],
  },
})
</script>

<style lang="scss" scoped>
.page-container {
  max-width: 1360px;
  min-height: 100dvh;
  margin: 0 auto;
  padding: 24px;

  @include mq(md, 'max') {
    padding: 0 12px 24px;
  }
}
</style>
