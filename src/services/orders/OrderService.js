import { BaseService } from '../BaseService.js'
import './OrderTypes.js'

export class OrderService extends BaseService {
  constructor(httpClient) {
    super(httpClient, '/orders')
  }

  /**
   * @param {string|number} id
   * @returns {Promise<Order>}
   */
  async fetchOrder(id) {
    return await this.get(`/${id}`)
  }
}
