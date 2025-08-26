import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import vCompanyDetails from './CompanyDetails.vue'

vi.mock('./CompanyDetailsField.vue', () => ({
  default: {
    name: 'vCompanyDetailsField',
    template: '<div data-testid="mocked-company-details-field">{{ value }}</div>',
    props: ['field', 'value']
  }
}))

const billingData = [
  {
    infoType: 'name',
    value: 'Jacksonville Group (Jason Burn)',
  },
]
const communicationData = [
  { infoType: 'email', value: 'jacksonvillegroup@me.com' },
  { infoType: 'phone', value: '903-575-3050' },
  { infoType: 'fax', value: '999-575-3050' },
]

describe('CompanyDetails', () => {
  const createWrapper = (props = {}) => {
    return mount(vCompanyDetails, {
      props: { billingData: [], communicationData: [], ...props },
    })
  }

  it('does not render sections if data arrays are empty', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.billing-details').exists()).toBe(false)
    expect(wrapper.find('.communication-details').exists()).toBe(false)
  })

  it('renders both billing and communication sections when data is present', () => {
    const wrapper = createWrapper({ billingData, communicationData })
    expect(wrapper.find('.billing-details').exists()).toBe(true)
    expect(wrapper.find('.communication-details').exists()).toBe(true)
  })

  it('renders billing fields correctly', () => {
    const wrapper = createWrapper({ billingData, communicationData: [] })
    const billingDetails = wrapper.find('.billing-details')
    const billingItems = billingDetails.findAll('[data-testid="mocked-company-details-field"]')
    expect(billingItems.length).toBe(billingData.length)
    expect(billingItems[0].text()).toBe(billingData[0].value)
  })

  it('renders communication fields correctly', () => {
    const wrapper = createWrapper({ billingData: [], communicationData })
    const communicationDetails = wrapper.find('.communication-details')
    const communicationItems = communicationDetails.findAll('[data-testid="mocked-field"]')
    expect(communicationItems.length).toBe(communicationData.length)
    communicationItems.forEach((item, index) => {
      expect(item.text()).toBe(communicationData[index].value)
    })
  })

  it('defaults to "columns" layout when no layout prop is provided', () => {
    const wrapper = createWrapper({ billingData, communicationData })
    expect(wrapper.classes()).toContain('-layout-columns')
  })

  it('applies the correct layout class based on the layout prop', () => {
    const wrapper = createWrapper({ billingData, communicationData, layout: 'rows' })
    expect(wrapper.classes()).toContain('-layout-rows')
  })
})
