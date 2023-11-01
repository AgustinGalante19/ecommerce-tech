import client from "@/libs/prisma"
import { Product } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  req: NextRequest
): Promise<NextResponse<ApiResponse<Product>>> {
  try {
    const searchParams = req.nextUrl.searchParams
    const catId = searchParams.get("catId")
    if (catId) {
      const products = await client.product.findMany({
        where: {
          productCategoryId: catId,
        },
      })
      return NextResponse.json({ data: products, error: [], result: "ok" })
    }
    return NextResponse.json(
      {
        data: [],
        error: ["You must provide a catId"],
        result: "error",
      },
      { status: 400 }
    )
  } catch (err) {
    return NextResponse.json({
      data: [],
      error: ["Something went wrong on getting products by category"],
      result: "error",
    })
  }
}