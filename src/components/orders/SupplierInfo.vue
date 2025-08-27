<template>
  <template v-if="loading">
    <vCardBillingAddressSkeleton label="Supplier" />
  </template>

  <template v-else>
    <vCardBillingAddress label="Supplier" :company="data" details-layout="columns" />
  </template>
</template>
 
<script setup>
import vCardBillingAddress from './CardBillingAddress.vue'
import vCardBillingAddressSkeleton from './CardBillingAddressSkeleton.vue'

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: () => ({}),
  },
})
</script>
