/**
 * Abstract class that defines the contract for HTTP clients
 * All adapters must implement these methods
 */
export class HttpClient {
  /**
   * @param {string} url
   * @param {object} config (headers, params, etc.)
   * @returns {Promise<any>}
   */
  async get(url, config = {}) { // eslint-disable-line
    throw new Error('Method get must be implemented')
  }

  /**
   * @param {string} url
   * @param {any} data
   * @param {object} config
   * @returns {Promise<any>}
   */
  async post(url, data, config = {}) { // eslint-disable-line
    throw new Error('Method post must be implemented')
  }

  /**
   * @param {string} url
   * @param {any} data
   * @param {object} config
   * @returns {Promise<any>}
   */
  async put(url, data, config = {}) { // eslint-disable-line
    throw new Error('Method put must be implemented')
  }

  /**
   * @param {string} url
   * @param {any} data
   * @param {object} config
   * @returns {Promise<any>}
   */
  async patch(url, data, config = {}) { // eslint-disable-line
    throw new Error('Method patch must be implemented')
  }

  /**
   * @param {string} url
   * @param {object} config
   * @returns {Promise<any>}
   */
  async delete(url, config = {}) { // eslint-disable-line
    throw new Error('Method delete must be implemented')
  }
}
