<template>
  <div class="pre-order-header">
    <div class="pre-order-badge">
      <vText type="subtitle" color="neutral-white">Pre-Order</vText>

      <vText type="headline-h4" color="neutral-white">4510001114</vText>

      <vText color="neutral-white">#ME11223344</vText>
    </div>

    <div class="pre-order-details">
      <div class="buyer-info">
        <vText class="title" tag="h1" type="headline-h5" color="neutral-700">MTP West Buyer</vText>

        <vCompanyDetails
          :billing-data="[
            {
              infoType: 'name',
              value: 'Jacksonville Group (Jason Burn)',
            },
          ]"
          :communication-data="[
            { infoType: 'email', value: 'jacksonvillegroup@me.com' },
            { infoType: 'phone', value: '903-575-3050' },
            { infoType: 'fax', value: '999-575-3050' },
          ]"
          layout="rows"
        />
      </div>

      <div class="pre-order-summary">
        <vText type="headline-h5">USD 20000</vText>

        <vText type="headline-h5" color="success-500">Need to confirm</vText>

        <div class="pre-order-creation-date">
          <vText color="neutral-700">Created at 2020-04-16 at 15:32:55</vText>

          <vIcon name="info" color="neutral-300" size="sm" />
        </div>
      </div>
    </div>
  </div>
</template>
 
<script setup>
import vCompanyDetails from './CompanyDetails.vue'
import vIcon from './Icon.vue'
import vText from './Text.vue'
</script>
 
<style lang="scss" scoped>
.pre-order-header {
  width: 100%;
  display: flex;
  gap: 24px;
}

.pre-order-badge {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: $color-primary-500;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  padding: 16px;
  width: 200px;
}

.pre-order-details {
  width: 100%;
  display: flex;
  gap: 16px;
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
}

.pre-order-creation-date {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
