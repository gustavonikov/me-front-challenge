<template>
  <div class="card-billing-address-skeleton" data-testid="card-billing-address-skeleton">
    <div
      class="card-billing-address-header-skeleton"
      data-testid="card-billing-address-header-skeleton"
    >
      <vText v-if="label" data-testid="card-billing-address-label-skeleton-filled">
        {{ label }}
      </vText>

      <vSkeleton v-else width="80px" height="20px" test-id="card-billing-address-label" />

      <div class="company-name-wrapper" data-testid="company-name-wrapper-skeleton">
        <vSkeleton width="220px" height="17px" test-id="company-name" />
        <vSkeleton width="60px" height="24px" radius="8px" test-id="company-code" />
      </div>
    </div>

    <slot>
      <div class="company-details-skeleton-wrapper" data-testid="company-details-skeleton-wrapper">
        <vSkeleton width="100%" height="16px" test-id="company-detail" />
        <vSkeleton width="100%" height="16px" test-id="company-detail" />
        <vSkeleton width="100%" height="16px" test-id="company-detail" />
        <vSkeleton width="100%" height="16px" test-id="company-detail" />
        <vSkeleton width="100%" height="16px" test-id="company-detail" />
        <vSkeleton width="100%" height="16px" test-id="company-detail" />
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
.card-billing-address-skeleton {
  width: 100%;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0px 4px 8px 0px $me-shadow-level-1;
  background-color: $color-bg-primary;
}

.card-billing-address-header-skeleton {
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
