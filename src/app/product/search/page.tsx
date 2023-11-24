"use client"

import { useCases } from "@/api/useCases"
import ProductItemLoader from "@/components/Product/ProductItemLoader"
import ProductList from "@/components/ProductByCategory/ProductList"
import ProductWithCategory from "@/types/ProductWithCategory"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

function SearchProducts() {
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState<ProductWithCategory[]>([])
  const searchParams = useSearchParams()

  useEffect(() => {
    const getProducts = () => {
      setIsLoading(true)
      const search = searchParams.get("query")
      if (search) {
        useCases.products
          .fullSearch({
            searchQuery: search,
          })
          .then((response) => {
            const productsResponse = response.data.data
            setProducts(productsResponse)
          })
          .finally(() => setIsLoading(false))
      }
    }
    getProducts()
  }, [searchParams])

  return isLoading ? <ProductItemLoader /> : <ProductList products={products} />
}
export default SearchProducts
