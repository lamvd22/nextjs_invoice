import {NextRequest, NextResponse} from 'next/server'
import data from '@/data.json'
import fs from 'fs'

interface Params {
  id: string
}

export async function PUT(request: NextRequest, {params,}: { params: Params }) {
  let invoice = null
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === params.id) {
      data[i].status = 'paid'
      invoice = data[i]
      break
    }
  }

  try {
    if (invoice)
      fs.writeFileSync('data.json', JSON.stringify(data), 'utf-8')
  } catch (exception) {
    console.log(exception)
  }

  return new NextResponse(JSON.stringify(invoice))
}