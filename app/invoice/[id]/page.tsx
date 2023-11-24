'use client'
import Link from 'next/link'
import LabelStatus from '@/components/Invoice/Label/LabelStatus'
import {currencyFormatter, formatDate} from '@/utils'
import {useEffect, useState} from 'react'
import {Invoice} from '@/types/invoice'
import LoadingScreen from '@/components/common/LoadingScreen'
import ConfirmPopup from '@/components/common/ConfirmPopup'
import EditInvoiceBox from '@/components/Invoice/EditInvoiceBox'
import Image from 'next/image'
import {useRouter} from 'next/navigation'

export default function Detail({params,}: { params: { id: string } }) {

  console.log('---page---')

  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [deleteMode, setDeleteMode] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      console.log('---fetching---')
      const invoiceObject = await (await fetch(`/api/v1/invoice/${params.id}`)).json()
      if (invoiceObject)
        setInvoice(invoiceObject)
      setLoading(false)
    }
    fetchData().catch(error => console.log(error))
  }, []);

  const markAsPaid = async () => {
    if (invoice) {
      try {
        const res = await fetch(`/api/v1/invoice/${params.id}/status`, {method: 'PUT'})
        const resObject = await res.json()
        setInvoice(resObject)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const deleteInvoice = async () => {
    try {
      const response = await fetch(`/api/v1/invoice/${params.id}/delete`, {
        method: 'DELETE'
      })
      const result = await response.json()
      if (result.ok)
        router.push('/')
      else
        // handle error
        alert('There was a problem deleting the invoice.')
    } catch (error) {
      console.log(error)
    }
  }

  const popupMessage = `Are you sure you want to delete invoice #${params.id}? This action cannot be undone.`

  return loading ? (
    <LoadingScreen/>
  ) : (invoice !== null ? (
      <>
        <ConfirmPopup status={deleteMode} message={popupMessage} action={deleteInvoice}
                      cancel={() => setDeleteMode(false)}/>
        {/* =====  Edit Invoice  =====*/}
        {editMode ? <EditInvoiceBox invoice={invoice} setEditMode={setEditMode}
                                    setInvoice={setInvoice}/> : <></>}
        {/* =====  Invoice Details  ===== */}
        <div className="w-[800px]">
          <header>
            <div className="h-[70px] mt-6">
              <Link className="flex h-full items-center" href={'/'}>
                <Image className="inline mr-3.5" src={'/assets/icon-arrow-left.svg'} alt="Icon Arrow Back" width={7}
                       height={10}/>
                <span className="pt-0.5 font-heading">Go back</span>
              </Link>
            </div>
            <div className="items-center h-[70px] grid grid-cols-2 rounded-md dark:bg-[#1f213a] bg-white">
              <div className="flex items-center px-7">
                <span className="mr-3.5">Status</span>
                <LabelStatus status={invoice.status}/>
              </div>
              <div className="flex justify-end">
                <button className={invoice.status === 'paid' ? 'btn-light btn-disabled' : 'btn-light'}
                        onClick={() => setEditMode(true)}
                        disabled={invoice.status === 'paid'}
                >
                  Edit
                </button>
                <button className="btn-danger ml-1.5" type="button"
                        onClick={() => setDeleteMode(true)}
                >
                  Delete
                </button>
                <button
                  className={['paid', 'draft'].includes(invoice.status) ? 'btn-primary ml-1.5 mr-7 btn-disabled' : 'btn-primary ml-1.5 mr-7'}
                  disabled={['paid', 'draft'].includes(invoice.status)}
                  type="button"
                  onClick={markAsPaid}
                >
                  Mark as Paid
                </button>
              </div>
            </div>
          </header>
          <main className="rounded-md bg-white dark:bg-[#1f213a] p-12 mt-4">
            <div className="">
              <div className="grid grid-cols-2 mb-6">
                <div className="">
                  <h3 className="mb-2"><span className="text-[#888eb0]">#</span>{invoice.id}</h3>
                  {invoice.description}
                </div>
                <div className="text-right leading-[19px]">
                  <p>{invoice.senderAddress.street}</p>
                  <p>{invoice.senderAddress.city}</p>
                  <p>{invoice.senderAddress.postCode}</p>
                  <p>{invoice.senderAddress.country}</p>
                </div>
              </div>
              <div className="grid grid-cols-3">
                <div className="grid grid-rows-2">
                  <div className="">
                    Invoice Date
                    <p className="font-heading text-[16px] leading-10">{formatDate(invoice.createdAt)}</p>
                  </div>
                  <div className="">
                    Payment Due
                    <p className="font-heading text-[16px] leading-10">{formatDate(invoice.paymentDue)}</p>
                  </div>
                </div>
                <div className="">
                  Bill To
                  <p className="font-heading text-[16px] leading-10">{invoice.clientName}</p>
                  <div className="leading-[19px]">
                    <p>{invoice.clientAddress.street}</p>
                    <p>{invoice.clientAddress.city}</p>
                    <p>{invoice.clientAddress.postCode}</p>
                    <p>{invoice.clientAddress.country}</p>
                  </div>
                </div>
                <div className="">
                  Send To
                  <p className="font-heading text-[16px] leading-10">{invoice.clientEmail}</p>
                </div>
              </div>
            </div>
            <div className="dark:bg-[#252946] bg-[#F8F8FB] pt-6 mt-10 rounded-md">
              <table className="table-auto w-full overflow-hidden rounded-md">
                <thead>
                <tr className="h-11">
                  <th className="text-left font-normal pl-9">Item Name</th>
                  <th className="text-center font-normal">QTY.</th>
                  <th className="text-right font-normal">Price</th>
                  <th className="text-right font-normal pr-9">Total</th>
                </tr>
                </thead>
                <tbody className="font-heading">
                {invoice.items.map((item, index) => {
                  return (
                    <tr key={index} className="h-11">
                      <td className="text-left pl-9">{item.name}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-right">{currencyFormatter.format(item.price)}</td>
                      <td className="text-right pr-9">{currencyFormatter.format(item.total)}</td>
                    </tr>
                  )
                })}

                <tr className="dark:bg-[#0b0e15] bg-[#888EB0] h-[70px] overflow-x-visible">
                  <td colSpan={3} className="pl-9 font-normal">Amount Due</td>
                  <td
                    className="text-right pr-9 font-heading text-[18px]">{currencyFormatter.format(invoice.total)}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </>
    ) : (
      <div className="flex h-screen items-center justify-center">
        <h3>No record that matches the id</h3>
      </div>
    )
  )
}