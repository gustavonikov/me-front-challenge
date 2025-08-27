import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SupplierInfo from './SupplierInfo.vue'

describe('SupplierInfo', () => {
  it('renders component correctly', () => {
    const wrapper = mount(SupplierInfo)

    expect(wrapper.find('h2').text()).toBe('Supplier Info')
    expect(wrapper.exists()).toBe(true)
  })
})
