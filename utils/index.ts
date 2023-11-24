const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'GBP',
})

const getPaymentDue = (
  date: string,
  paymentTerm: number
) => {
  const dateObject = date ? new Date(date) : new Date(Date.now())
  dateObject.setDate(dateObject.getDate() + paymentTerm)
  return dateObject.toISOString().split('T')[0]
}

const getYYYYmmdd = (date: string) => {
  const dateObject = date ? new Date(date) : new Date(Date.now())
  return dateObject.toISOString().split('T')[0]
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  return ('0' + date.getDate().toString()).slice(-2) + ' ' + months[date.getMonth()] + ' ' + date.getFullYear()
}

const requiredInput = [
  'senderStreet',
  'senderCity',
  'senderPostcode',
  'senderCountry',
  'clientName',
  'clientEmail',
  'clientStreet',
  'clientCity',
  'clientPostcode',
  'clientCountry',
  'createdAt',
  'paymentTerms',
  'description',
  'itemName',
  'itemQuantity',
  'itemPrice'
]

const validateFormInput = (form: HTMLFormElement, requiredInputs: string[] = requiredInput) => {
  let isValid = true
  Array.from(form.elements).forEach((element) => {
      // @ts-ignore
      if (requiredInputs.includes(element.name) && /^(?=\s*$)/.test(element.value))
        isValid = false
    }
  )
  return isValid
}

const randomId = () => {
  let result = ''
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  const letterLength = letters.length
  const numberLength = numbers.length

  for (let i = 0; i < 6; i++) {
    result += i < 2 ? letters.charAt(Math.floor(Math.random() * letterLength)) : numbers.charAt(Math.floor(Math.random() * numberLength))
  }
  return result
}

export {currencyFormatter, getPaymentDue, formatDate, validateFormInput, randomId, getYYYYmmdd}