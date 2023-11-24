import {NextRequest, NextResponse} from 'next/server'
import data from '@/data.json'
import {getPaymentDue, randomId, getYYYYmmdd} from '@/utils'
import fs from 'fs'

export async function PUT(request: NextRequest) {
  const formData = await request.formData()

  const itemName = formData.getAll('itemName')
  const itemQuantity = formData.getAll('itemQuantity')
  const itemPrice = formData.getAll('itemPrice')
  const items = []
  let total = 0
  for (let i = 0; i < itemName.length; i++) {
    let subTotal = Number(itemQuantity[i]) * Number(itemPrice[i])
    total += subTotal
    items.push(
      {
        name: itemName[i],
        quantity: Number(itemQuantity[i]),
        price: Number(itemPrice[i]),
        total: subTotal
      }
    )
  }

  const invoice = {
    id: formData.get('id'),
    createdAt: formData.get('createdAt'),
    paymentDue: getPaymentDue(String(formData.get('createdAt')), Number(formData.get('paymentTerms'))),
    description: formData.get('description'),
    paymentTerms: Number(formData.get('paymentTerms')),
    clientName: formData.get('clientName'),
    clientEmail: formData.get('clientEmail'),
    status: formData.get('status'),
    senderAddress: {
      street: formData.get('senderStreet'),
      city: formData.get('senderCity'),
      postCode: formData.get('senderPostcode'),
      country: formData.get('senderCountry')
    },
    clientAddress: {
      street: formData.get('clientStreet'),
      city: formData.get('clientCity'),
      postCode: formData.get('clientPostcode'),
      country: formData.get('clientCountry')
    },
    items: items,
    total: total
  }

  for (let i = 0; i < data.length; i++) {
    if (data[i].id === formData.get('id')) {
      // @ts-ignore
      data[i] = invoice
      break
    }
  }
  fs.writeFileSync('data.json', JSON.stringify(data), 'utf-8')
  return new NextResponse(JSON.stringify(invoice))
}

export async function POST(request: Request) {
  const formData = await request.formData()

  const itemName = formData.getAll('itemName')
  const itemQuantity = formData.getAll('itemQuantity')
  const itemPrice = formData.getAll('itemPrice')
  const items = []
  let total = 0
  for (let i = 0; i < itemName.length; i++) {
    let subTotal = Number(itemQuantity[i]) * Number(itemPrice[i])
    total += subTotal
    items.push(
      {
        name: itemName[i],
        quantity: Number(itemQuantity[i]),
        price: Number(itemPrice[i]),
        total: subTotal
      }
    )
  }

  const invoice = {
    id: randomId(),
    createdAt: getYYYYmmdd(String(formData.get('createdAt'))),
    paymentDue: getPaymentDue(String(formData.get('createdAt')), Number(formData.get('paymentTerms'))),
    description: formData.get('description'),
    paymentTerms: Number(formData.get('paymentTerms')),
    clientName: formData.get('clientName'),
    clientEmail: formData.get('clientEmail'),
    status: formData.get('status'),
    senderAddress: {
      street: formData.get('senderStreet'),
      city: formData.get('senderCity'),
      postCode: formData.get('senderPostcode'),
      country: formData.get('senderCountry')
    },
    clientAddress: {
      street: formData.get('clientStreet'),
      city: formData.get('clientCity'),
      postCode: formData.get('clientPostcode'),
      country: formData.get('clientCountry')
    },
    items: items,
    total: total
  }

  // @ts-ignore
  data.push(invoice)

  let response

  try {
    fs.writeFileSync('data.json', JSON.stringify(data), 'utf-8')
    response = {
      status: 'success',
      invoices: data
    }
  } catch (error) {
    console.log(error)
    response = {
      status: 'failure',
      invoices: []
    }
  }

  return new NextResponse(JSON.stringify(response))
}

export async function OPTIONS(request: Request) {
  const allowedOrigin = request.headers.get('origin')
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin || "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
      "Access-Control-Max-Age": "86400",
    },
  })
}