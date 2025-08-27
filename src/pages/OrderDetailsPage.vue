<template>
  <vPageContainer>
    <div class="order-details-page">
      <template v-if="hasError">
        <Error @retry="fetchOrder(orderId)">
          <template #title>
            <vText type="headline-h4" class="error-title">Failed to load order details.</vText>
          </template>
          <template #message>
            <vText type="body-semibold" class="error-message">
              There was an issue retrieving the order information. Please try again.
            </vText>
          </template>
        </Error>
      </template>

      <template v-else>
        <vPreOrderHeader :loading="isPending" :data="header" />

        <vSupplierInfo :loading="isPending" :data="supplier" />

        <vAddressesSection :data="addresses" />
      </template>
    </div>
  </vPageContainer>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { useOrder } from '@/composables/orders/useOrder'

import vPageContainer from '@/components/ui/PageContainer.vue'
import vPreOrderHeader from '@/components/orders/PreOrderHeader.vue'
import vSupplierInfo from '@/components/orders/SupplierInfo.vue'
import vAddressesSection from '@/components/orders/AddressesSection.vue'
import Error from '@/components/ui/Error.vue'
import vText from '@/components/ui/Text.vue'

const route = useRoute()
const orderId = route.params.id

const { header, supplier, addresses, fetchOrder, isPending, hasError } = useOrder()

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
