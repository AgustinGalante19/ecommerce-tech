import ProductList from "@/components/ProductByCategory/ProductList"
import Header from "@/components/ProductByCategory/Header"
import { getProductByCatId } from "@/actions/product"

async function ProductByCategoryID({ params }: { params: { id: string } }) {
  const { categoryName, products } = await getProductByCatId(params.id)

  return (
    <div className='mb-8'>
      <Header categoryName={categoryName} isLoading={false} />
      <div className='bg-offwhite'>
        <ProductList products={products} />
      </div>
    </div>
  )
}
export default ProductByCategoryID
