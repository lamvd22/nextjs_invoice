'use client'
import Link from 'next/link'
import LabelStatus from '@/components/Invoice/Label/LabelStatus'
import {currencyFormatter, formatDate} from '@/utils'
import Image from 'next/image'
import {useEffect, useState} from 'react'
import {Invoice} from '@/types/invoice'
import LoadingScreen from '@/components/common/LoadingScreen'
import AddInvoiceBox from '@/components/Invoice/AddInvoiceBox'

export default function Invoices() {

  console.log('-----')

  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [addMode, setAddMode] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      console.log('---fetching---')
      const response = await fetch('/api/v1/host/invoices', {cache: 'no-store'})
      const data = await response.json()
      setInvoices(data)
      setLoading(false)
    }
    fetchData().catch(error => console.log(error))
  }, [])

  const invoiceList = invoices.length ? (
    <>
      {invoices.map((item, index) => {
        return (
          <div key={index} className="w-full h-16 flex bg-white rounded-md mb-3 dark:bg-[#1f213a]">
            <div className="w-[140px] flex justify-center items-center">
              <h4><span className="text-[#A8AAB6]">#</span>{item.id}</h4>
            </div>
            <div className="w-[170px] flex justify-center text-[#A8AAB6]  items-center">
              Due {formatDate(item.paymentDue)}
            </div>
            <div className="w-[140px] flex justify-start text-[#A8AAB6]  items-center">
              {item.clientName}
            </div>
            <div className="w-[150px] flex justify-end items-center">
              <h3>{currencyFormatter.format(item.total)}</h3>
            </div>
            <div className="w-[150px] flex justify-center font-bold items-center">
              <LabelStatus status={item.status}/>
            </div>
            <div className="w-[50px]">
              <Link className="w-full h-full flex justify-center items-center" href={`/invoice/${item.id}`}>
                <Image src={'/assets/icon-arrow-right.svg'} alt={'Icon row right'} width={7} height={10}/>
              </Link>
            </div>
          </div>
        )
      })}
    </>
  ) : (
    <>
      <div className="flex items-center justify-center">
        <div className="text-center">
          <Image src={'/assets/illustration-empty.svg'} width={242} height={200} alt="Empty Invoice Illustration"/>
          <h2 className="py-6 mt-6">There is nothing here</h2>
          <p>Create an invoice by clicking</p>
          <p><span className="font-heading">New Invoice</span> button and get started</p>
        </div>
      </div>
    </>
  )

  const addInvoiceBox = addMode ?
    <AddInvoiceBox setInvoices={setInvoices} setAddMode={setAddMode}/> : <></>

  return loading ? (
    <LoadingScreen/>
  ) : (
    <>
      {/* -- Add Invoice -- */}
      {addInvoiceBox}
      {/* -- Invoice List --*/}
      <div className="w-[800px]">
        <header className="my-[60px]">
          <div className="grid grid-cols-12">
            <div className="col-span-8 body1">
              <h1>Invoices</h1>
              <p className="mt-2">
                {invoices.length ? `There are total ${invoices.length} invoices` : 'No invoices'}
              </p>
            </div>
            <div className="flex col-span-2 items-center justify-start">
              <h4>Filter by status</h4>
              <Image className="ml-3" src={'/assets/icon-arrow-down.svg'} alt={'Arrow down icon'} width={11}
                     height={7}/>
            </div>
            <div className="flex col-span-2 items-center justify-end">
              <button className="btn-icon-primary inline-flex items-center float-right"
                      onClick={() => setAddMode(true)}
              >
                <Image className="fill-current block p-[9px] rounded-full bg-white" width={28} height={28}
                       alt="Icon plus" src={'/assets/icon-plus.svg'}/>
                <span>New Invoice</span>
              </button>
            </div>
          </div>
        </header>
        <main>
          {invoiceList}
        </main>
      </div>
    </>
  )
}