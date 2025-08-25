<template>
  <div class="order-details-page">
    <pre-order-header />

    <supplier-info />

    <addresses-section />
  </div>
</template>

<script setup>
import PreOrderHeader from '@/components/PreOrderHeader.vue'
import SupplierInfo from '@/components/SupplierInfo.vue'
import AddressesSection from '@/components/AddressesSection.vue'
</script>

<style lang="scss" scoped>
.order-details-page {
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}
</style>
