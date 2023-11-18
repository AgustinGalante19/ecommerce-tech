import { Box } from "@radix-ui/themes"
import ContentLoader from "react-content-loader"
import productDetailStyles from "@/styles/product-detail.module.css"

const ProductLoader = () => {
  return (
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
  )
}

export default ProductLoader
