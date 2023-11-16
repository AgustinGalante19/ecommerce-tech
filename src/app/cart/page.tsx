"use client"

import { useCartStore } from "@/store/useCartStore"
import { Button, Callout, Flex, IconButton } from "@radix-ui/themes"
import cartStyles from "@/styles/cart.module.css"
import Image from "next/image"
import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { Trash2, X } from "lucide-react"
import { Order as OrderPr } from "@prisma/client"
import { Product } from "@prisma/client"
import Order, { OrderRequest } from "@/types/Order"
import api from "@/api"
import { useSession } from "next-auth/react"

function CartPage() {
  const { cartItems, removeItem, clearCart } = useCartStore()
  const [order, setOrder] = useState<Order>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showAlert, setShowAlert] = useState<{
    type: "success" | "error"
    isOpen: boolean
    message: string
  }>({
    type: "success",
    isOpen: false,
    message: "",
  })

  const { data: sessionData } = useSession()
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
    if (Number(value) <= 0) {
      return setOrder((prevState: any) => ({
        ...prevState,
        [key]: {
          ...prevState[key],
          quantity: 0,
        },
      }))
    }
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
    if (order) {
      removeItem(item)
      const newItems = cartItems.filter((i) => i.productId !== item.productId)
      window.localStorage.setItem("cart", JSON.stringify(newItems))
      return delete order[item.name]
    }
  }

  const totalAmount = cartItems.reduce((acc, item) => {
    if (order[item.name]?.quantity <= 0) return 0

    return acc + item.price * order[item.name]?.quantity
  }, 0)

  const handleSubmitOrder = async () => {
    const request: OrderRequest[] = Object.keys(order).map((itemKey) => ({
      productId: order[itemKey].productId,
      name: order[itemKey].name,
      price: order[itemKey].price,
      quantity: order[itemKey].quantity,
      userId: sessionData?.user?.id as string,
      categoryId: order[itemKey].category.categoryId,
    }))
    setIsLoading(true)
    api
      .post<ApiResponse<OrderPr>>(
        "/order",
        { products: request },
        {
          headers: {
            userId: sessionData?.user?.id,
          },
        }
      )
      .then((response) => {
        setShowAlert({
          isOpen: true,
          message: `Order #${response.data.data[0].id}  generated successfully`,
          type: "success",
        })
        clearCart()
        globalThis.localStorage.removeItem("cart")
      })
      .catch((err) => {
        console.log("error on creating the order", err)
        setShowAlert({
          isOpen: true,
          message: "Error on creating the order, please try again later.",
          type: "error",
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const Alert = ({
    onClose,
    variant,
    message,
  }: {
    onClose?: () => void
    variant: "success" | "error"
    message?: string
  }) => {
    {
    }
    return (
      <div
        className={`flex w-full p-4 rounded-md my-2 bg-opacity-20 ${
          variant === "success" ? "bg-[#40c057]" : "bg-[#fa5252]"
        }`}
      >
        <div className='flex justify-between w-full'>
          <div>
            <p
              className={`font-semibold ${
                variant === "success" ? "text-green-500" : "text-red-600"
              }`}
            >
              {message}
            </p>
          </div>
          <button onClick={onClose}>
            <X
              size={16}
              color={
                variant === "success" ? "rgb(34 197 94)" : "rgb(220 38 38)"
              }
            />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='py-4'>
      <h2 className='text-2xl font-semibold text-primary'>Cart Items</h2>
      {showAlert.isOpen && (
        <Alert
          variant={showAlert.type}
          message={showAlert.message}
          onClose={() => setShowAlert({ ...showAlert, isOpen: false })}
        />
      )}
      <div className={cartStyles["grid-cart"]}>
        <main className='col-span-1'>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
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
                    className='mr-2'
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
          )}
        </main>
        <aside className='bg-secondary rounded-md'>
          <div className='px-4 py-4 border-b'>
            <h3
              className={`font-medium text-xl ${
                cartItems.length > 0 ? "text-black" : "text-gray-500"
              }`}
            >
              Purchase summary
            </h3>
          </div>
          <div className='px-4 py-2'>
            {cartItems.length > 0 ? (
              <div>
                {cartItems.map((item: any) => (
                  <div
                    key={item.productId}
                    className='flex justify-between text-sm text-gray-700 font-semibold my-2'
                  >
                    <div>
                      <span>{item.name}</span>
                    </div>
                    <div>
                      <span>x{order[item.name]?.quantity}</span>
                    </div>
                  </div>
                ))}
                <div className='flex justify-between mt-4'>
                  <p className='text-xl font-bold text-primary'>
                    Total: ${totalAmount}
                  </p>
                  <Button onClick={handleSubmitOrder} disabled={isLoading}>
                    Confirm
                  </Button>
                </div>
              </div>
            ) : (
              <p className='text-sm text-gray-500'>
                Here will be displayed the total amount and the details of the
                products on the cart
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
export default CartPage
