import { useCases } from "@/api/useCases"
import ProductWithCategory from "@/types/ProductWithCategory"
import { useEffect, useState } from "react"

export default function useProductByCatID({ id }: { id: string }) {
  const [productsData, setProductsData] = useState<ProductWithCategory[]>([])
  const [categoryName, setCategoryName] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true)
      const products = await useCases.products.getByCatId(id as string)
      setCategoryName(products.data.data[0].category.name)
      setProductsData(products.data.data)
      setIsLoading(false)
    }
    getProducts()
  }, [id])

  return { productsData, categoryName, isLoading }
}
