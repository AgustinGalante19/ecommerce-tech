import { Container, Flex } from "@radix-ui/themes"
import CategoryItem from "./CategoryItem"
import { Category } from "@prisma/client"
import { API_URL } from "@/libs/API"

async function getCategories() {
  try {
    const API = `${API_URL}/category`
    console.log("API URL: ", API)
    const request = await fetch(API)
    const categories: ApiResponse<Category> = await request.json()
    return categories
  } catch (err) {
    return {
      data: [],
    }
  }
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
