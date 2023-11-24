import {useState} from 'react'
import {Item} from '@/types/item'

const ItemAdder = () => {

  const [items, setItems] = useState<Item[]>([])

  const deleteItem = (e: any, index: number) => {
    e.preventDefault()
    setItems(items.filter((value, item) => item !== index))
  }

  const addNewItem = (e: any) => {
    e.preventDefault()
    const newItems = [...items]
    newItems.push({
      name: '',
      quantity: 1,
      price: 0,
      total: 0
    })
    setItems(newItems)
  }
  return (
    <>
      <h3 className="text-[#777e98] mt-8">Item List</h3>
      <div className={`grid grid-rows-${items.length + 1} gap-3.5`}>
        <div className="grid grid-cols-12 gap-3 pt-6">
          <div className="col-span-5">Item Name</div>
          <div>Qty.</div>
          <div className="col-span-3">Price</div>
          <div className="col-span-2">Total</div>
          <div className=""></div>
        </div>
        {items.map((item, index) => {
          return (
            <div key={index} about={index.toString()}
                 className="grid grid-cols-12 gap-3 items-center font-heading">
              <div className="col-span-5">
                <input className="input-txt w-full" type="text" name="itemName" key={item.name}
                       defaultValue={item.name}/>
              </div>
              <div>
                <input className="input-txt w-full px-2 text-center" min={1} type="number" name="itemQuantity"
                       key={item.quantity} defaultValue={item.quantity}/>
              </div>
              <div className="col-span-3">
                <input className="input-txt w-full" type="number" min="0.01" max="9999999999.99" step="0.01"
                       pattern="^[0-9]{1,2}([,][0-9]{1,2})?$" name="itemPrice" key={item.price}
                       defaultValue={item.price}/>
              </div>
              <div className="col-span-2">{item.total}</div>
              <div className="">
                <button type="button"
                        onClick={(e) => deleteItem(e, index)}>
                  <svg width="13" height="16" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
                      fill="#888EB0" fillRule="nonzero"/>
                  </svg>
                </button>
              </div>
            </div>
          )
        })}
      </div>
      <button className="btn-gray w-full mt-4"
              onClick={addNewItem}
      >
        Add New Item
      </button>
    </>
  )
}

export default ItemAdder