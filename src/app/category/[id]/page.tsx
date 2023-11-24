"use client"

import { useParams } from "next/navigation"
import ProductList from "@/components/ProductByCategory/ProductList"
import Header from "@/components/ProductByCategory/Header"
import useProductByCatID from "@/hooks/useProductsByCatID"
import ProductItemLoader from "@/components/Product/ProductItemLoader"

function ProductByCategoryID() {
  const { id } = useParams()

  const { categoryName, isLoading, productsData } = useProductByCatID({
    id: id as string,
  })

  return (
    <div className='mb-8'>
      <Header categoryName={categoryName} isLoading={isLoading} />
      <div className='bg-offwhite'>
        {isLoading ? (
          <ProductItemLoader />
        ) : (
          <ProductList products={productsData} />
        )}
      </div>
    </div>
  )
}
export default ProductByCategoryID
