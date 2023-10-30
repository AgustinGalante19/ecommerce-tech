import client from "@/libs/prisma"
import { Product } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<Product>>> {
  try {
    const product = await client.product.findUnique({
      where: {
        productId: params.id,
      },
    })

    if (!product) {
      return NextResponse.json(
        { data: [], error: ["Product not found"], result: "error" },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: [product], error: [], result: "ok" })
  } catch (err) {
    console.log("Error on get a product by id", err)
    return NextResponse.json({
      data: [],
      error: ["Something went wrong getting a product by id"],
      result: "ok",
    })
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<Product>>> {
  try {
    const existsProduct = await client.product.findUnique({
      where: { productId: params.id },
    })

    if (!existsProduct) {
      return NextResponse.json(
        { data: [], error: ["Product not found"], result: "error" },
        {
          status: 404,
        }
      )
    }

    const removedProduct = await client.product.delete({
      where: {
        productId: params.id,
      },
    })

    return NextResponse.json({
      data: [removedProduct],
      error: [],
      result: "ok",
    })
  } catch (err) {
    console.log("Error on removing a product", err)
    return NextResponse.json({
      data: [],
      error: ["Something went wrong on removing a product"],
      result: "error",
    })
  }
}
