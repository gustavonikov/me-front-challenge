import { ofetch } from 'ofetch'
import { HttpClientFactory } from '../http/HttpClientFactory.js'

const ofetchInstance = ofetch.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  retry: 2,
})

export const httpClient = HttpClientFactory.createOFetch(ofetchInstance)
