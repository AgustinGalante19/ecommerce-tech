import Order from "@/types/Order"
import { Product } from "@prisma/client"
import { Button } from "@radix-ui/themes"

interface Props {
  cartItems: Product[]
  totalAmount: number
  handleSubmit: () => void
  isLoading: boolean
  order: Order
}

function PucharseSummary({
  cartItems,
  totalAmount,
  handleSubmit,
  isLoading,
  order,
}: Props) {
  return (
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
            {cartItems.map((item) => (
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
              <Button onClick={handleSubmit} disabled={isLoading}>
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
  )
}
export default PucharseSummary
