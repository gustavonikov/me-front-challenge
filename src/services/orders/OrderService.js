// services/OrderService.js
import { BaseService } from '../../BaseService.js'
import './OrderTypes.js'

export class OrderService extends BaseService {
  constructor(httpClient) {
    super(httpClient, '/orders')
  }

  /**
   * @param {string|number} id - Order ID
   * @returns {Promise<Order>} - Order object
   */
  async fetchOrder(id) {
    return await this.get(`/${id}`)
  }
}
