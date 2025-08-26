<template>
  <div class="card-billing-address">
    <div class="card-billing-address-header">
      <vText v-if="label" data-testid="card-label">{{ label }}</vText>

      <div class="company-name-wrapper">
        <vText type="body-semibold" color="neutral-700" data-testid="company-name">
          {{ company.name }}
        </vText>

        <vBadge v-if="company.code" variant="primary-light" data-testid="company-code">
          #{{ company.code }}
        </vBadge>
      </div>
    </div>

    <vCompanyDetails
      :billing-info="company.billingInfo"
      :communication-info="company.communicationInfo"
      layout="columns"
    />
  </div>
</template>

<script setup>
import vCompanyDetails from './CompanyDetails.vue'
import vBadge from './globals/Badge.vue'
import vText from './globals/Text.vue'

defineProps({
  label: {
    type: String,
    default: '',
  },
  company: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<style lang="scss" scoped>
.card-billing-address {
  width: 100%;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0px 4px 8px 0px #00000014;
  background-color: $color-bg-primary;
}

.card-billing-address-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 16px;
}

.company-name-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
