"use client"

import { Box, Badge, Button } from "@radix-ui/themes"
import Image from "next/image"
import productDetailStyles from "@/styles/product-detail.module.css"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import useProduct from "@/hooks/useProduct"
import ProductLoader from "@/components/Product/ProductLoader"

function ProductByID() {
  const { handleClickCartButton, isAlreadyOnTheCart, isLoading, product } =
    useProduct()

  return isLoading ? (
    <ProductLoader />
  ) : (
    <div
      className={`${productDetailStyles["product-detail"]} mt-8 bg-secondary rounded-md max-w-5xl mx-auto`}
    >
      <Box className='flex justify-center'>
        <Image
          className='m-auto'
          src={product.images[0]}
          width={350}
          height={350}
          alt={`${product.name} preview image`}
        />
      </Box>
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
    </div>
  )
}
export default ProductByID
