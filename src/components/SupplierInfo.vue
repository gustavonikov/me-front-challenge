<template>
  <vCardBillingAddress
    label="Supplier"
    :company="{
      name: 'Motion Industries INC',
      code: '101908',
      billingInfo: [
        { type: 'cnpj', value: 'CNPJ: 00.823.053/0001-02' },
        {
          type: 'address',
          value: 'O Box 1477 - Birmingham AL - 35201-4666 - United States of America',
        },
        { type: 'name', value: 'Jack Jeff Ripple Applejack' },
      ],
      communicationInfo: [
        { type: 'email', value: 'jack_jeff_applejack@motion.com' },
        { type: 'phone', value: '800-296-5522' },
        { type: 'fax', value: '800-296-5522' },
        { type: 'readAt', value: '2020-05-23T12:45:20.39' },
      ],
    }"
  />
</template>
 
<script setup>
import vCardBillingAddress from './CardBillingAddress.vue'
</script>
 
<style lang="scss" scoped>
</style>
