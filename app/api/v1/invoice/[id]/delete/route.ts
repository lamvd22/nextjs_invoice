import {NextRequest, NextResponse} from 'next/server'
import data from '@/data.json'
import fs from 'fs'

interface Params {
  id: string
}

export async function DELETE(request: NextRequest, {params,}: { params: Params }) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === params.id) {
      data.splice(i, 1)
      break
    }
  }

  let result = {ok: false}
  try {
    fs.writeFileSync('data.json', JSON.stringify(data), 'utf-8')
    result = {ok: true}
  } catch (exception) {
    console.log(exception)
  }

  return new NextResponse(JSON.stringify(result))
}