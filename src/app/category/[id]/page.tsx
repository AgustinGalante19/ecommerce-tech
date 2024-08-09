import ProductList from "@/components/ProductByCategory/ProductList"
import Header from "@/components/ProductByCategory/Header"
import { getProductByCatId } from "@/actions/product"

async function ProductByCategoryID({ params }: { params: { id: string } }) {
  const { categoryName, products } = await getProductByCatId(params.id)

  return (
    <div className='mb-8'>
      <Header
        categoryName={categoryName ?? "Category not found"}
        isLoading={false}
      />
      <div className='bg-offwhite'>
        {products.length === 0 ? (
          <div className='flex p-8 justify-center'>
            <span className='text-xl font-semibold text-gray-400'>
              Products not found :{"("}
            </span>
          </div>
        ) : (
          <ProductList products={products} />
        )}
      </div>
    </div>
  )
}
export default ProductByCategoryID
