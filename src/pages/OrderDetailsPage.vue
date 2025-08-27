<template>
  <vPageContainer>
    <div class="order-details-page">
      <vPreOrderHeader :data="header" :loading="isPending" />

      <vSupplierInfo :data="supplier" />

      <vAddressesSection :data="addresses" />
    </div>
  </vPageContainer>
</template>

<script setup>
import { useRoute } from 'vue-router'

import vPageContainer from '@/components/ui/PageContainer.vue'
import vPreOrderHeader from '@/components/orders/PreOrderHeader.vue'
import vSupplierInfo from '@/components/orders/SupplierInfo.vue'
import vAddressesSection from '@/components/orders/AddressesSection.vue'
import { useOrder } from '@/composables/orders/useOrder'
import { onMounted } from 'vue'

const route = useRoute()
const orderId = route.params.id

const { header, supplier, addresses, fetchOrder, isPending } = useOrder()

onMounted(() => {
  fetchOrder(orderId)
})
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
