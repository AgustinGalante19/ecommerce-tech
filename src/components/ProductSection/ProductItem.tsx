import { Product } from "@prisma/client"
import { Flex } from "@radix-ui/themes"
import Image from "next/image"
import Link from "next/link"

function ProductItem({ product }: { product: Product }) {
  return (
    <li className='w-[230px] shadow max-sm:mx-auto hover:scale-105 transition-all'>
      <Link
        className='text-left rounded-xl'
        href={`/product/${product.productId}`}
      >
        <div className='bg-offwhite rounded-t'>
          <Image
            src={product.images[0]}
            width={550}
            height={550}
            alt={`${product.name} image`}
          />
        </div>
        <div className='bg-white h-[30px] px-3 rounded-b mt-2'>
          <p className='text-sm font-medium my-auto text-gray-600'>
            {product.name}
          </p>
        </div>
        <div className='p-2 mt-1'>
          <Flex justify='between' align='center'>
            <span className='font-medium text-2xl'>${product.price}</span>
            <div>
              <span className='self-end text-sm text-primary font-medium underline'>
                Visit
              </span>
            </div>
          </Flex>
        </div>
      </Link>
    </li>
  )
}
export default ProductItem
