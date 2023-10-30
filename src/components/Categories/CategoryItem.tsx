import { Box, Flex, Text } from "@radix-ui/themes"
import { Category } from "@prisma/client"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

function CategoryItem({ category }: { category: Category }) {
  return (
    <Link href='#'>
      <Box className='py-1 px-3 bg-secondary hover:bg-primary hover:text-white transition-colors rounded-2xl'>
        <Flex gap='1' align='center' justify='between'>
          <Text size='2' weight='medium'>
            {category.name}
          </Text>
          <ChevronRight size={16} />
        </Flex>
      </Box>
    </Link>
  )
}
export default CategoryItem
