/**
 * Abstract class that defines the contract for HTTP clients
 * All adapters must implement these methods
 */
export class HttpClient {
  /**
   * Performs a GET request
   * @param {string} url - Request URL
   * @param {object} config - Additional configuration (headers, params, etc.)
   * @returns {Promise<any>} - Response data
   */
  async get(url, config = {}) { // eslint-disable-line
    throw new Error('Method get must be implemented')
  }

  /**
   * Performs a POST request
   * @param {string} url - Request URL
   * @param {any} data - Data to be sent in the body
   * @param {object} config - Additional configuration
   * @returns {Promise<any>} - Response data
   */
  async post(url, data, config = {}) { // eslint-disable-line
    throw new Error('Method post must be implemented')
  }

  /**
   * Performs a PUT request
   * @param {string} url - Request URL
   * @param {any} data - Data to be sent in the body
   * @param {object} config - Additional configuration
   * @returns {Promise<any>} - Response data
   */
  async put(url, data, config = {}) { // eslint-disable-line
    throw new Error('Method put must be implemented')
  }

  /**
   * Performs a PATCH request
   * @param {string} url - Request URL
   * @param {any} data - Data to be sent in the body
   * @param {object} config - Additional configuration
   * @returns {Promise<any>} - Response data
   */
  async patch(url, data, config = {}) { // eslint-disable-line
    throw new Error('Method patch must be implemented')
  }

  /**
   * Performs a DELETE request
   * @param {string} url - Request URL
   * @param {object} config - Additional configuration
   * @returns {Promise<any>} - Response data
   */
  async delete(url, config = {}) { // eslint-disable-line
    throw new Error('Method delete must be implemented')
  }
}
