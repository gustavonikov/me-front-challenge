import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { useOrder } from './useOrder'
import { API_STATUS } from '@/constants/apiStatus'
import { OrderService } from '@/services/orders/OrderService'
import { normalizeHeader, normalizeSupplier, normalizeAddresses } from './orderNormalizer'

vi.mock('@/services/orders/OrderService', () => ({
  OrderService: vi.fn()
}))

vi.mock('@/config/httpConfig', () => ({
  httpClient: {}
}))

vi.mock('./orderNormalizer', () => ({
  normalizeHeader: vi.fn(),
  normalizeSupplier: vi.fn(),
  normalizeAddresses: vi.fn()
}))

const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

describe('useOrder', () => {
  let orderServiceMock
  let mockOrderData

  beforeEach(() => {
    vi.clearAllMocks()

    orderServiceMock = {
      fetchOrder: vi.fn()
    }
    vi.mocked(OrderService).mockReturnValue(orderServiceMock)

    mockOrderData = {
      header: { id: '123', buyer: 'Test Buyer' },
      supplier: { name: 'Test Supplier', id: '456' },
      addresses: [{ type: 'shipping', street: 'Test Street' }]
    }

    vi.mocked(normalizeHeader).mockReturnValue({ normalized: true, ...mockOrderData.header })
    vi.mocked(normalizeSupplier).mockReturnValue({ normalized: true, ...mockOrderData.supplier })
    vi.mocked(normalizeAddresses).mockReturnValue({ normalized: true, addresses: mockOrderData.addresses })
  })

  afterEach(() => {
    consoleErrorSpy.mockClear()
  })

  it('should initialize with default values', () => {
    const { header, supplier, addresses, status } = useOrder()

    expect(header.value).toEqual({})
    expect(supplier.value).toEqual({})
    expect(addresses.value).toEqual({})
    expect(status.value).toBe(API_STATUS.IDLE)
  })

  it('should create OrderService instance with httpClient', async () => {
    const { httpClient } = await import('@/config/httpConfig')

    useOrder()

    expect(OrderService).toHaveBeenCalledWith(httpClient)
  })

  it('should fetch order successfully', async () => {
    orderServiceMock.fetchOrder.mockResolvedValue(mockOrderData)

    const { header, supplier, addresses, status, fetchOrder } = useOrder()

    await fetchOrder('123')

    expect(orderServiceMock.fetchOrder).toHaveBeenCalledWith('123')
    expect(status.value).toBe(API_STATUS.SUCCESS)
    expect(normalizeHeader).toHaveBeenCalledWith(mockOrderData.header)
    expect(normalizeSupplier).toHaveBeenCalledWith(mockOrderData.supplier)
    expect(normalizeAddresses).toHaveBeenCalledWith(mockOrderData.addresses)
    expect(header.value).toEqual({ normalized: true, ...mockOrderData.header })
    expect(supplier.value).toEqual({ normalized: true, ...mockOrderData.supplier })
    expect(addresses.value).toEqual({ normalized: true, addresses: mockOrderData.addresses })
  })

  it('should set status to PENDING during fetch', async () => {
    let resolveFetch
    orderServiceMock.fetchOrder.mockReturnValue(
      new Promise(resolve => {
        resolveFetch = resolve
      })
    )

    const { status, fetchOrder } = useOrder()

    const fetchPromise = fetchOrder('123')

    expect(status.value).toBe(API_STATUS.PENDING)

    resolveFetch(mockOrderData)
    await fetchPromise

    expect(status.value).toBe(API_STATUS.SUCCESS)
  })

  it('should handle fetch error', async () => {
    const error = new Error('Network error')
    orderServiceMock.fetchOrder.mockRejectedValue(error)

    const { status, fetchOrder } = useOrder()

    await fetchOrder('123')

    expect(status.value).toBe(API_STATUS.ERROR)
    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to fetch order:', error)
  })

  it('should handle null/undefined data from service', async () => {
    orderServiceMock.fetchOrder.mockResolvedValue(null)

    const { header, supplier, addresses, status, fetchOrder } = useOrder()

    await fetchOrder('123')

    expect(status.value).toBe(API_STATUS.SUCCESS)
    expect(header.value).toEqual({})
    expect(supplier.value).toEqual({})
    expect(addresses.value).toEqual({})
    expect(normalizeHeader).not.toHaveBeenCalled()
    expect(normalizeSupplier).not.toHaveBeenCalled()
    expect(normalizeAddresses).not.toHaveBeenCalled()
  })

  it('should accept string id parameter', async () => {
    orderServiceMock.fetchOrder.mockResolvedValue(mockOrderData)

    const { fetchOrder } = useOrder()

    await fetchOrder('abc123')

    expect(orderServiceMock.fetchOrder).toHaveBeenCalledWith('abc123')
  })

  it('should accept number id parameter', async () => {
    orderServiceMock.fetchOrder.mockResolvedValue(mockOrderData)

    const { fetchOrder } = useOrder()

    await fetchOrder(123)

    expect(orderServiceMock.fetchOrder).toHaveBeenCalledWith(123)
  })

  it('should maintain reactive state across multiple calls', async () => {
    const firstOrderData = {
      header: { id: '1', buyer: 'First Buyer' },
      supplier: { name: 'First Supplier' },
      addresses: [{ type: 'shipping' }]
    }

    const secondOrderData = {
      header: { id: '2', buyer: 'Second Buyer' },
      supplier: { name: 'Second Supplier' },
      addresses: [{ type: 'billing' }]
    }

    vi.mocked(normalizeHeader)
      .mockReturnValueOnce({ normalized: true, ...firstOrderData.header })
      .mockReturnValueOnce({ normalized: true, ...secondOrderData.header })

    orderServiceMock.fetchOrder
      .mockResolvedValueOnce(firstOrderData)
      .mockResolvedValueOnce(secondOrderData)

    const { header, fetchOrder } = useOrder()

    await fetchOrder('1')
    expect(header.value.id).toBe('1')

    await fetchOrder('2')
    expect(header.value.id).toBe('2')
  })

  it('should reset status to PENDING on each new fetch', async () => {
    orderServiceMock.fetchOrder.mockResolvedValue(mockOrderData)

    const { status, fetchOrder } = useOrder()

    await fetchOrder('123')
    expect(status.value).toBe(API_STATUS.SUCCESS)

    const fetchPromise = fetchOrder('456')
    expect(status.value).toBe(API_STATUS.PENDING)

    await fetchPromise
    expect(status.value).toBe(API_STATUS.SUCCESS)
  })
})
