import {NextRequest, NextResponse} from 'next/server'
import data from '@/data.json'

export async function GET(request: NextRequest) {
  return new NextResponse(JSON.stringify(data))
}