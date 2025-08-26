<template>
  <div :class="`company-info -layout-${layout}`">
    <div
      v-if="billingInfo.length"
      class="billing-details"
      role="group"
      aria-label="Company Billing information"
    >
      <vCompanyDetailsField
        v-for="info in billingInfo"
        :key="info.type"
        :field="info.type"
        :value="info.value"
      />
    </div>

    <div
      v-if="communicationInfo.length"
      class="communication-details"
      role="group"
      aria-label="Company Communication information"
    >
      <vCompanyDetailsField
        v-for="info in communicationInfo"
        :key="info.type"
        :field="info.type"
        :value="info.value"
      />
    </div>
  </div>
</template>

<script setup>
import vCompanyDetailsField from './CompanyDetailsField.vue'

defineProps({
  billingInfo: {
    type: Array,
    default: () => [],
  },
  communicationInfo: {
    type: Array,
    default: () => [],
  },
  layout: {
    type: String,
    default: 'stacked',
    validator: (value) => ['columns', 'rows', 'stacked'].includes(value),
  },
})
</script>

<style lang="scss" scoped>
.company-info {
  display: flex;
}

.-layout {
  &-columns {
    .billing-details,
    .communication-details {
      flex: 1;
    }
  }

  &-rows {
    flex-direction: column;
    gap: 4px;

    .billing-details,
    .communication-details {
      flex-direction: row;
      gap: 4px 16px;
    }
  }

  &-stacked {
    flex-direction: column;
  }
}

.billing-details,
.communication-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
