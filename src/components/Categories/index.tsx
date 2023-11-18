"use client"

import { Container, Flex } from "@radix-ui/themes"
import CategoryItem from "./CategoryItem"
import { useEffect, useState } from "react"
import { Category } from "@prisma/client"
import api from "@/api"

function Categories() {
  const [categories, setCategories] = useState<Category[]>([])
  useEffect(() => {
    api
      .get<ApiResponse<Category>>("/category")
      .then((response) => setCategories(response.data.data))
  }, [])

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
