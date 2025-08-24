import { it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Text from './Text.vue'

it('renders the given text', () => {
  const wrapper = mount(Text, { slots: { default: 'Sample Text' } })
  expect(wrapper.text()).toBe('Sample Text')
})

it('renders empty when no children are provided', () => {
  const wrapper = mount(Text)
  expect(wrapper.text()).toBe('')
})

it('renders as a different HTML element when specified', () => {
  const wrapper = mount(Text, { props: { tag: 'h1' }, slots: { default: 'Heading' } })
  expect(wrapper.element.tagName.toLowerCase()).toBe('h1')
})

it('supports additional props', () => {
  const wrapper = mount(Text, { attrs: { 'data-testid': 'text-element' }, slots: { default: 'Test' } })
  expect(wrapper.attributes('data-testid')).toBe('text-element')
})

it('applies color prop as a class', () => {
  const wrapper = mount(Text, { props: { color: 'neutral-white' }, slots: { default: 'Colored Text' } })
  expect(wrapper.classes().includes('-color-neutral-white')).toBe(true)
})

it('applies type prop as a class', () => {
  const wrapper = mount(Text, { props: { type: 'subtitle' }, slots: { default: 'Subtitle Text' } })
  expect(wrapper.classes().includes('-type-subtitle')).toBe(true)
})
