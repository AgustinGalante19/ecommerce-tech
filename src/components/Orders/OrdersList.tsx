import { OrdersWithProducts } from "@/types/Order"
import dayjs from "dayjs"
import { FileText } from "lucide-react"

const OrdersList = ({ orders }: { orders: OrdersWithProducts[] }) => {
  return orders.map((item) => (
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
              {item.products.map((product) => (
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
}

export default OrdersList
