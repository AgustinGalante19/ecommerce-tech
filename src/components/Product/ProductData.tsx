"use client"

import useProduct from "@/hooks/useProduct"
import ProductWithCategory from "@/types/ProductWithCategory"
import { Badge, Box, Button } from "@radix-ui/themes"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"

function ProductData({ product }: { product: ProductWithCategory }) {
  const { handleClickCartButton, isAlreadyOnTheCart } = useProduct({ product })
  return (
    <Box className='p-8 flex border-l justify-center max-md:border-none border-gray-300 mx-auto'>
      <div className='flex-col gap-2'>
        <h2 className='text-3xl font-semibold'>{product.name}</h2>
        <p className='text-3xl font-bold my-2'>${product.price}</p>
        <Badge color='blue' size='2'>
          <Link href={`/category/${product.category.categoryId}`}>
            {product.category.name}
          </Link>
        </Badge>
        <section className='mt-4'>
          <ul className='list-disc text-sm'>
            {product.features.map((feature, i) => (
              <li key={`${feature}-${i}`}>{feature}</li>
            ))}
          </ul>
        </section>
        <div className='flex justify-center mt-4'>
          <Button
            size='4'
            style={{ cursor: "pointer" }}
            onClick={handleClickCartButton}
          >
            <ShoppingCart />
            <span>
              {isAlreadyOnTheCart ? "Remove from cart" : "Add to cart"}
            </span>
          </Button>
        </div>
      </div>
    </Box>
  )
}

export default ProductData
