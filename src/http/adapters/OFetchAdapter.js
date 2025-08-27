import { HttpClient } from '../HttpClient.js'

/**
 * Adapter for oFetch HTTP client
 * Implements the HttpClient interface using oFetch
 */
export class OFetchAdapter extends HttpClient {
  /**
   * Constructor
   * @param {Function} ofetchInstance - Configured oFetch instance
   */
  constructor(ofetchInstance) {
    super()
    this.client = ofetchInstance
  }

  /**
   * Performs a GET request
   * @param {string} url - Request URL
   * @param {object} config - Additional configuration
   * @returns {Promise<any>} - Response data
   */
  async get(url, config = {}) {
    return await this.client(url, {
      method: 'GET',
      ...config
    })
  }

  /**
   * Performs a POST request
   * @param {string} url - Request URL
   * @param {any} data - Data to be sent in the body
   * @param {object} config - Additional configuration
   * @returns {Promise<any>} - Response data
   */
  async post(url, data, config = {}) {
    return await this.client(url, {
      method: 'POST',
      body: data,
      ...config
    })
  }

  /**
   * Performs a PUT request
   * @param {string} url - Request URL
   * @param {any} data - Data to be sent in the body
   * @param {object} config - Additional configuration
   * @returns {Promise<any>} - Response data
   */
  async put(url, data, config = {}) {
    return await this.client(url, {
      method: 'PUT',
      body: data,
      ...config
    })
  }

  /**
   * Performs a PATCH request
   * @param {string} url - Request URL
   * @param {any} data - Data to be sent in the body
   * @param {object} config - Additional configuration
   * @returns {Promise<any>} - Response data
   */
  async patch(url, data, config = {}) {
    return await this.client(url, {
      method: 'PATCH',
      body: data,
      ...config
    })
  }

  /**
   * Performs a DELETE request
   * @param {string} url - Request URL
   * @param {object} config - Additional configuration
   * @returns {Promise<any>} - Response data
   */
  async delete(url, config = {}) {
    return await this.client(url, {
      method: 'DELETE',
      ...config
    })
  }
}
