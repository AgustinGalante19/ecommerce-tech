"use client"

import { Box, Container, Flex, Text } from "@radix-ui/themes"
import CategoryItem from "./CategoryItem"
import { useEffect, useState } from "react"
import { Category } from "@prisma/client"
import api from "@/api"
import { ChevronRight } from "lucide-react"
import { useCases } from "@/api/useCases"

function Categories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getCategories = () => {
      setIsLoading(true)
      useCases.categories
        .getAll()
        .then((response) => setCategories(response.data.data))
        .finally(() => setIsLoading(false))
    }
    getCategories()
  }, [])

  return (
    <div className='py-4 border-b border-[#EDEDED]'>
      <Container>
        <Flex gap='4' wrap='wrap'>
          {isLoading
            ? [1, 2, 3, 4].map((e, i) => (
                <Box
                  key={`${e}-${i}`}
                  className='py-1 px-3 bg-secondary hover:bg-primary hover:text-white transition-colors rounded-2xl'
                >
                  <Flex gap='1' align='center' justify='between'>
                    <Text size='2' weight='medium'>
                      <span className='opacity-0'>_____</span>
                    </Text>
                    <ChevronRight size={16} />
                  </Flex>
                </Box>
              ))
            : categories.map((cat) => (
                <CategoryItem category={cat} key={cat.categoryId} />
              ))}
        </Flex>
      </Container>
    </div>
  )
}
export default Categories
