import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import vErrorState from './ErrorState.vue'

describe('ErrorState.vue', () => {
  it('should render with default content', () => {
    const wrapper = mount(vErrorState)

    const image = wrapper.find('.error-image')
    expect(image.exists()).toBe(true)
    expect(image.attributes('src')).toBe('/src/assets/imgs/error_data_failed_dog.png')

    expect(wrapper.find('.error-title').text()).toBe('Oops, something went wrong.')
    expect(wrapper.find('.error-message').text()).toBe("We couldn't load the page data. Please try again later.")

    const retryButton = wrapper.find('.retry-button')
    expect(retryButton.exists()).toBe(true)
    expect(retryButton.text()).toBe('Try again')
  })

  it('should allow content to be overridden with slots', async () => {
    const wrapper = mount(vErrorState, {
      slots: {
        img: '<img src="/custom-error.png" alt="Custom image" class="custom-image" />',
        title: '<h3 class="custom-title">Custom Title</h3>',
        message: '<p class="custom-message">A new custom message.</p>',
        action: '<button class="custom-button">Retry action</button>',
      },
    })

    expect(wrapper.find('.error-image').exists()).toBe(false)
    expect(wrapper.find('.error-title').exists()).toBe(false)
    expect(wrapper.find('.error-message').exists()).toBe(false)
    expect(wrapper.find('.retry-button').exists()).toBe(false)

    const customImage = wrapper.find('.custom-image')
    expect(customImage.exists()).toBe(true)
    expect(customImage.attributes('src')).toBe('/custom-error.png')

    expect(wrapper.find('.custom-title').text()).toBe('Custom Title')
    expect(wrapper.find('.custom-message').text()).toBe('A new custom message.')
    expect(wrapper.find('.custom-button').text()).toBe('Retry action')
  })

  it('should emit a "retry" event when the action button is clicked', async () => {
    const wrapper = mount(vErrorState)
    const retryButton = wrapper.find('.retry-button')

    await retryButton.trigger('click')

    expect(wrapper.emitted('retry')).toBeTruthy()
    expect(wrapper.emitted('retry').length).toBe(1)
  })
})
