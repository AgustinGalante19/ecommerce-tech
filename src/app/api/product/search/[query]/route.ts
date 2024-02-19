import client from "@/libs/prisma"
import { NextResponse } from "next/server"

export async function GET(
  _: Request,
  { params }: { params: { query: string } }
): Promise<
  NextResponse<
    ApiResponse<
      {
        name: string
        productId: string
      }[]
    >
  >
> {
  const products = await client.product.findMany({
    where: {
      OR: [
        {
          name: {
            startsWith: params.query,
            mode: "insensitive",
          },
        },
        {
          name: {
            endsWith: params.query,
            mode: "insensitive",
          },
        },
        {
          category: {
            name: {
              startsWith: params.query,
              mode: "insensitive",
            },
          },
        },
        {
          category: {
            name: {
              endsWith: params.query,
              mode: "insensitive",
            },
          },
        },
      ],
    },
    select: {
      name: true,
      productId: true,
    },
  })

  return NextResponse.json({ data: [products], error: [], result: "ok" })
}
