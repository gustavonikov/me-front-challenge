<template>
  <vPageContainer>
    <div class="order-details-page">
      <vPreOrderHeader :data="headerMock" />

      <vSupplierInfo
        :data="{
          company: {
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
          },
        }"
      />

      <vAddressesSection :data="addressesInfoMock" />
    </div>
  </vPageContainer>
</template>

<script setup>
import vPageContainer from '@/components/ui/PageContainer.vue'
import vPreOrderHeader from '@/components/orders/PreOrderHeader.vue'
import vSupplierInfo from '@/components/orders/SupplierInfo.vue'
import vAddressesSection from '@/components/orders/AddressesSection.vue'

const headerMock = {
  number: 4510001114,
  serial: 11223344,
  buyer: 'MTP West Buyer',
  price: 20000,
  currency: 'USD',
  createdAt: '2020-04-16T15:32:55.382Z',
  status: 'Need to confirm',
  contact: {
    name: 'Jacksonville Group (Jason Burn)',
    email: 'jacksonvillegroup@me.com',
    phone: '903-575-3050',
    fax: '999-575-3050',
  },
}

const addressesInfoMock = [
  {
    label: 'Ship to',
    company: {
      name: 'West Plant',
      code: '101908',
      billingInfo: [
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
      ],
    },
  },
  {
    label: 'Bill to',
    company: {
      name: 'Pilgrims Pride Corp.',
      code: '101908',
      billingInfo: [
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
      ],
    },
  },
  {
    label: 'Charge to',
    company: {
      name: 'Lorem Ipsum',
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
      ],
    },
  },
  {
    label: 'Ship to',
    company: {
      name: 'West Plant',
      code: '101908',
      billingInfo: [
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
      ],
    },
  },
  {
    label: 'Bill to',
    company: {
      name: 'Pilgrims Pride Corp.',
      code: '101908',
      billingInfo: [
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
      ],
    },
  },
  {
    label: 'Charge to',
    company: {
      name: 'Lorem Ipsum',
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
      ],
    },
  },
]
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
