import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Collapse from '@/components/Collapse.vue'

const mockVIcon = {
  name: 'vIcon',
  template: '<div data-testid="icon" :class="[`icon-${name}`, `color-${color}`, `size-${size}`]"></div>',
  props: ['name', 'color', 'size']
}

describe('Collapse Component', () => {
  const defaultSlots = {
    title: '<span>Collapse Title</span>',
    body: '<p>Collapse content</p>'
  }

  const createWrapper = (props = {}, slots = defaultSlots) => {
    return mount(Collapse, {
      props,
      slots,
      global: {
        components: {
          vIcon: mockVIcon
        }
      }
    })
  }

  describe('Rendering', () => {
    it('should render correctly with default props', () => {
      const wrapper = createWrapper()

      expect(wrapper.find('.collapse').exists()).toBe(true)
      expect(wrapper.find('.collapse-header').exists()).toBe(true)
      expect(wrapper.find('.collapse-body').exists()).toBe(true)
      expect(wrapper.find('.chevron-collapse').exists()).toBe(true)
    })

    it('should render title and body slots', () => {
      const wrapper = createWrapper()

      expect(wrapper.text()).toContain('Collapse Title')
      expect(wrapper.text()).toContain('Collapse content')
    })

    it('should render vIcon with correct props', () => {
      const wrapper = createWrapper()
      const icon = wrapper.findComponent(mockVIcon)

      expect(icon.exists()).toBe(true)
      expect(icon.props()).toEqual({
        name: 'chevron-up',
        color: 'primary-500',
        size: 'xs'
      })
    })
  })

  describe('Behavior', () => {
    it('should have open as false by default', () => {
      const wrapper = createWrapper()

      expect(wrapper.props('open')).toBe(false)
    })

    it('should hide body when open is false', () => {
      const wrapper = createWrapper({ open: false })
      const body = wrapper.find('.collapse-body')

      expect(body.isVisible()).toBe(false)
    })

    it('should show body when open is true', () => {
      const wrapper = createWrapper({ open: true })
      const body = wrapper.find('.collapse-body')

      expect(body.isVisible()).toBe(true)
    })

    it('should apply "rotate" class to chevron when open is true', () => {
      const wrapper = createWrapper({ open: true })
      const chevron = wrapper.find('.chevron-collapse')

      expect(chevron.classes()).toContain('rotate')
    })

    it('should not apply "rotate" class to chevron when open is false', () => {
      const wrapper = createWrapper({ open: false })
      const chevron = wrapper.find('.chevron-collapse')

      expect(chevron.classes()).not.toContain('rotate')
    })

    it('should emit "toggle" event when button is clicked', async () => {
      const wrapper = createWrapper()
      const button = wrapper.find('.collapse-header')

      await button.trigger('click')

      expect(wrapper.emitted('toggle')).toBeTruthy()
      expect(wrapper.emitted('toggle')).toHaveLength(1)
    })

    it('should emit "toggle" event multiple times on successive clicks', async () => {
      const wrapper = createWrapper()
      const button = wrapper.find('.collapse-header')

      await button.trigger('click')
      await button.trigger('click')
      await button.trigger('click')

      expect(wrapper.emitted('toggle')).toHaveLength(3)
    })

    it('should be activated by keyboard (Enter)', async () => {
      const wrapper = createWrapper()
      const button = wrapper.find('.collapse-header')

      await button.trigger('keydown.enter')

      expect(wrapper.emitted('toggle')).toBeTruthy()
    })

    it('should be activated by keyboard (Space)', async () => {
      const wrapper = createWrapper()
      const button = wrapper.find('.collapse-header')

      await button.trigger('keydown.space')

      expect(wrapper.emitted('toggle')).toBeTruthy()
    })
  })

  describe('Slots', () => {
    it('should render empty title slot when not provided', () => {
      const wrapper = createWrapper({}, {
        title: '',
        body: '<p>Body only</p>'
      })

      const titleSlot = wrapper.find('.collapse-header span')
      expect(titleSlot.text()).toBe('')
    })

    it('should render empty body slot when not provided', () => {
      const wrapper = createWrapper({}, {
        title: '<span>Title only</span>',
        body: ''
      })

      const body = wrapper.find('.collapse-body')
      expect(body.text().trim()).toBe('')
    })

    it('should render complex HTML in slots', () => {
      const complexSlots = {
        title: `
          <div class="custom-title">
            <strong>Complex Title</strong>
            <span class="badge">New</span>
          </div>
        `,
        body: `
          <div class="custom-body">
            <h3>Subtitle</h3>
            <p>Paragraph with <a href="#">link</a></p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          </div>
        `
      }

      const wrapper = createWrapper({}, complexSlots)

      expect(wrapper.find('.custom-title').exists()).toBe(true)
      expect(wrapper.find('.custom-body').exists()).toBe(true)
      expect(wrapper.find('.badge').text()).toBe('New')
      expect(wrapper.find('a').attributes('href')).toBe('#')
      expect(wrapper.findAll('li')).toHaveLength(2)
    })
  })

  describe('Accessibility Attributes', () => {
    it('should have correct ARIA attributes when closed', () => {
      const wrapper = createWrapper({ open: false })
      const button = wrapper.find('.collapse-header')

      expect(button.attributes('aria-expanded')).toBe('false')
      expect(button.attributes('aria-label')).toBe('Toggle Collapse')
      expect(button.attributes('type')).toBe('button')
      expect(button.attributes('aria-controls')).toMatch(/^collapse-/)
    })

    it('should have correct ARIA attributes when open', () => {
      const wrapper = createWrapper({ open: true })
      const button = wrapper.find('.collapse-header')

      expect(button.attributes('aria-expanded')).toBe('true')
    })

    it('should have unique ID in collapse-body that matches aria-controls', () => {
      const wrapper = createWrapper()
      const button = wrapper.find('.collapse-header')
      const body = wrapper.find('.collapse-body')

      const ariaControls = button.attributes('aria-controls')
      const bodyId = body.attributes('id')

      expect(ariaControls).toBe(bodyId)
      expect(bodyId).toMatch(/^collapse-/)
    })

    it('should generate unique IDs across multiple instances', () => {
      const wrapper1 = createWrapper()
      const wrapper2 = createWrapper()

      const id1 = wrapper1.find('.collapse-body').attributes('id')
      const id2 = wrapper2.find('.collapse-body').attributes('id')

      expect(id1).not.toBe(id2)
      expect(id1).toMatch(/^collapse-/)
      expect(id2).toMatch(/^collapse-/)
    })
  })
})
