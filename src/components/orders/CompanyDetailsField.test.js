import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import vCompanyDetailsField from './CompanyDetailsField.vue'

vi.mock('@/components/ui/Text.vue', () => ({
  default: {
    name: 'vText',
    template: '<span><slot /></span>',
  }
}))
vi.mock('@/components/ui/Icon.vue', () => ({
  default: {
    name: 'vIcon',
    template: '<i></i>',
    props: ['name', 'size']
  }
}))

describe('CompanyDetailsField', () => {
  const defaultProps = {
    field: 'name',
    value: 'Company Test S.A'
  }

  const createWrapper = (props = {}) => {
    return mount(vCompanyDetailsField, {
      props: { ...defaultProps, ...props },
    })
  }

  it('should render the component correctly', () => {
    const wrapper = createWrapper()

    expect(wrapper.find('.company-details-field').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'vText' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'vIcon' }).exists()).toBe(true)
  })

  it('should display the value passed via prop in the slot', () => {
    const wrapper = createWrapper()

    const textComponent = wrapper.findComponent({ name: 'vText' })
    expect(textComponent.text()).toBe(defaultProps.value)
  })

  describe('Icon mapping', () => {
    it('should pass name="user" to vIcon when field="name"', () => {
      const wrapper = createWrapper({ field: 'name' })
      const iconComponent = wrapper.findComponent({ name: 'vIcon' })

      expect(iconComponent.props('name')).toBe('user')
    })

    it('should pass name="location-check" to vIcon when field="address"', () => {
      const wrapper = createWrapper({ field: 'address' })
      const iconComponent = wrapper.findComponent({ name: 'vIcon' })

      expect(iconComponent.props('name')).toBe('location-check')
    })

    it('should pass name="document" to vIcon when field="cnpj"', () => {
      const wrapper = createWrapper({ field: 'cnpj' })
      const iconComponent = wrapper.findComponent({ name: 'vIcon' })

      expect(iconComponent.props('name')).toBe('document')
    })

    it('should pass name="mail" to vIcon when field="email"', () => {
      const wrapper = createWrapper({ field: 'email' })
      const iconComponent = wrapper.findComponent({ name: 'vIcon' })

      expect(iconComponent.props('name')).toBe('mail')
    })

    it('should pass name="phone" to vIcon when field="phone"', () => {
      const wrapper = createWrapper({ field: 'phone' })
      const iconComponent = wrapper.findComponent({ name: 'vIcon' })

      expect(iconComponent.props('name')).toBe('phone')
    })

    it('should pass name="fax" to vIcon when field="fax"', () => {
      const wrapper = createWrapper({ field: 'fax' })
      const iconComponent = wrapper.findComponent({ name: 'vIcon' })

      expect(iconComponent.props('name')).toBe('fax')
    })

    it('should pass name="eye" to vIcon when field="readAt"', () => {
      const wrapper = createWrapper({ field: 'readAt' })
      const iconComponent = wrapper.findComponent({ name: 'vIcon' })

      expect(iconComponent.props('name')).toBe('eye')
    })

    it('should pass name=null to vIcon when field is not mapped', () => {
      const wrapper = createWrapper({ field: 'unknown' })
      const iconComponent = wrapper.findComponent({ name: 'vIcon' })

      expect(iconComponent.props('name')).toBeNull()
    })
  })
})
