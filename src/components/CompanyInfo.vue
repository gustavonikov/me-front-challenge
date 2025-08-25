<template>
  <div :class="`company-info -layout-${layout}`">
    <div
      v-if="billingData.length"
      class="billing-section"
      role="group"
      aria-label="Company Billing information"
    >
      <CompanyInfoField
        v-for="field in billingData"
        :key="field.infoType"
        :field="field.infoType"
        :value="field.value"
      />
    </div>

    <div
      v-if="communicationData.length"
      class="communication-section"
      role="group"
      aria-label="Company Contact information"
    >
      <CompanyInfoField
        v-for="field in communicationData"
        :key="field.infoType"
        :field="field.infoType"
        :value="field.value"
      />
    </div>
  </div>
</template>

<script setup>
import CompanyInfoField from './CompanyInfoField.vue'

defineProps({
  billingData: {
    type: Array,
    default: () => [],
  },
  communicationData: {
    type: Array,
    default: () => [],
  },
  layout: {
    type: String,
    default: 'columns',
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
    justify-content: space-between;
  }

  &-rows {
    flex-direction: column;
    gap: 4px;

    .billing-section,
    .communication-section {
      flex-direction: row;
      gap: 4px 16px;
    }
  }

  &-stacked {
    flex-direction: column;
  }
}

.billing-section,
.communication-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
