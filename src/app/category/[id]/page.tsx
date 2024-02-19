"use client"

import ProductList from "@/components/ProductByCategory/ProductList"
import Header from "@/components/ProductByCategory/Header"
import useProductByCatID from "@/hooks/useProductsByCatID"
import ProductItemLoader from "@/components/Product/ProductItemLoader"

function ProductByCategoryID({ params }: { params: { id: string } }) {
  const { categoryName, isLoading, productsData } = useProductByCatID({
    id: params.id as string,
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
