import { useCartStore } from "@/store/useCartStore"
import Order from "@/types/Order"
import { Product } from "@prisma/client"
import { IconButton } from "@radix-ui/themes"
import { Trash2 } from "lucide-react"
import Image from "next/image"
import { ChangeEvent } from "react"

function CartItem({
  item,
  order,
  handleChangeQuantity,
}: {
  item: Product
  order: Order
  handleChangeQuantity: (e: ChangeEvent<HTMLInputElement>, name: string) => void
}) {
  const { cartItems, removeItem } = useCartStore()

  const handleRemoveItem = (item: Product) => {
    if (order) {
      removeItem(item)
      const newItems = cartItems.filter((i) => i.productId !== item.productId)
      window.localStorage.setItem("cart", JSON.stringify(newItems))
      return delete order[item.name]
    }
  }

  return (
    <div className='w-full bg-secondary grid grid-flow-col grid-cols-2 p-2 rounded-md my-2'>
      <div className='font-semibold flex items-center'>
        <Image
          width={50}
          height={50}
          src={item.images[0]}
          alt={item.name}
          className='mr-2'
        />
        <p>{item.name}</p>
      </div>
      <div className='flex justify-end items-center pr-4'>
        <p className='font-semibold text-primary text-lg mr-2'>${item.price}</p>
        <input
          type='number'
          className='max-w-[50px] mx-2 rounded-md p-1'
          value={order[item.name]?.quantity ?? 0}
          onChange={(e) => handleChangeQuantity(e, item.name)}
        />
        <IconButton onClick={() => handleRemoveItem(item)}>
          <Trash2 size={20} />
        </IconButton>
      </div>
    </div>
  )
}
export default CartItem
