import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Icon from './Icon.vue'

describe('Icon', () => {
  it('renders a svg element', () => {
    const wrapper = mount(Icon, { props: { name: 'close' } })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders the correct <use> element for the given icon name', () => {
    const iconName = 'phone'
    const wrapper = mount(Icon, { props: { name: iconName } })
    const use = wrapper.find('use')
    expect(use.exists()).toBe(true)
    const href = use.attributes('xlink:href') || use.attributes('href')
    expect(href).toContain(`#icon-${iconName}`)
  })

  it('applies size prop when passed', () => {
    const wrapper = mount(Icon, {
      props: { name: 'close', size: 'lg' }
    })
    expect(wrapper.classes().includes('-size-lg')).toBe(true)
  })

  it('applies color prop as a class', () => {
    const wrapper = mount(Icon, { props: { color: 'neutral-500' }, slots: { default: 'Colored Text' } })
    expect(wrapper.classes().includes('-color-neutral-500')).toBe(true)
  })
})
