"use client"

import { Order, ProductOrder } from "@prisma/client"
import dayjs from "dayjs"
import { FileText } from "lucide-react"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useCases } from "@/api/useCases"

function Orders() {
  const [orders, setOrders] = useState<Order[]>([])
  const { data } = useSession()
  useEffect(() => {
    useCases.orders.getAll(data?.user?.id ?? "").then((response) => {
      setOrders(response.data.data)
    })
  }, [data?.user?.id])

  return (
    <div className='pt-4'>
      <h2 className='text-4xl text-primary font-bold mb-2'>Orders</h2>
      <div className='flex flex-col items-center'>
        {orders.length > 0 ? (
          orders.map((item) => (
            <div
              key={item.id}
              className='bg-secondary p-4 max-sm:p-2 rounded-md my-2 lg:w-[570px]'
            >
              <div className='mb-1 flex justify-between'>
                <span className='font-medium'>
                  {dayjs(item.createdAt).format("MMM DD HH:mm")}
                </span>
                <span className='ml-2 text-xs text-gray-400'>#{item.id}</span>
              </div>
              <div className='flex justify-between'>
                <div className='flex gap-4'>
                  <div className='items-center justify-center flex max-w-[50px]'>
                    <FileText />
                  </div>
                  <div>
                    <ul>
                      {item.products.map((product: ProductOrder) => (
                        <li
                          key={`${item.id}-${product.productId}`}
                          className='text-sm text-gray-500'
                        >
                          {product.name} x{product.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className='font-semibold text-primary my-auto justify-self-end'>
                  ${item.total}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='p-4'>
            <h4 className='text-gray-400 font-medium text-sm'>
              You don&apos;t have any orders yet.
            </h4>
          </div>
        )}
      </div>
    </div>
  )
}
export default Orders
