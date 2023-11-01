import { Product } from "@prisma/client"
import ProductItem from "./ProductItem"

interface Props {
  title: string
  products: Product[]
  category: string
}

function ProductSection({ products, title, category }: Props) {
  return (
    <section className='my-12'>
      <div>
        <h3 className='text-gray-600 font-bold text-2xl inline-block'>
          {title}
          <a
            className='text-primary hover:text-blue-400 transition-colors'
            href={`/category/${category}`}
          >
            {category}
          </a>
          <span className='w-full h-1 mt-1 bg-blue-400 flex' />
        </h3>
        <ul className='product-list max-xl:grid-cols-2 max-sm:grid-cols-1 mt-8'>
          {products.slice(0, 4).map((product) => {
            return <ProductItem product={product} key={product.productId} />
          })}
        </ul>
      </div>
    </section>
  )
}
export default ProductSection
