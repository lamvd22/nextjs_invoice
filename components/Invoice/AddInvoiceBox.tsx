import ItemAdder from '@/components/Invoice/ItemAdder'
import PaymentTerms from '@/components/common/inputs/PaymentTerms'
import {useEffect} from 'react'
import {validateFormInput} from '@/utils'
import {Invoice} from '@/types/invoice'

interface AddInvoiceProps {
  setInvoices: (invoices: Invoice[]) => void
  setAddMode: (addMode: boolean) => void
}

const AddInvoiceBox = ({setInvoices, setAddMode}: AddInvoiceProps) => {

  console.log('---add box---')

  useEffect(() => {
    const element = document.getElementById('add-box')
    if (element) {
      element.scrollTop = 0
      element.classList.replace('-translate-x-full', 'translate-x-0')
    }
  }, [])

  const discard = () => {
    const element = document.getElementById('add-box')
    if (element) {
      element.parentElement?.classList.add('invisible')
      element.classList.replace('translate-x-0', '-translate-x-full')
    }
    // unmount Add box after slide out effect
    setTimeout(() => {
      setAddMode(false)
    }, 300)
  }

  const saveAndSend = async () => {
    const form = document.forms.namedItem('invoice')
    if (form) {
      if (validateFormInput(form)) {
        try {
          const formData = new FormData(form)
          formData.append('status', 'pending')
          const response = await fetch('/api/v1/invoice', {
            method: 'POST',
            body: formData
          })
          const result = await response.json()
          if (result.status === 'success') {
            setInvoices(result.invoices)
            setAddMode(false)
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        alert('All fields are required!')
      }
    }
  }

  const saveAsDraft = async () => {
    const form = document.forms.namedItem('invoice')
    if (form) {
      try {
        const formData = new FormData(form)
        formData.append('status', 'draft')
        const response = await fetch('/api/save', {
          method: 'POST',
          body: formData
        })
        const result = await response.json()
        if (result.status === 'success') {
          setInvoices(result.invoices)
          setAddMode(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      <div className="flex w-screen left-0 absolute bg-white bg-opacity-70 dark:bg-black dark:bg-opacity-70">
        <div id="add-box"
             className="w-1/2 h-screen dark:bg-[#141625] bg-[#e7e6ed] rounded-r-2xl no-scrollbar overflow-y-auto overflow-x-hidden duration-300 -translate-x-full">
          <div className="ml-[90px] px-10 py-12">
            <h3>New Invoice</h3>
            <form method="POST" name="invoice">
              <section className="grid grid-rows-3 gap-5">
                <div className="pt-10 text-[#7c5df9] font-heading">Bill From</div>
                <div className="">
                  <label className="block mb-1.5" htmlFor="sender-street">Street Address</label>
                  <input className="w-full input-txt" id="sender-street" name="senderStreet" type="text"/>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block mb-1.5" htmlFor="sender-city">City</label>
                    <input className="w-full input-txt" id="sender-city" type="text" name="senderCity"/>
                  </div>
                  <div>
                    <label className="block mb-1.5" htmlFor="sender-postcode">Post Code</label>
                    <input className="w-full input-txt" id="sender-postcode" type="text" name="senderPostcode"/>
                  </div>
                  <div>
                    <label className="block mb-1.5" htmlFor="sender-country">Country</label>
                    <input className="w-full input-txt" id="sender-country" type="text" name="senderCountry"/>
                  </div>
                </div>
              </section>
              <section className="grid grid-rows-3 gap-5">
                <div className="pt-10 text-[#7c5df9] font-heading">Bill To</div>
                <div className="">
                  <label className="block mb-1.5" htmlFor="client-name">Client&#39;s Name</label>
                  <input className="w-full input-txt" id="client-name" type="text" name="clientName"/>
                </div>
                <div className="">
                  <label className="block mb-1.5" htmlFor="client-email">Client&#39;s Email</label>
                  <input className="w-full input-txt" id="client-email" type="text" name="clientEmail"/>
                </div>
                <div className="">
                  <label className="block mb-1.5" htmlFor="client-street">Street Address</label>
                  <input className="w-full input-txt" id="client-street" type="text" name="clientStreet"/>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block mb-1.5" htmlFor="client-city">City</label>
                    <input className="w-full input-txt" id="client-city" type="text" name="clientCity"/>
                  </div>
                  <div>
                    <label className="block mb-1.5" htmlFor="client-postcode">Post Code</label>
                    <input className="w-full input-txt" id="client-postcode" type="text" name="clientPostcode"/>
                  </div>
                  <div>
                    <label className="block mb-1.5" htmlFor="client-country">Country</label>
                    <input className="w-full input-txt" id="client-country" type="text" name="clientCountry"/>
                  </div>
                </div>
              </section>
              <section className="grid grid-rows-2 gap-5 mt-[40px]">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1.5" htmlFor="created-at">Invoice Date</label>
                    <input className="w-full input-txt" id="created-at" type="date" name="createdAt"/>
                  </div>
                  <div>
                    <label className="block mb-1.5" htmlFor="payment-terms">Payment Term</label>
                    <PaymentTerms id={'payment-terms'} name={'paymentTerms'} defaultValue={1}/>
                  </div>
                </div>
                <div className="">
                  <label className="block mb-1.5" htmlFor="description">Project Description</label>
                  <input className="w-full input-txt" id="description" type="text" name="description"/>
                </div>
              </section>
              <section>
                {/* ===== Item Adder ===== */}
                <ItemAdder/>
              </section>
              <section className="flex pt-4 mt-4">
                <div className="w-1/2">
                  <button className="btn-discard" type="reset"
                          onClick={discard}
                  >
                    Discard
                  </button>
                </div>
                <div className="flex w-1/2 justify-end">
                  <button type="button" className="btn-gray mr-4"
                          onClick={saveAsDraft}
                  >
                    Save as Draft
                  </button>
                  <button type="button" className="btn-primary"
                          onClick={saveAndSend}
                  >
                    Save & Send
                  </button>
                </div>
              </section>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddInvoiceBox