import ProductWithCategory from "@/types/ProductWithCategory"
import { Box, Flex, Text } from "@radix-ui/themes"
import Image from "next/image"
import Link from "next/link"

const ProductList = ({ products }: { products: ProductWithCategory[] }) => {
  return products.map((product) => (
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
  ))
}

export default ProductList
