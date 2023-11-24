import {Item} from './item'

export type Invoice = {
  id: string,
  createdAt: string,
  paymentDue: string,
  description: string,
  paymentTerms: number,
  clientName: string,
  clientEmail: string,
  status: string,
  senderAddress: {
    street: string,
    city: string,
    postCode: string,
    country: string
  },
  clientAddress: {
    street: string,
    city: string,
    postCode: string,
    country: string
  },
  items: Item[],
  total: number
}