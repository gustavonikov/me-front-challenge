import { OFetchAdapter } from './adapters/OFetchAdapter.js'

/**
 * Factory class to create HTTP client adapters
 * Provides static methods to easily instantiate different HTTP clients
 */
export class HttpClientFactory {
  /**
   * Creates an oFetch adapter instance
   * @param {Function} ofetchInstance - Configured oFetch instance
   * @returns {OFetchAdapter} - oFetch adapter instance
   */
  static createOFetch(ofetchInstance) {
    if (!ofetchInstance) {
      throw new Error('ofetchInstance is required')
    }
    return new OFetchAdapter(ofetchInstance)
  }
}
