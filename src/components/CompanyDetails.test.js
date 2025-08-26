import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import vCompanyDetails from './CompanyDetails.vue'
import vCompanyDetailsField from './CompanyDetailsField.vue'

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
  it('does not render sections if data arrays are empty', () => {
    const wrapper = mount(vCompanyDetails, { props: { billingData: [], communicationData: [] } })
    expect(wrapper.find('.billing-details').exists()).toBe(false)
    expect(wrapper.find('.communication-details').exists()).toBe(false)
  })

  it('renders both billing and communication sections when data is present', () => {
    const wrapper = mount(vCompanyDetails, { props: { billingData, communicationData } })
    expect(wrapper.find('.billing-details').exists()).toBe(true)
    expect(wrapper.find('.communication-details').exists()).toBe(true)
  })

  it('renders billing fields correctly', () => {
    const wrapper = mount(vCompanyDetails, { props: { billingData, communicationData: [] } })
    const billingDetails = wrapper.find('.billing-details')
    const billingItems = billingDetails.findAllComponents(vCompanyDetailsField)
    expect(billingItems.length).toBe(billingData.length)
    expect(billingItems[0].text()).toBe(billingData[0].value)
  })

  it('renders communication fields correctly', () => {
    const wrapper = mount(vCompanyDetails, { props: { billingData: [], communicationData } })
    const communicationDetails = wrapper.find('.communication-details')
    const communicationItems = communicationDetails.findAllComponents(vCompanyDetailsField)
    expect(communicationItems.length).toBe(communicationData.length)
    communicationItems.forEach((item, index) => {
      expect(item.text()).toBe(communicationData[index].value)
    })
  })

  it('defaults to "columns" layout when no layout prop is provided', () => {
    const wrapperColumn = mount(vCompanyDetails, { props: { billingData, communicationData } })
    expect(wrapperColumn.classes()).toContain('-layout-columns')
  })

  it('applies the correct layout class based on the layout prop', () => {
    const wrapperRow = mount(vCompanyDetails, { props: { billingData, communicationData, layout: 'row' } })
    expect(wrapperRow.classes()).toContain('-layout-row')
  })
})
