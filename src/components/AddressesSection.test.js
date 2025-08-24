import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AddressesSection from './AddressesSection.vue'

describe('AddressesSection', () => {
  it('renders component correctly', () => {
    const wrapper = mount(AddressesSection)

    expect(wrapper.find('h2').text()).toBe('Addresses Section')
    expect(wrapper.exists()).toBe(true)
  })
})
