import client from "@/libs/prisma"
import { OrderRequest } from "@/types/Order"
import { Order } from "@prisma/client"
import { NextResponse } from "next/server"
import { headers } from "next/headers"

export async function POST(
  request: Request
): Promise<NextResponse<ApiResponse<Order>>> {
  const { products, total }: { products: OrderRequest[]; total: number } =
    await request.json()
  const headersList = headers()
  const userId = headersList.get("userId")

  try {
    if (!userId) {
      return NextResponse.json({
        data: [],
        error: ["You must provide a valid userId"],
        result: "error",
      })
    }

    if (!products) {
      return NextResponse.json({
        data: [],
        error: ["You must provide a list of products"],
        result: "error",
      })
    }

    const newOrder = await client.order.create({
      data: {
        userId: userId,
        products: {
          createMany: {
            data: products,
          },
        },
        total,
      },
      include: {
        products: true,
      },
    })

    return NextResponse.json({ data: [newOrder], error: [], result: "ok" })
  } catch (err) {
    console.log("Error creating the order", err)
    return NextResponse.json({
      data: [],
      error: ["Cannot create the order"],
      result: "error",
    })
  }
}

export async function GET(): Promise<NextResponse<ApiResponse<Order>>> {
  const headersList = headers()
  try {
    const userId = headersList.get("userId")
    if (!userId) {
      return NextResponse.json({
        data: [],
        error: ["You must provide a valid userId"],
        result: "error",
      })
    }

    const orders = await client.order.findMany({
      where: {
        userId: userId,
      },
      include: {
        products: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return NextResponse.json({ data: orders, error: [], result: "ok" })
  } catch (err) {
    return NextResponse.json({ data: [], error: [], result: "error" })
  }
}
