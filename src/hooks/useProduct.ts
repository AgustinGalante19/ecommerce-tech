import { useCases } from "@/api/useCases"
import { useCartStore } from "@/store/useCartStore"
import ProductWithCategory from "@/types/ProductWithCategory"
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

const INITIAL_STATE = {
  productId: "",
  name: "",
  productCategoryId: "",
  price: 0,
  description: "",
  images: [],
  features: [],
  category: {
    categoryId: "",
    name: "",
  },
}

export default function useProduct() {
  const { id } = useParams()
  const { push } = useRouter()
  const { status } = useSession()

  const [product, setProduct] = useState<ProductWithCategory>(INITIAL_STATE)
  const { addItem, cartItems, removeItem, setCartItems } = useCartStore()
  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
    const getProduct = async () => {
      setisLoading(true)
      const product = await useCases.products.getById(id as string)

      setProduct(product.data.data[0])
      setisLoading(false)
    }
    getProduct()
  }, [id, setCartItems])

  const isAlreadyOnTheCart = useMemo(
    () => cartItems.find((e) => e.productId === product?.productId),
    [cartItems, product?.productId]
  )
  const handleClickCartButton = () => {
    if (status === "unauthenticated") return push("/auth/login")
    if (isAlreadyOnTheCart) return removeItem(product)
    addItem(product)
    window.localStorage.setItem("cart", JSON.stringify([...cartItems, product]))
  }

  return { isLoading, isAlreadyOnTheCart, product, handleClickCartButton }
}
