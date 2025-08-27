<template>
  <vCardBillingAddress label="Supplier" :company="data.company" details-layout="columns" />
</template>
 
<script setup>
import vCardBillingAddress from './CardBillingAddress.vue'

defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})
</script>
 
<style lang="scss" scoped>
</style>
