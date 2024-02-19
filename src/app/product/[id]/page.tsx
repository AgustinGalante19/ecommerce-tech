import productDetailStyles from "@/styles/product-detail.module.css"
import { getProductById } from "@/actions/product"
import ProductData from "@/components/Product/ProductData"
import { Box } from "@radix-ui/themes"
import Image from "next/image"

async function ProductByID({ params }: { params: { id: string } }) {
  const { data } = await getProductById(params.id)

  return (
    <div
      className={`${productDetailStyles["product-detail"]} mt-8 bg-secondary rounded-md max-w-5xl mx-auto`}
    >
      <Box className='flex justify-center'>
        <Image
          className='m-auto'
          src={data[0].images[0]}
          width={350}
          height={350}
          alt={`${data[0].name} preview image`}
        />
      </Box>
      <ProductData product={data[0]} />
    </div>
  )
}
export default ProductByID
