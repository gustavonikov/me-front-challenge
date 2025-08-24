import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PreOrderHeader from './PreOrderHeader.vue'

describe('PreOrderHeader', () => {
  it('renders component correctly', () => {
    const wrapper = mount(PreOrderHeader)

    expect(wrapper.find('h2').text()).toBe('Pre Order Header')
    expect(wrapper.exists()).toBe(true)
  })
})
