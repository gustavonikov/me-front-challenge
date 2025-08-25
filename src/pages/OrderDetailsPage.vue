<template>
  <vPageContainer>
    <div class="order-details-page">
      <vPreOrderHeader />

      <vSupplierInfo />

      <vAddressesSection />
    </div>
  </vPageContainer>
</template>

<script setup>
import vPageContainer from '@/components/PageContainer.vue'
import vPreOrderHeader from '@/components/PreOrderHeader.vue'
import vSupplierInfo from '@/components/SupplierInfo.vue'
import vAddressesSection from '@/components/AddressesSection.vue'
</script>

<style lang="scss" scoped>
.order-details-page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}
</style>
