import { useCases } from "@/api/useCases"
import { useCartStore } from "@/store/useCartStore"
import AlertProps from "@/types/AlertProps"
import Order, { OrderRequest } from "@/types/Order"
import { useSession } from "next-auth/react"
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react"

export default function useCart() {
  const { cartItems, clearCart } = useCartStore()
  const [order, setOrder] = useState<Order>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showAlert, setShowAlert] = useState<AlertProps>({
    type: "success",
    isOpen: false,
    message: "",
  })

  const closeAlert = () => setShowAlert({ ...showAlert, isOpen: false })

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
      return setOrder((prevState) => ({
        ...prevState,
        [key]: {
          ...prevState[key],
          quantity: 0,
        },
      }))
    }
    setOrder((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        quantity: Number(value),
      },
    }))
  }

  const totalAmount = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      if (order[item.name]?.quantity <= 0) return 0

      return acc + item.price * order[item.name]?.quantity
    }, 0)
  }, [cartItems, order])

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
    useCases.orders
      .create({
        request,
        total: totalAmount,
        userId: sessionData?.user?.id ?? "",
      })
      .then((response) => {
        if (response.data.result === "ok") {
          setShowAlert({
            isOpen: true,
            message: `Order #${response.data.data[0].id}  generated successfully`,
            type: "success",
          })
          clearCart()
          return globalThis.localStorage.removeItem("cart")
        }
        return setShowAlert({
          isOpen: true,
          message: response.data.error[0],
          type: "error",
        })
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
  useEffect(() => getItems(), [getItems])

  return {
    showAlert,
    cartItems,
    handleChangeQuantity,
    handleSubmitOrder,
    isLoading,
    order,
    totalAmount,
    closeAlert,
  }
}
