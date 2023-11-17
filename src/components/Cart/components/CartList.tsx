import { Product } from "@prisma/client"
import CartItem from "./CartItem"
import Image from "next/image"
import CartItemProps from "../CartItemProps"

interface Props extends CartItemProps {
  cartItems: Product[]
}

function CartList({ cartItems, handleChangeQuantity, order }: Props) {
  return cartItems.length > 0 ? (
    cartItems.map((item) => (
      <CartItem
        key={item.productId}
        handleChangeQuantity={handleChangeQuantity}
        item={item}
        order={order}
      />
    ))
  ) : (
    <div className='bg-secondary h-96 flex flex-col items-center justify-center'>
      <div className='flex'>
        <Image
          src='/shopping-bag.svg'
          width={100}
          height={100}
          alt='shopping bag'
        />
      </div>
      <div className='mt-2'>
        <p className='text-center text-sm text-gray-500'>
          Your cart is <strong>empty</strong> <br />
          Add products to the cart and make a pucharse!
        </p>
      </div>
    </div>
  )
}
export default CartList
