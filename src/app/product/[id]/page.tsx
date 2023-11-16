"use client"

import { useCases } from "@/api/useCases"
import { Product } from "@prisma/client"
import { Box, Badge, Button } from "@radix-ui/themes"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import productDetailStyles from "@/styles/product-detail.module.css"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "@/store/useCartStore"
import Link from "next/link"
import { useSession } from "next-auth/react"
import ContentLoader from "react-content-loader"

const INITIAL_STATE = {
  productId: "",
  name: "",
  productCategoryId: "",
  price: 0,
  description: "",
  images: [],
  features: [],
  category: {
    categoryId: "",
    name: "",
  },
}

function ProductByID() {
  const { id } = useParams()
  const { push } = useRouter()
  const { status } = useSession()

  const [product, setProduct] = useState<Product>(INITIAL_STATE)
  const { addItem, cartItems, removeItem, setCartItems } = useCartStore()
  const [isLoading, setisLoading] = useState(true)
  useEffect(() => {
    const getProduct = async () => {
      setisLoading(true)
      const product = await useCases.products.getById(id as string)
      setProduct(product.data.data[0])
      setisLoading(false)
    }
    getProduct()
  }, [id, setCartItems])

  const isAlreadyOnTheCart = useMemo(
    () => cartItems.find((e) => e.productId === product.productId),
    [cartItems, product.productId]
  )
  const handleClickCartButton = () => {
    if (status === "unauthenticated") return push("/auth/login")
    if (isAlreadyOnTheCart) return removeItem(product)
    addItem(product)
    window.localStorage.setItem("cart", JSON.stringify([...cartItems, product]))
  }

  return isLoading ? (
    <div
      className={`${productDetailStyles["product-detail"]} mt-8 bg-secondary rounded-md max-w-5xl mx-auto`}
    >
      <Box className='flex justify-center items-center h-80'>
        <ContentLoader
          speed={2}
          width={300}
          height={300}
          viewBox='0 0 300 300'
          backgroundColor='#f3f3f3'
          foregroundColor='#ecebeb'
        >
          <rect x='10' y='51' rx='0' ry='0' width='665' height='441' />
          <rect x='126' y='232' rx='0' ry='0' width='64' height='68' />
        </ContentLoader>
      </Box>
      <Box className='p-8 flex border-l justify-center max-md:border-none border-gray-300 mx-auto'>
        <ContentLoader
          speed={2}
          width={300}
          height={300}
          viewBox='0 0 300 300'
          backgroundColor='#f3f3f3'
          foregroundColor='#ecebeb'
        >
          <rect x='11' y='186' rx='3' ry='3' width='133' height='5' />
          <rect x='10' y='206' rx='3' ry='3' width='158' height='4' />
          <rect x='9' y='223' rx='3' ry='3' width='178' height='5' />
          <rect x='7' y='74' rx='0' ry='0' width='292' height='31' />
          <rect x='9' y='113' rx='0' ry='0' width='59' height='26' />
          <rect x='12' y='150' rx='0' ry='0' width='44' height='19' />
        </ContentLoader>
      </Box>
    </div>
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
