import client from "@/libs/prisma"
import randomIndex from "@/libs/randomIndex"
import TResponse from "@/types/InitialDataResponse"
import { NextResponse } from "next/server"

export async function GET(): Promise<NextResponse<ApiResponse<TResponse>>> {
  const categories = await client.category.findMany()

  const length = categories.length
  const indexes = randomIndex([length, length])

  const promises = indexes.map((randomIndex) => {
    const catId = categories[randomIndex].categoryId
    return client.product.findMany({
      where: {
        productCategoryId: catId,
      },
    })
  })

  const result = await Promise.all(promises)

  const data = result.map((item) => ({
    catId:
      categories
        .filter((cat) => cat.categoryId === item.at(0)?.productCategoryId)
        .at(0)?.categoryId ?? "",
    category:
      categories
        .filter((cat) => cat.categoryId === item.at(0)?.productCategoryId)
        .at(0)?.name ?? "",
    products: item,
  }))

  return NextResponse.json({ data, error: [], result: "ok" })
}
