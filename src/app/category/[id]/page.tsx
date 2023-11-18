"use client"

import { useParams } from "next/navigation"
import LoaderItem from "@/components/ProductByCategory/LoaderItem"
import ProductList from "@/components/ProductByCategory/ProductList"
import Header from "@/components/ProductByCategory/Header"
import useProductByCatID from "@/hooks/useProductsByCatID"

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
          [1, 2, 3, 4].map((e) => (
            <div className='border-y bg-white p-2' key={e}>
              <LoaderItem />
            </div>
          ))
        ) : (
          <ProductList products={productsData} />
        )}
      </div>
    </div>
  )
}
export default ProductByCategoryID
