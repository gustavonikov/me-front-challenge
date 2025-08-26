<template>
  <div class="company-details-field">
    <vIcon :name="iconName" size="sm" />

    <vText>{{ value }}</vText>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import vText from './Text.vue'
import vIcon from './Icon.vue'

const props = defineProps({
  field: {
    type: String,
    required: true,
  },
  value: {
    required: true,
  },
})

const FIELD_ICON_MAP = {
  name: 'user',
  address: 'location-check',
  cnpj: 'document',
  email: 'mail',
  phone: 'phone',
  fax: 'fax',
  readAt: 'eye',
}

const iconName = computed(() => {
  return FIELD_ICON_MAP[props.field] || null
})
</script>

<style lang="scss" scoped>
.company-details-field {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
