import { describe, it, expect } from 'vitest'
import { normalizeHeader, normalizeSupplier, normalizeAddresses } from './orderNormalizer.js'

describe('Normalizers', () => {
  describe('normalizeHeader', () => {
    it('should normalize header data correctly', () => {
      const input = {
        number: 123,
        serial: 456,
        buyer: 'Test Buyer',
        price: 1000,
        currency: 'USD',
        createdAt: '2020-04-16T12:32:55',
        status: 'Pending',
        contact: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '123456789',
          fax: '987654321'
        }
      }

      const expected = {
        number: 123,
        serial: 456,
        buyer: 'Test Buyer',
        price: 1000,
        currency: 'USD',
        createdAt: '2020-04-16T12:32:55',
        status: 'Pending',
        billingInfo: [{ type: 'name', value: 'John Doe' }],
        communicationInfo: [
          { type: 'email', value: 'john@example.com' },
          { type: 'phone', value: '123456789' },
          { type: 'fax', value: '987654321' }
        ]
      }

      expect(normalizeHeader(input)).toEqual(expected)
    })
  })

  describe('normalizeSupplier', () => {
    it('should normalize supplier data correctly', () => {
      const input = {
        code: 'SUP123',
        name: 'Supplier Inc.',
        document: { type: 'CNPJ', value: '12345678' },
        address: '123 Main St',
        contact: { name: 'Jane Doe', email: 'jane@example.com', phone: '111222333', fax: '333222111' },
        readAt: '2020-04-16T12:32:55'
      }

      const expected = {
        code: 'SUP123',
        name: 'Supplier Inc.',
        billingInfo: [
          { type: 'cnpj', value: '12345678' }, // note o lowercase
          { type: 'address', value: '123 Main St' },
          { type: 'name', value: 'Jane Doe' }
        ],
        communicationInfo: [
          { type: 'email', value: 'jane@example.com' },
          { type: 'phone', value: '111222333' },
          { type: 'fax', value: '333222111' },
          { type: 'readAt', value: '2020-04-16T12:32:55' }
        ]
      }

      expect(normalizeSupplier(input)).toEqual(expected)
    })
  })

  describe('normalizeAddresses', () => {
    it('should normalize an array of addresses correctly', () => {
      const input = [
        {
          label: 'HQ',
          name: 'Company A',
          code: 'C001',
          address: '123 Main St',
          document: { type: 'CNPJ', value: '12345678' },
          contact: { name: 'Alice', email: 'alice@example.com', phone: '11111111', fax: '22222222' },
          readAt: '2020-04-16T12:32:55'
        }
      ]

      const expected = [
        {
          label: 'HQ',
          company: {
            name: 'Company A',
            code: 'C001',
            billingInfo: [
              { type: 'cnpj', value: '12345678' }, // lowercase aqui também
              { type: 'address', value: '123 Main St' },
              { type: 'name', value: 'Alice' }
            ],
            communicationInfo: [
              { type: 'email', value: 'alice@example.com' },
              { type: 'phone', value: '11111111' },
              { type: 'fax', value: '22222222' }
            ]
          }
        }
      ]

      expect(normalizeAddresses(input)).toEqual(expected)
    })
  })
})
