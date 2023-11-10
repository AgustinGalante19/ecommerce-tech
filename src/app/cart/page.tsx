"use client"

import { useCartStore } from "@/store/useCartStore"
import { Box, IconButton, TextField } from "@radix-ui/themes"
import cartStyles from "@/styles/cart.module.css"
import Image from "next/image"
import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { Trash2 } from "lucide-react"
import { Product } from "@prisma/client"

/* interface Order {
  product: {
    id: string
    name: string
    price: number
  }
  quantity: number
} */

function CartPage() {
  const { cartItems, removeItem } = useCartStore()
  const [order, setOrder] = useState<any>({})

  const getItems = useCallback(() => {
    cartItems.forEach((item) => {
      setOrder((prevState: any) => ({
        ...prevState,
        [item.name]: {
          quantity: 1,
          ...item,
        },
      }))
    })
  }, [cartItems])

  const handleChangeQuantity = (
    event: ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const { value } = event.target
    setOrder((prevState: any) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        quantity: value,
      },
    }))
  }

  useEffect(() => getItems(), [getItems])

  const handleRemoveItem = (item: Product) => {
    removeItem(item)
    const newItems = cartItems.filter((i) => i.productId !== item.productId)
    window.localStorage.setItem("cart", JSON.stringify(newItems))
    return delete order[item.name]
  }

  return (
    <div className='py-4'>
      <button onClick={() => console.log({ order, cartItems })}>
        see order
      </button>
      <h2 className='text-2xl font-semibold text-primary'>Cart Items</h2>
      <div className={cartStyles["gird-cart"]}>
        <main className='col-span-1'>
          {cartItems.map((item) => (
            <div
              key={item.productId}
              className='w-full bg-secondary grid grid-flow-col grid-cols-2 p-2 rounded-md my-2'
            >
              <div className='font-semibold flex items-center'>
                <Image
                  width={50}
                  height={50}
                  src={item.images[0]}
                  alt={item.name}
                />
                <p>{item.name}</p>
              </div>
              <div className='flex justify-end items-center pr-4'>
                <p className='font-semibold text-primary text-lg mr-2'>
                  ${item.price}
                </p>
                <input
                  type='number'
                  className='max-w-[50px] mx-2 rounded-md p-1'
                  onChange={(e) => handleChangeQuantity(e, item.name)}
                  value={order[item.name]?.quantity}
                />
                <IconButton onClick={() => handleRemoveItem(item)}>
                  <Trash2 size={20} />
                </IconButton>
              </div>
            </div>
          ))}
        </main>
        <aside className='bg-secondary rounded-md p-4'>
          <h3 className='font-medium text-xl'>Resumen de compra</h3>
          {cartItems.map((item) => (
            <div key={item.productId}>
              {item.name} - {order[item.name]?.quantity}
            </div>
          ))}
        </aside>
      </div>
    </div>
  )
}
export default CartPage
