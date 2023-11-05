"use client"

import { useCases } from "@/api/useCases"
import { Product } from "@prisma/client"
import { Box, Badge, Flex, Button } from "@radix-ui/themes"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import productDetailStyles from "@/styles/product-detail.module.css"
import { ShoppingCart } from "lucide-react"

const PRODUCT = {
  productId: "653c433ba2181dc2e5da2920",
  name: "Samsung A34 6GB RAM|128GB",
  productCategoryId: "653c42b7a2181dc2e5da291d",
  price: 150,
  description:
    "Samsung Galaxy A34 phone with 5G technology with 6gb RAM and 128GB of Storage",
  images: ["http://localhost:3000/SA34.png"],
  features: [
    "6GB RAM",
    "128GB Storage",
    "Camera 13mp",
    "Color: Awesome Silver",
  ],
  category: {
    categoryId: "653c42b7a2181dc2e5da291d",
    name: "Phone",
  },
}

function ProductByID() {
  const { id } = useParams()

  const [product, setProduct] = useState<Product>(PRODUCT)
  // const [isLoading, setisLoading] = useState(false)
  /* useEffect(() => {
    const getProduct = async () => {
      const product = await useCases.products.getById(id as string)
      setProduct(product.data.data[0])
    }
    getProduct()
  }, [id]) */

  return (
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
      <Box className='p-8 flex border-l justify-center border-gray-300 mx-auto'>
        <div className='flex-col gap-2'>
          <h2 className='text-3xl font-semibold'>{product.name}</h2>
          <p className='text-3xl font-bold my-2'>${product.price}</p>
          <Badge color='blue' size='2'>
            {product.category.name}
          </Badge>
          <ul className='list-disc my-2 text-sm mt-8'>
            {product.features.map((feature, i) => (
              <li key={`${feature}-${i}`}>{feature}</li>
            ))}
          </ul>
          <div className='flex justify-center mt-4'>
            <Button  size='4' >
              <ShoppingCart />
              <span>Add to cart</span>
            </Button>
          </div>
        </div>
      </Box>
    </div>
  )
}
export default ProductByID
