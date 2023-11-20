import { useCases } from "@/api/useCases"
import ProductWithCategory from "@/types/ProductWithCategory"
import { useEffect, useState } from "react"

export default function useProductByCatID({ id }: { id: string }) {
  const [productsData, setProductsData] = useState<ProductWithCategory[]>([])
  const [categoryName, setCategoryName] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getProducts = async () => {
      useCases.products.getByCatId(id as string).then((response) => {
        const productsList = response.data.data
        setProductsData(productsList)
        setCategoryName(productsList[0].category.name)
        setIsLoading(false)
      })
    }
    getProducts()
  }, [id])

  return { productsData, categoryName, isLoading }
}
