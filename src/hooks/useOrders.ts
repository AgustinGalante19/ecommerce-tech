import { getOrders } from "@/actions/orders"
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
      getOrders(data.user.id)
        .then((response) => setOrders(response))
        .finally(() => setIsLoading(false))
    }
  }, [data?.user?.id])

  return { orders, isLoading }
}
