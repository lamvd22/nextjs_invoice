import {useState} from 'react'
import {Item} from '@/types/item'
import Image from 'next/image'

const ItemEditor = ({currentItems,}: { currentItems: Item[] }) => {

  console.log('---items---')

  // Items form is mounted everytime Edit box opens, it's ok to set initial state with props
  const [items, setItems] = useState<Item[]>(currentItems)

  const deleteItem = (index: number) => {
    setItems(items.filter((value, item) => item !== index))
  }

  const addNewItem = (e: any) => {
    const newItems = [...items]
    newItems.push({
      name: '',
      quantity: 1,
      price: 0,
      total: 0
    })
    setItems(newItems)
  }

  const itemList = (
    items.map((item, index) => {
      return (
        <div key={index} className="grid grid-cols-12 gap-3 items-center font-heading">
          <div className="col-span-5">
            <input className="input-txt w-full" type="text" name="itemName" key={item.name} defaultValue={item.name}/>
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
                    onClick={() => deleteItem(index)}>
              <Image src={'/assets/icon-delete.svg'} alt="Delete Icon" width={13} height={16}/>
            </button>
          </div>
        </div>
      )
    })
  )

  return (
    <>
      <div>
        <h3 className="text-[#777e98] mt-8">Item List</h3>
      </div>
      {/* === Item Box ===*/}
      <div className={`grid grid-rows-${items.length + 1} gap-3.5`}>
        <div className="grid grid-cols-12 gap-3 pt-6">
          <div className="col-span-5">Item Name</div>
          <div>Qty.</div>
          <div className="col-span-3">Price</div>
          <div className="col-span-2">Total</div>
          <div className=""></div>
        </div>
        {/* === Items ===*/}
        {itemList}
      </div>
      <div>
        <button type="button" className="btn-gray w-full mt-4"
                onClick={addNewItem}
        >
          Add New Item
        </button>
      </div>
    </>
  )
}

export default ItemEditor