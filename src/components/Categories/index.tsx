"use client"

import { Container, Flex } from "@radix-ui/themes"
import CategoryItem from "./CategoryItem"
import { Category } from "@prisma/client"

function Categories({ categories }: { categories: Category[] }) {
  return (
    <div className='py-4 border-b border-[#EDEDED]'>
      <Container>
        <Flex gap='4' wrap='wrap'>
          {categories.map((cat) => (
            <CategoryItem category={cat} key={cat.categoryId} />
          ))}
        </Flex>
      </Container>
    </div>
  )
}
export default Categories
