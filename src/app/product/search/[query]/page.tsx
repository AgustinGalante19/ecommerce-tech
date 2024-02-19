import { getProductByQuery } from "@/actions/product"
import ProductList from "@/components/ProductByCategory/ProductList"
import ProductWithCategory from "@/types/ProductWithCategory"
async function SearchProducts({ params }: { params: { query: string } }) {
  const products = await getProductByQuery(
    decodeURIComponent(params.query),
    true
  )

  return <ProductList products={products.data as ProductWithCategory[]} />
}
export default SearchProducts
