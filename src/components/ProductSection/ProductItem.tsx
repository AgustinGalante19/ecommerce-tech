import { Product } from "@prisma/client"
import Image from "next/image"

function ProductItem({ product }: { product: Product }) {
  return (
    <li className='w-[230px] bg-red-green-400  max-sm:mx-auto'>
      <button className='text-left rounded-xl border-2 border-gray-200 transition-all hover:border-primary hover:border-2 hover:scale-110'>
        <div className='bg-offwhite rounded-t-xl'>
          <Image
            src={product.images[0]}
            width={550}
            height={550}
            alt={`${product.name} image`}
          />
        </div>
        <div className='bg-white h-[40px] px-3 rounded-b-xl mt-2'>
          <p className='font-medium'>{product.name}</p>
        </div>
        <div className='p-2 mt-3'>
          <span className='font-bold text-green-600'>$ {product.price}</span>
        </div>
      </button>
    </li>
  )
}
export default ProductItem
