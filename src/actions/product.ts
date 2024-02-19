"use server"

import client from "@/libs/prisma"
import randomIndex from "@/libs/randomIndex"

export async function getInitialData() {
  const categories = await client.category.findMany()

  const length = categories.length
  const indexes = randomIndex([length, length])

  const promises = indexes.map((randomIndex) => {
    const catId = categories[randomIndex].categoryId
    return client.product.findMany({
      where: {
        productCategoryId: catId,
      },
      include: {
        category: true,
      },
    })
  })

  const result = await Promise.all(promises)

  const data = result.map((item) => ({
    catId: item.at(0)?.category.categoryId ?? "",
    category: item.at(0)?.category.name ?? "",
    products: item,
  }))

  return { products: data, categories, error: [], result: "ok" }
}

export async function getProductById(id: string) {
  try {
    const product = await client.product.findUnique({
      where: {
        productId: id,
      },
      include: {
        category: true,
      },
    })
    if (!product) {
      return { data: [], error: ["Product not found"], result: "error" }
    }

    return { data: [product], error: [], result: "ok" }
  } catch (err) {
    return { data: [], error: "Unexpected error", result: "error" }
  }
}
