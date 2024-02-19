import { useCartStore } from "@/store/useCartStore"
import ProductWithCategory from "@/types/ProductWithCategory"
import { Product } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useMemo } from "react"

export default function useProduct({
  product,
}: {
  product: ProductWithCategory
}) {
  const { push } = useRouter()
  const { status } = useSession()

  const { addItem, cartItems, removeItem } = useCartStore()

  const isAlreadyOnTheCart = useMemo(
    () => cartItems.find((e) => e.productId === product?.productId),
    [cartItems, product.productId]
  )
  const handleClickCartButton = () => {
    if (status === "unauthenticated") return push("/auth/login")
    if (isAlreadyOnTheCart) return removeItem(product)
    addItem(product)
    window.localStorage.setItem("cart", JSON.stringify([...cartItems, product]))
  }

  return { isAlreadyOnTheCart, handleClickCartButton }
}
