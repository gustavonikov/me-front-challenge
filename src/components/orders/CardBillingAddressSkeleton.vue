<template>
  <div class="card-billing-address">
    <div class="card-billing-address-header">
      <vText v-if="label">{{ label }}</vText>
      <vSkeleton v-else Skeleton width="80px" height="20px" />

      <div class="company-name-wrapper">
        <vSkeleton width="220px" height="17px" />
        <vSkeleton width="60px" height="24px" radius="8px" />
      </div>
    </div>

    <slot>
      <div class="company-details-skeleton-wrapper">
        <vSkeleton width="100%" height="16px" />
        <vSkeleton width="100%" height="16px" />
        <vSkeleton width="100%" height="16px" />
        <vSkeleton width="100%" height="16px" />
        <vSkeleton width="100%" height="16px" />
        <vSkeleton width="100%" height="16px" />
      </div>
    </slot>
  </div>
</template>

<script setup>
import vSkeleton from '@/components/ui/Skeleton.vue'
import vText from '@/components/ui/Text.vue'

defineProps({
  label: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss" scoped>
.card-billing-address {
  width: 100%;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0px 4px 8px 0px $me-shadow-level-1;
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

.company-details-skeleton-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 8px;

  @include mq(md, 'max') {
    grid-template-columns: 1fr;
  }
}
</style>
