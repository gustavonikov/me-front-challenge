import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Skeleton from './Skeleton.vue'

describe('Skeleton.vue', () => {
  it('should render the component with the default "skeleton" class', () => {
    const wrapper = mount(Skeleton)
    expect(wrapper.classes()).toContain('skeleton')
  })

  it('should apply the correct width when the prop is a string', () => {
    const wrapper = mount(Skeleton, {
      props: { width: '200px' },
    })
    expect(wrapper.attributes().style).toContain('width: 200px')
  })

  it('should apply the correct width when the prop is a number', () => {
    const wrapper = mount(Skeleton, {
      props: { width: 150 },
    })
    expect(wrapper.attributes().style).toContain('width: 150px')
  })

  it('should apply the correct height when the prop is a string', () => {
    const wrapper = mount(Skeleton, {
      props: { height: '50px' },
    })
    expect(wrapper.attributes().style).toContain('height: 50px')
  })

  it('should apply the correct height when the prop is a number', () => {
    const wrapper = mount(Skeleton, {
      props: { height: 32 },
    })
    expect(wrapper.attributes().style).toContain('height: 32px')
  })

  it('should apply the correct border radius when the prop is a string', () => {
    const wrapper = mount(Skeleton, {
      props: { radius: '8px' },
    })
    expect(wrapper.attributes().style).toContain('border-radius: 8px')
  })

  it('should apply the correct border radius when the prop is a number', () => {
    const wrapper = mount(Skeleton, {
      props: { radius: 10 },
    })
    expect(wrapper.attributes().style).toContain('border-radius: 10px')
  })

  it('should apply custom classes in addition to the default class', () => {
    const wrapper = mount(Skeleton, {
      props: { customClasses: ['circle', 'profile-picture'] },
    })
    expect(wrapper.classes()).toContain('skeleton')
    expect(wrapper.classes()).toContain('circle')
    expect(wrapper.classes()).toContain('profile-picture')
  })
})
