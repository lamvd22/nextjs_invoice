import PaymentTerms from '@/components/common/inputs/PaymentTerms'
import ItemEditor from '@/components/Invoice/ItemEditor'
import {Invoice} from '@/types/invoice'
import {validateFormInput} from '@/utils'
import {useEffect} from 'react'

interface Props {
  setEditMode: (editMode: boolean) => void;
  invoice: Invoice;
  setInvoice: (invoice: Invoice) => void;
}

const EditInvoiceBox = ({setEditMode, invoice, setInvoice,}: Props) => {

  console.log('---edit box ---')

  // Edit box slides in after being mounted to the DOM
  useEffect(() => {
    const element = document.getElementById('edit-box')
    if (element) {
      element.scrollTop = 0
      const boxClass = element?.classList
      boxClass.replace('-translate-x-full', 'translate-x-0')
    }
  }, []);

  // hide current Edit box then re-render page without Edit box
  const exitEditMode = () => {
    const element = document.getElementById('edit-box')
    if (element) {
      // unmount Edit box in 300ms
      setTimeout(() => {
        setEditMode(false)
      }, 300)
      const boxClass = element.classList
      element.parentElement?.classList.add('invisible')
      boxClass.replace('translate-x-0', '-translate-x-full')
    }
  }

  const saveChanges = async (e: any) => {
    e.preventDefault()
    if (invoice) {
      if (validateFormInput(e.target)) {
        try {
          const formData = new FormData(e.target)
          formData.append('id', invoice.id)
          formData.append('status', invoice.status === 'draft' ? 'pending' : invoice.status)
          const res = await fetch('/api/v1/invoice', {
            method: 'PUT',
            body: formData
          })
          const resObject = await res.json()
          setInvoice(resObject)
          setEditMode(false)
        } catch (error) {
          console.log(error)
        }
      } else {
        alert('All fields are required!')
      }
    }
  }

  return (
    <>
      <div
        className="flex w-screen left-0 absolute bg-white bg-opacity-70 dark:bg-black dark:bg-opacity-70">
        <div id="edit-box"
             className="w-1/2 pr-1/2 h-screen dark:bg-[#141625] bg-[#e7e6ed] rounded-r-2xl no-scrollbar overflow-y-auto overflow-x-hidden duration-300 -translate-x-full">
          <div id="abc" className="ml-[90px] px-10 py-12">
            <h3 className="translate-x-6 duration-500">Edit <span className="text-[#888eb0]">#</span>{invoice.id}</h3>
            <form onSubmit={saveChanges}>
              <section className="grid grid-rows-3 gap-5">
                <div className="pt-10 text-[#7c5df9] font-heading">Bill From</div>
                <div className="">
                  <label className="block mb-1.5" htmlFor="sender-street">Street Address</label>
                  <input className="w-full input-txt" id="sender-street" name="senderStreet" type="text"
                         defaultValue={invoice.senderAddress.street}/>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block mb-1.5" htmlFor="sender-city">City</label>
                    <input className="w-full input-txt" id="sender-city" type="text" name="senderCity"
                           defaultValue={invoice.senderAddress.city}/>
                  </div>
                  <div>
                    <label className="block mb-1.5" htmlFor="sender-postcode">Post Code</label>
                    <input className="w-full input-txt" id="sender-postcode" type="text" name="senderPostcode"
                           defaultValue={invoice.senderAddress.postCode}/>
                  </div>
                  <div>
                    <label className="block mb-1.5" htmlFor="sender-country">Country</label>
                    <input className="w-full input-txt" id="sender-country" type="text" name="senderCountry"
                           defaultValue={invoice.senderAddress.country}/>
                  </div>
                </div>
              </section>
              <section className="grid grid-rows-3 gap-5">
                <div className="pt-10 text-[#7c5df9] font-heading">Bill To</div>
                <div className="">
                  <label className="block mb-1.5" htmlFor="client-name">Client&#39;s Name</label>
                  <input className="w-full input-txt" id="client-name" type="text" name="clientName"
                         defaultValue={invoice.clientName}/>
                </div>
                <div className="">
                  <label className="block mb-1.5" htmlFor="client-email">Client&#39;s Email</label>
                  <input className="w-full input-txt" id="client-email" type="text" name="clientEmail"
                         defaultValue={invoice.clientEmail}/>
                </div>
                <div className="">
                  <label className="block mb-1.5" htmlFor="client-street">Street Address</label>
                  <input className="w-full input-txt" id="client-street" type="text" name="clientStreet"
                         defaultValue={invoice.clientAddress.street}/>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block mb-1.5" htmlFor="client-city">City</label>
                    <input className="w-full input-txt" id="client-city" type="text" name="clientCity"
                           defaultValue={invoice.clientAddress.city}/>
                  </div>
                  <div>
                    <label className="block mb-1.5" htmlFor="client-postcode">Post Code</label>
                    <input className="w-full input-txt" id="client-postcode" type="text" name="clientPostcode"
                           defaultValue={invoice.clientAddress.postCode}/>
                  </div>
                  <div>
                    <label className="block mb-1.5" htmlFor="client-country">Country</label>
                    <input className="w-full input-txt" id="client-country" type="text" name="clientCountry"
                           defaultValue={invoice.clientAddress.country}/>
                  </div>
                </div>
              </section>
              <section className="grid grid-rows-2 gap-5 mt-[40px]">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1.5" htmlFor="created-at">Invoice Date</label>
                    <input className="w-full input-txt" id="created-at" type="date" name="createdAt"
                           defaultValue={invoice.createdAt}/>
                  </div>
                  <div>
                    <label className="block mb-1.5" htmlFor="payment-terms">Payment Term</label>
                    <PaymentTerms id={'payment-terms'} name={'paymentTerms'} defaultValue={invoice.paymentTerms}/>
                  </div>
                </div>
                <div className="">
                  <label className="block mb-1.5" htmlFor="description">Project Description</label>
                  <input className="w-full input-txt" id="description" type="text" name="description"
                         defaultValue={invoice.description}/>
                </div>
              </section>
              <section>
                {/* ===== Item Editor ===== */}
                <ItemEditor currentItems={invoice.items} />
              </section>
              <section className="flex justify-end pt-4 mt-4">
                <button type="button" className="btn-gray mr-4"
                        onClick={exitEditMode}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">Save Changes</button>
              </section>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditInvoiceBox