import client from "@/libs/prisma"
import { Product } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(): Promise<NextResponse<ApiResponse<Product>>> {
  try {
    const products = await client.product.findMany()
    return NextResponse.json({ data: products, error: [], result: "ok" })
  } catch (error) {
    console.log("error getting products")
    return NextResponse.json({
      data: [],
      error: ["Something went wrong getting products"],
      result: "error",
    })
  }
}

export async function POST(
  req: Request
): Promise<NextResponse<ApiResponse<Product>>> {
  try {
    const {
      description,
      name,
      price,
      category,
      features,
      images,
      productCategoryId,
    } = await req.json()
    const newProduct = await client.product.create({
      data: {
        description,
        name,
        price,
        category,
        features,
        images,
        productCategoryId,
      },
    })
    return NextResponse.json({ data: [newProduct], error: [], result: "ok" })
  } catch (error) {
    console.log("Error on create a product")
    return NextResponse.json({
      data: [],
      error: ["Something went wrong creating a product"],
      result: "error",
    })
  }
}
