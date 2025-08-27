import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import PreOrderHeader from './PreOrderHeader.vue'

vi.mock('@/components/ui/Text.vue', () => ({
  default: {
    name: 'vText',
    template: '<span><slot /></span>',
    props: ['type', 'color', 'tag']
  }
}))

vi.mock('./CompanyDetails.vue', () => ({
  default: {
    name: 'vCompanyDetails',
    template: '<div data-testid="company-details"></div>',
    props: ['billingInfo', 'communicationInfo', 'layout']
  }
}))

vi.mock('@/components/ui/Icon.vue', () => ({
  default: {
    name: 'vIcon',
    template: '<span data-testid="icon"></span>',
    props: ['name', 'color', 'size']
  }
}))

const dataMock = {
  number: 123,
  serial: 456,
  buyer: 'Test Buyer',
  price: 1000,
  currency: 'USD',
  createdAt: '2020-04-16T12:32:55',
  status: 'Pending',
  billingInfo: [{ type: 'name', value: 'John Doe' }],
  communicationInfo: [
    { type: 'email', value: 'john@example.com' },
    { type: 'phone', value: '123456789' },
    { type: 'fax', value: '987654321' }
  ]
}

describe('PreOrderHeader', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(PreOrderHeader, {
      props: { data: dataMock }
    })
  })

  it('should display pre-order number', () => {
    const preOrderNumber = wrapper.find('[data-testid="pre-order-number"]')
    expect(preOrderNumber.text()).toContain(dataMock.number)
  })

  it('should display pre-order serial with #ME', () => {
    const preOrderSerial = wrapper.find('[data-testid="pre-order-serial"]')
    expect(preOrderSerial.text()).toContain(dataMock.serial)
  })

  it('should display buyer name', () => {
    const buyerName = wrapper.find('[data-testid="buyer-name"]')
    expect(buyerName.text()).toContain(dataMock.buyer)
  })

  it('should display status', () => {
    const status = wrapper.find('[data-testid="pre-order-status"]')
    expect(status.text()).toContain(dataMock.status)
  })

  it('should format purchase value correctly', () => {
    const purchaseValue = wrapper.find('[data-testid="purchase-value"]')
    expect(purchaseValue.text()).toContain(`${dataMock.currency} ${dataMock.price}`)
  })

  it('should format creation date correctly', () => {
    const creationDate = wrapper.find('[data-testid="creation-date"]')
    expect(creationDate.text()).toContain('Created on 2020-04-16 at 12:32:55')
  })

  it('should return empty string when createdAt is null', async () => {
    await wrapper.setProps({
      data: {
        ...dataMock,
        createdAt: null
      }
    })

    const creationDate = wrapper.find('[data-testid="creation-date"]')
    expect(creationDate.text()).not.toMatch(/Created on/)
  })

  it('should pass correct props to vCompanyDetails', () => {
    const companyDetails = wrapper.findComponent({ name: 'vCompanyDetails' })

    expect(companyDetails.props('billingInfo')).toEqual(dataMock.billingInfo)
    expect(companyDetails.props('communicationInfo')).toEqual(dataMock.communicationInfo)
    expect(companyDetails.props('layout')).toBe('rows')
  })

  it('should pass correct props to vIcon', () => {
    const icon = wrapper.findComponent({ name: 'vIcon' })

    expect(icon.props('name')).toBe('info')
    expect(icon.props('color')).toBe('neutral-300')
    expect(icon.props('size')).toBe('sm')
  })
})
