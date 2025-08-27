import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AddressesSection from './AddressesSection.vue'

vi.mock('@/components/ui/Collapse.vue', () => ({
  default: {
    name: 'Collapse',
    template: '<div data-testid="mocked-collapse"><slot name="title" /><slot name="body" v-if="open" /></div>',
    props: ['open'],
    emits: ['toggle']
  }
}))

vi.mock('@/components/ui/Text.vue', () => ({
  default: {
    name: 'vText',
    template: '<span data-testid="mocked-text">{{ $slots.default?.()[0]?.children }}</span>',
    props: ['tag', 'type', 'color']
  }
}))

vi.mock('./CardBillingAddress.vue', () => ({
  default: {
    name: 'vCardBillingAddress',
    template: '<div data-testid="mocked-card-billing-address">{{ label }} - {{ company.name }}</div>',
    props: ['label', 'company']
  }
}))

const mockData = [
  {
    label: 'Billing Address',
    company: { name: 'Company A', address: '123 Main St' }
  },
  {
    label: 'Shipping Address',
    company: { name: 'Company B', address: '456 Oak Ave' }
  }
]

describe('AddressesSection', () => {
  const createWrapper = (props = {}) => {
    return mount(AddressesSection, {
      props: { data: [], ...props }
    })
  }

  it('deve renderizar o componente corretamente', () => {
    const wrapper = createWrapper()

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'Collapse' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'vText' }).exists()).toBe(true)
  })

  it('deve renderizar cards para cada item dos dados', () => {
    const wrapper = createWrapper({ data: mockData })
    const cards = wrapper.findAllComponents({ name: 'vCardBillingAddress' })

    expect(cards.length).toBe(mockData.length)
    expect(cards[0].props('label')).toBe('Billing Address')
    expect(cards[0].props('company')).toEqual(mockData[0].company)
    expect(cards[1].props('label')).toBe('Shipping Address')
    expect(cards[1].props('company')).toEqual(mockData[1].company)
  })

  it('não deve renderizar cards quando data está vazio', () => {
    const wrapper = createWrapper({ data: [] })
    const cards = wrapper.findAllComponents({ name: 'vCardBillingAddress' })

    expect(cards.length).toBe(0)
  })
})
