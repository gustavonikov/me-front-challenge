<template>
  <Collapse :open="isOpen" @toggle="toggleCollapse">
    <template #title>
      <vText tag="h2" type="headline-h6" color="neutral-700">Addresses</vText>
    </template>

    <template #body>
      <div class="addresses-wrapper">
        <vCardBillingAddress
          v-for="{ label, company } in data"
          :key="company.name"
          :label="label"
          :company="company"
        />
      </div>
    </template>
  </Collapse>
</template>
 
 <script setup>
import { ref } from 'vue'

import Collapse from './globals/Collapse.vue'
import vText from './globals/Text.vue'
import vCardBillingAddress from './CardBillingAddress.vue'

defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})

const isOpen = ref(false)

const toggleCollapse = () => {
  isOpen.value = !isOpen.value
}
</script>
 
<style lang="scss" scoped>
.addresses-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}
</style>
