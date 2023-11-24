interface Props {
  id: string
  name: string
  defaultValue: number
}

const PaymentTerms = ({id, name, defaultValue}: Props) => {
  return (
    <select id={id} name={name} defaultValue={defaultValue} className="input-txt w-full">
      <option value={1}>Net 1 Day</option>
      <option value={7}>Net 7 Days</option>
      <option value={15}>Net 15 Days</option>
      <option value={30}>Net 30 Days</option>
    </select>
  )
}

export default PaymentTerms