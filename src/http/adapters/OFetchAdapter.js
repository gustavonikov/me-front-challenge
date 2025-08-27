import { HttpClient } from '../HttpClient.js'

/**
 * Adapter for oFetch HTTP client
 * Implements the HttpClient interface using oFetch
 */
export class OFetchAdapter extends HttpClient {
  /**
   * Constructor
   * @param {Function} ofetchInstance
   */
  constructor(ofetchInstance) {
    super()
    this.client = ofetchInstance
  }

  /**
   * @param {string} url
   * @param {object} config
   * @returns {Promise<any>}
   */
  async get(url, config = {}) {
    return await this.client(url, {
      method: 'GET',
      ...config
    })
  }

  /**
   * @param {string} url
   * @param {any} data
   * @param {object} config
   * @returns {Promise<any>}
   */
  async post(url, data, config = {}) {
    return await this.client(url, {
      method: 'POST',
      body: data,
      ...config
    })
  }

  /**
   * @param {string} url
   * @param {any} data
   * @param {object} config
   * @returns {Promise<any>}
   */
  async put(url, data, config = {}) {
    return await this.client(url, {
      method: 'PUT',
      body: data,
      ...config
    })
  }

  /**
   * @param {string} url
   * @param {any} data
   * @param {object} config
   * @returns {Promise<any>}
   */
  async patch(url, data, config = {}) {
    return await this.client(url, {
      method: 'PATCH',
      body: data,
      ...config
    })
  }

  /**
   * @param {string} url
   * @param {object} config
   * @returns {Promise<any>}
   */
  async delete(url, config = {}) {
    return await this.client(url, {
      method: 'DELETE',
      ...config
    })
  }
}
