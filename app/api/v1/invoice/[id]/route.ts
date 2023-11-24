import {NextRequest, NextResponse} from 'next/server'
import data from '@/data.json'

export async function GET(
  request: NextRequest,
  {params}: { params: { id: string } }
) {
  // console.log(params.id)
  let invoiceObject = null
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === params.id) {
      invoiceObject = data[i]
      break
    }
  }
  return new NextResponse(JSON.stringify(invoiceObject))
}