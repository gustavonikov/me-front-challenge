import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import vCompanyDetails from './CompanyDetails.vue'

vi.mock('./CompanyDetailsField.vue', () => ({
  default: {
    name: 'vCompanyDetailsField',
    template: '<div data-testid="mocked-company-details-field">{{ value }}</div>',
    props: ['field', 'value'],
    inheritAttrs: false
  }
}))

const billingInfo = [
  {
    type: 'name',
    value: 'Jacksonville Group (Jason Burn)',
  },
]
const communicationInfo = [
  { type: 'email', value: 'jacksonvillegroup@me.com' },
  { type: 'phone', value: '903-575-3050' },
  { type: 'fax', value: '999-575-3050' },
]

describe('CompanyDetails', () => {
  const createWrapper = (props = {}) => {
    return mount(vCompanyDetails, {
      props: { billingInfo: [], communicationInfo: [], ...props },
    })
  }

  it('does not render sections if data arrays are empty', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.billing-details').exists()).toBe(false)
    expect(wrapper.find('.communication-details').exists()).toBe(false)
  })

  it('renders both billing and communication sections when data is present', () => {
    const wrapper = createWrapper({ billingInfo, communicationInfo })
    expect(wrapper.find('.billing-details').exists()).toBe(true)
    expect(wrapper.find('.communication-details').exists()).toBe(true)
  })

  it('renders billing fields correctly', () => {
    const wrapper = createWrapper({ billingInfo, communicationInfo: [] })
    const billingDetails = wrapper.find('.billing-details')
    const billingItems = billingDetails.findAll('[data-testid="mocked-company-details-field"]')
    expect(billingItems.length).toBe(billingInfo.length)
    expect(billingItems[0].text()).toBe(billingInfo[0].value)
  })

  it('renders communication fields correctly', () => {
    const wrapper = createWrapper({ billingInfo: [], communicationInfo })
    console.log(wrapper.html());

    const communicationDetails = wrapper.find('.communication-details')
    const communicationItems = communicationDetails.findAll('[data-testid="mocked-company-details-field"]')

    expect(communicationItems.length).toBe(communicationInfo.length)
    communicationItems.forEach((item, index) => {
      expect(item.text()).toBe(communicationInfo[index].value)
    })
  })

  it('defaults to "stacked" layout when no layout prop is provided', () => {
    const wrapper = createWrapper({ billingInfo, communicationInfo })
    expect(wrapper.classes()).toContain('-layout-stacked')
  })

  it('applies the correct layout class based on the layout prop', () => {
    const wrapper = createWrapper({ billingInfo, communicationInfo, layout: 'rows' })
    expect(wrapper.classes()).toContain('-layout-rows')
  })
})
