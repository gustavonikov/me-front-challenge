import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Badge from './Badge.vue'

describe('Badge.vue', () => {
  it('renders slot content', () => {
    const wrapper = mount(Badge, {
      slots: {
        default: 'badge text'
      }
    })
    expect(wrapper.text()).toContain('badge text')
  })

  it('applies a bg color class when bgColor prop is passed', () => {
    const wrapper = mount(Badge, {
      props: { bgColor: 'secondary' }
    })
    expect(wrapper.classes()).toContain('-bg-color-secondary')
  })

  it('applies a bg color class when color prop is passed', () => {
    const wrapper = mount(Badge, {
      props: { color: 'success' }
    })
    expect(wrapper.classes()).toContain('-color-success')
  })
})
