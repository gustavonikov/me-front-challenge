import { describe, it, expect, vi, beforeEach } from 'vitest'
import { HttpClientFactory } from '@/http/HttpClientFactory.js'
import { OrderService } from './OrderService.js'

describe('OrderService', () => {
  let ofetchInstance
  let httpClient
  let service

  beforeEach(() => {
    ofetchInstance = vi.fn()

    httpClient = HttpClientFactory.createOFetch(ofetchInstance)

    service = new OrderService(httpClient)
  })

  it('should call the correct URL when fetching an order by ID (number)', async () => {
    const mockOrder = { id: 1, number: '12345' }
    ofetchInstance.mockResolvedValue(mockOrder)

    const result = await service.fetchOrder(1)

    expect(ofetchInstance).toHaveBeenCalledWith('/orders/1', { method: 'GET' })
    expect(result).toEqual(mockOrder)
  })

  it('should call the correct URL when fetching an order by ID (string)', async () => {
    const mockOrder = { id: 'abc123', number: '12345' }
    ofetchInstance.mockResolvedValue(mockOrder)

    const result = await service.fetchOrder('abc123')

    expect(ofetchInstance).toHaveBeenCalledWith('/orders/abc123', { method: 'GET' })
    expect(result).toEqual(mockOrder)
  })

  it('should throw an error if the request fails', async () => {
    ofetchInstance.mockRejectedValue(new Error('Network Error'))

    await expect(service.fetchOrder(1)).rejects.toThrow('Network Error')
  })
})
