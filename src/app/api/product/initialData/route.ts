import client from "@/libs/prisma"
import randomIndex from "@/libs/randomIndex"
import TResponse from "@/types/InitialDataResponse"
import { NextResponse } from "next/server"

export async function GET(): Promise<NextResponse<ApiResponse<TResponse>>> {
  try {
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

    return NextResponse.json({ data, error: [], result: "ok" })
  } catch (err) {
    console.log("error intial data endpoint")
    return NextResponse.json({
      data: [],
      error: ["Unexpected error"],
      result: "error",
    })
  }
}
