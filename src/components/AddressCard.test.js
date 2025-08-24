import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AddressCard from './AddressCard.vue'

describe('AddressCard', () => {
  it('renders component correctly', () => {
    const wrapper = mount(AddressCard)

    expect(wrapper.find('h2').text()).toBe('Address Card')
    expect(wrapper.exists()).toBe(true)
  })
})
