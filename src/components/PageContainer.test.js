import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PageContainer from './PageContainer.vue'

describe('PageContainer', () => {
  it('renders slot content', () => {
    const wrapper = mount(PageContainer, {
      slots: {
        default: '<div class="slot-content">Hello World</div>'
      }
    })
    expect(wrapper.find('.slot-content').exists()).toBe(true)
    expect(wrapper.text()).toContain('Hello World')
  })
})
