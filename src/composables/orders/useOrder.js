import { computed, ref } from 'vue'
import { OrderService } from '@/services/orders/OrderService'
import { httpClient } from '@/config/httpConfig'
import { API_STATUS } from '@/constants/apiStatus'
import { normalizeAddresses, normalizeHeader, normalizeSupplier } from './orderNormalizer'

export function useOrder() {
  const orderService = new OrderService(httpClient)

  const header = ref({})
  const supplier = ref({})
  const addresses = ref({})
  const status = ref(API_STATUS.IDLE)

  const isPending = computed(() => status.value === API_STATUS.PENDING)
  const wasSuccessful = computed(() => status.value === API_STATUS.SUCCESS)
  const hasError = computed(() => status.value === API_STATUS.ERROR)

  /**
   * @param {string|number} id
   */
  async function fetchOrder(id) {
    status.value = API_STATUS.PENDING

    try {
      const data = await orderService.fetchOrder(id)

      if (data) {
        header.value = normalizeHeader(data.header)
        supplier.value = normalizeSupplier(data.supplier)
        addresses.value = normalizeAddresses(data.addresses)
      }

      status.value = API_STATUS.SUCCESS
    } catch (err) {
      status.value = API_STATUS.ERROR
      console.error('Failed to fetch order:', err)
    }
  }

  return {
    header,
    supplier,
    addresses,
    status,
    isPending,
    wasSuccessful,
    hasError,
    fetchOrder,
  }
}
