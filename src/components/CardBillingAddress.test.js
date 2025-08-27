import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import vCardBillingAddress from './CardBillingAddress.vue'

vi.mock('./ui/Badge.vue', () => ({
  default: {
    name: 'vBadge',
    template: '<span><slot /></span>',
  }
}))
vi.mock('./ui/Text.vue', () => ({
  default: {
    name: 'vText',
    template: '<span><slot /></span>',
  }
}))
vi.mock('./CompanyDetails.vue', () => ({
  default: {
    name: 'vCompanyDetails',
    template: '<div></div>',
    props: ['billingInfo', 'communicationInfo', 'layout']
  }
}))

describe('CardBillingAddress', () => {
  const companyMock = {
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
  }

  const createWrapper = (props = {}) => {
    return mount(vCardBillingAddress, {
      props: { label: 'Test', company: companyMock, ...props },
    })
  }

  it('should render the component correctly', () => {
    const wrapper = createWrapper()

    expect(wrapper.find('.card-billing-address').exists()).toBe(true)
    expect(wrapper.find('[data-testid="card-label"').exists()).toBe(true)
    expect(wrapper.find('[data-testid="company-name"').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'vBadge' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'vCompanyDetails' }).exists()).toBe(true)
  })

  it('should not display the label if it is not provided', () => {
    const wrapper = createWrapper({ label: '' })

    const label = wrapper.find('[data-testid="card-label"]')
    expect(label.exists()).toBe(false)
  })

  it('should display the label correctly', () => {
    const wrapper = createWrapper()

    const label = wrapper.find('[data-testid="card-label"]')
    expect(label.text()).toBe('Test')
  })

  it('should display the company name correctly', () => {
    const wrapper = createWrapper()

    const label = wrapper.find('[data-testid="company-name"]')
    expect(label.text()).toBe(companyMock.name)
  })

  it('should not display the company code badge if code is not provided', () => {
    const wrapper = createWrapper({
      company: { ...companyMock, code: '' },
    })

    const badge = wrapper.findComponent({ name: 'vBadge' })
    expect(badge.exists()).toBe(false)
  })

  it('should display the company code badge correctly', () => {
    const wrapper = createWrapper()

    const badge = wrapper.findComponent({ name: 'vBadge' })
    expect(badge.text()).toBe(`#${companyMock.code}`)
  })

  it('should pass the correct props to CompanyDetails component', () => {
    const wrapper = createWrapper()

    const companyDetails = wrapper.findComponent({ name: 'vCompanyDetails' })
    expect(companyDetails.props('billingInfo')).toStrictEqual(companyMock.billingInfo)
    expect(companyDetails.props('communicationInfo')).toStrictEqual(companyMock.communicationInfo)
    expect(companyDetails.props('layout')).toBe('columns')
  })
})
