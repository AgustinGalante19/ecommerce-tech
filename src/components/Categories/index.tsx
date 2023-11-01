import { Container, Flex } from "@radix-ui/themes"
import CategoryItem from "./CategoryItem"
import { Category } from "@prisma/client"

async function getCategories() {
  const request = await fetch("http://localhost:3000/api/category")
  const categories: ApiResponse<Category> = await request.json()
  return categories
}

async function Categories() {
  const categoryList = await getCategories()
  return (
    <div className='py-4 border-b border-[#EDEDED]'>
      <Container>
        <Flex gap='4' wrap='wrap'>
          {categoryList.data.map((cat) => (
            <CategoryItem category={cat} key={cat.categoryId} />
          ))}
        </Flex>
      </Container>
    </div>
  )
}
export default Categories
