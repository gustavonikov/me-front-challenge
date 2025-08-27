<template>
  <div class="pre-order-header">
    <div class="pre-order-badge">
      <vText type="subtitle" color="neutral-white" data-testid="pre-order-text">Pre-Order</vText>

      <vText type="headline-h4" color="neutral-white" data-testid="pre-order-number">
        {{ data.number }}
      </vText>

      <vText color="neutral-white" data-testid="pre-order-serial">#{{ data.serial }}</vText>
    </div>

    <div class="pre-order-details">
      <div class="buyer-info">
        <vText tag="h1" type="headline-h5" color="neutral-700" data-testid="buyer-name">
          {{ data.buyer }}
        </vText>

        <vCompanyDetails
          :billing-info="data.billingInfo"
          :communication-info="data.communicationInfo"
          layout="rows"
        />
      </div>

      <div class="pre-order-summary">
        <vText type="headline-h5" data-testid="purchase-value">{{ purchaseValue }}</vText>

        <vText type="headline-h5" color="success-500" data-testid="pre-order-status">
          {{ data.status }}
        </vText>

        <div class="pre-order-creation-date">
          <vText color="neutral-700" data-testid="creation-date">{{ createdAt }}</vText>

          <vIcon name="info" color="neutral-300" size="sm" />
        </div>
      </div>
    </div>
  </div>
</template>
 
<script setup>
import vCompanyDetails from './CompanyDetails.vue'
import vIcon from '@/components/ui/Icon.vue'
import vText from '@/components/ui/Text.vue'
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

const purchaseValue = computed(() => `${props.data.currency} ${props.data.price}`)
const createdAt = computed(() => {
  if (props.data.createdAt == null) return ''

  const date = new Date(props.data.createdAt)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `Created on ${year}-${month}-${day} at ${hours}:${minutes}:${seconds}`
})
</script>
 
<style lang="scss" scoped>
.pre-order-header {
  width: 100%;
  display: flex;
  gap: 24px;

  @include mq(md, 'max') {
    flex-direction: column;
    margin: 0 -16px;
  }
}

.pre-order-badge {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: $color-primary-500;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  padding: 16px;
  min-width: 200px;

  @include mq(md, 'max') {
    margin: 0 -16px;
    border-radius: 0;
  }
}

.pre-order-details {
  width: 100%;
  display: flex;
  gap: 16px;

  @include mq(md, 'max') {
    flex-direction: column;
  }
}

.buyer-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pre-order-summary {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-end;

  @include mq(md, 'max') {
    align-items: flex-start;
  }
}

.pre-order-creation-date {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
