import { HttpClient } from '../http/HttpClient.js'

/**
 * Base class for all services
 * Provides common functionality and HTTP client injection
 */
export class BaseService {
  /**
   * Constructor
   * @param {HttpClient} httpClient - HTTP client instance (must implement HttpClient interface)
   * @param {string} baseEndpoint - Base endpoint for this service (e.g., '/users', '/products')
   */
  constructor(httpClient, baseEndpoint = '') {
    if (!(httpClient instanceof HttpClient)) {
      throw new Error('httpClient must be an instance of HttpClient')
    }

    /**
     * @type {HttpClient}
     */
    this.http = httpClient

    /**
     * @type {string}
     */
    this.baseEndpoint = baseEndpoint
  }

  /**
   * @param {string} path
   * @returns {string}
   */
  getUrl(path = '') {
    return `${this.baseEndpoint}${path}`
  }

  /**
   * @param {string} path
   * @param {object} config
   * @returns {Promise<any>}
   */
  async get(path = '', config = {}) {
    return await this.http.get(this.getUrl(path), config)
  }

  /**
   * @param {string} path 
   * @param {any} data
   * @param {object} config
   * @returns {Promise<any>}
   */
  async post(path = '', data, config = {}) {
    return await this.http.post(this.getUrl(path), data, config)
  }

  /**
   * @param {string} path
   * @param {any} data 
   * @param {object} config
   * @returns {Promise<any>}
   */
  async put(path = '', data, config = {}) {
    return await this.http.put(this.getUrl(path), data, config)
  }

  /**
   * @param {string} path
   * @param {any} data
   * @param {object} config
   * @returns {Promise<any>}
   */
  async patch(path = '', data, config = {}) {
    return await this.http.patch(this.getUrl(path), data, config)
  }

  /**
   * @param {string} path
   * @param {object} config
   * @returns {Promise<any>}
   */
  async delete(path = '', config = {}) {
    return await this.http.delete(this.getUrl(path), config)
  }
}
