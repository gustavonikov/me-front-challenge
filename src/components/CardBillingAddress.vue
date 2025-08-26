<template>
  <div class="card-billing-address">
    <div class="card-billing-address-header">
      <vText v-if="company.label">{{ company.label }}</vText>

      <div class="company-name-wrapper">
        <vText v-if="company.name">{{ company.name }}</vText>

        <vText v-if="company.code">{{ company.code }}</vText>
      </div>
    </div>

    <vCompanyDetails
      :billing-info="company.billingInfo"
      :communication-info="company.communicationInfo"
      :layout="layout"
    />
  </div>
</template>

<script setup>
import vCompanyDetails from './CompanyDetails.vue'
import vText from './globals/Text.vue'

defineProps({
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
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
</style>
