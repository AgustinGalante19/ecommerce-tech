"use client"

import { Loader2 } from "lucide-react"
import OrdersList from "@/components/Orders/OrdersList"
import useOrders from "@/hooks/useOrders"

function Orders() {
  const { isLoading, orders } = useOrders()

  return (
    <div className='pt-4'>
      <h2 className='text-4xl text-primary font-bold mb-2'>Orders</h2>
      <div className='flex flex-col items-center'>
        {!isLoading ? (
          orders.length > 0 ? (
            <OrdersList orders={orders} />
          ) : (
            <div className='p-4'>
              <h4 className='text-gray-400 font-medium text-sm'>
                You don&apos;t have any orders yet.
              </h4>
            </div>
          )
        ) : (
          <div className='flex w-full justify-center h-96 items-center'>
            <Loader2 className='animate-spin text-primary' />
          </div>
        )}
      </div>
    </div>
  )
}
export default Orders
