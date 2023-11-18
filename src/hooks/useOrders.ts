import { useCases } from "@/api/useCases"
import { OrdersWithProducts } from "@/types/Order"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function useOrders() {
  const [orders, setOrders] = useState<OrdersWithProducts[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { data } = useSession()
  useEffect(() => {
    setIsLoading(true)
    if (data?.user?.id) {
      useCases.orders
        .getAll(data?.user?.id)
        .then((response) => {
          setOrders(response.data.data)
        })
        .catch((err) => console.log("Cannot get orders", err))
        .finally(() => setIsLoading(false))
    }
  }, [data?.user?.id])

  return { orders, isLoading }
}
