"use client"

import cartStyles from "@/styles/cart.module.css"
import PucharseSummary from "@/components/Cart/PucharseSummary"
import CartList from "@/components/Cart/CartList"
import useCart from "@/hooks/useCart"
import Alert from "@/components/Alert"

function CartPage() {
  const {
    cartItems,
    handleChangeQuantity,
    handleSubmitOrder,
    isLoading,
    order,
    showAlert,
    totalAmount,
    closeAlert,
  } = useCart()
  return (
    <div className='py-4'>
      <h2 className='text-2xl font-semibold text-primary'>Cart Items</h2>
      {showAlert.isOpen && (
        <Alert
          variant={showAlert.type}
          message={showAlert.message}
          onClose={closeAlert}
        />
      )}
      <div className={cartStyles["grid-cart"]}>
        <main className='col-span-1'>
          <CartList
            cartItems={cartItems}
            handleChangeQuantity={handleChangeQuantity}
            order={order}
          />
        </main>
        <PucharseSummary
          cartItems={cartItems}
          handleSubmit={handleSubmitOrder}
          isLoading={isLoading}
          order={order}
          totalAmount={totalAmount}
        />
      </div>
    </div>
  )
}
export default CartPage
