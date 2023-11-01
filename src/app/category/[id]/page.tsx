"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useCases } from "@/api/useCases"
import { Product } from "@prisma/client"
import { Box, Flex, Text } from "@radix-ui/themes"
import Image from "next/image"
import Link from "next/link"
import ContentLoader from "react-content-loader"

function CategoryById() {
  const { id } = useParams()
  const [productsData, setProductsData] = useState<Product[]>([])
  const [categoryName, setCategoryName] = useState<null | string>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true)
      const products = await useCases.products.getByCatId(id as string)
      const category = await useCases.categories.getById(
        products.data.data[0].productCategoryId
      )
      setCategoryName(category.data.data[0].name)
      setProductsData(products.data.data)
      setIsLoading(false)
    }
    getProducts()
  }, [id])

  const LoaderItem = () => {
    return (
      <ContentLoader
        speed={2}
        width={1104}
        height={150}
        viewBox='0 0 1104 150'
        backgroundColor='#f3f3f3'
        foregroundColor='#ECEBEB'
      >
        <rect x='161' y='65' rx='3' ry='3' width='52' height='6' />
        <rect x='160' y='100' rx='3' ry='3' width='410' height='6' />
        <rect x='6' y='15' rx='3' ry='3' width='130' height='150' />
        <rect x='160' y='40' rx='3' ry='3' width='178' height='6' />
      </ContentLoader>
    )
  }

  return (
    <div>
      <header className='bg-primary p-16'>
        {isLoading ? (
          <ContentLoader
            speed={2}
            width={1008}
            height={60}
            viewBox='0 0 1008 60'
            backgroundColor='#f3f3f3'
            foregroundColor='#ecebeb'
          >
            <rect x='350' y='10' rx='3' ry='3' width='293' height='60' />
          </ContentLoader>
        ) : (
          <h2 className='text-6xl text-white font-medium text-center'>
            {categoryName}
          </h2>
        )}
      </header>
      <div className='bg-offwhite'>
        {isLoading
          ? [1, 2, 3, 4].map((e) => (
              <div className='border-y bg-white p-2' key={e}>
                <LoaderItem />
              </div>
            ))
          : productsData.map((product) => (
              <div
                className='border bg-white p-2 hover:text-primary transition-colors'
                key={product.productId}
              >
                <Link href={`/product/${product.productId}`}>
                  <Flex gap='1' align='center'>
                    <Image
                      src={product.images[0]}
                      alt={`${product.name} image`}
                      width={150}
                      height={150}
                    />
                    <Box className='ml-2'>
                      <Text as='p' size='4' weight='medium'>
                        {product.name}
                      </Text>
                      <div className='my-2'>
                        <Text as='span' size='6' weight='bold'>
                          ${product.price}
                        </Text>
                      </div>
                      <Text as='p' size='2' color='gray'>
                        {product.description}
                      </Text>
                    </Box>
                  </Flex>
                </Link>
              </div>
            ))}
      </div>
    </div>
  )
}
export default CategoryById
