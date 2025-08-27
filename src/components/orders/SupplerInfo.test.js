import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SupplierInfo from './SupplierInfo.vue'

vi.mock('./CardBillingAddress.vue', () => ({
  default: {
    name: 'vCardBillingAddress',
    template: '<div data-testid="mocked-card-billing-address">{{ company }}</div>',
    props: ['label', 'company', 'detailsLayout']
  }
}))

const mockData = {
  name: 'Jacksonville Group (Jason Burn)',
  address: '123 Main St'
}

describe('SupplierInfo', () => {
  const createWrapper = (props = {}) => {
    return mount(SupplierInfo, {
      props: { data: [], ...props }
    })
  }

  it('deve renderizar o componente corretamente', () => {
    const wrapper = createWrapper()

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'vCardBillingAddress' }).exists()).toBe(true)
  })

  it('deve passar as props corretas para o CardBillingAddress', () => {
    const wrapper = createWrapper({ data: mockData })
    const cardComponent = wrapper.findComponent({ name: 'vCardBillingAddress' })

    expect(cardComponent.props('label')).toBe('Supplier')
    expect(cardComponent.props('company')).toEqual(mockData)
    expect(cardComponent.props('detailsLayout')).toBe('columns')
  })
})
