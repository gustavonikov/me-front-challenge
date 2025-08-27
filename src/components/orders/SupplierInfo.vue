<template>
  <vCardBillingAddress label="Supplier" :company="data" details-layout="columns" />
</template>
 
<script setup>
import vCardBillingAddress from './CardBillingAddress.vue'

defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})
</script>
 
<style lang="scss" scoped>
</style>
