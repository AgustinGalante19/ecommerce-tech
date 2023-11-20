import client from "@/libs/prisma"
import { Product } from "@prisma/client"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(
  req: NextRequest
): Promise<
  NextResponse<ApiResponse<Product | { name: string; productId: string }>>
> {
  const searchParams = req.nextUrl.searchParams
  const catId = searchParams.get("catId")
  const searchQuery = searchParams.get("searchQuery")
  try {
    if (searchQuery && searchQuery !== "") {
      const fullData = searchParams.get("fullData")
      if (fullData && fullData === "true") {
        const products = await client.product.findMany({
          where: {
            OR: [
              {
                name: {
                  startsWith: searchQuery,
                  mode: "insensitive",
                },
              },
              {
                name: {
                  endsWith: searchQuery,
                  mode: "insensitive",
                },
              },
              {
                category: {
                  name: {
                    startsWith: searchQuery,
                    mode: "insensitive",
                  },
                },
              },
              {
                category: {
                  name: {
                    endsWith: searchQuery,
                    mode: "insensitive",
                  },
                },
              },
            ],
          },
        })

        return NextResponse.json({ data: products, error: [], result: "ok" })
      }

      const products = await client.product.findMany({
        where: {
          OR: [
            {
              name: {
                startsWith: searchQuery,
                mode: "insensitive",
              },
            },
            {
              name: {
                endsWith: searchQuery,
                mode: "insensitive",
              },
            },
            {
              category: {
                name: {
                  startsWith: searchQuery,
                  mode: "insensitive",
                },
              },
            },
            {
              category: {
                name: {
                  endsWith: searchQuery,
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

      return NextResponse.json({ data: products, error: [], result: "ok" })
    }
    if (catId) {
      const products = await client.product.findMany({
        where: {
          productCategoryId: catId,
        },
        include: {
          category: true,
        },
      })
      return NextResponse.json({ data: products, error: [], result: "ok" })
    }

    const products = await client.product.findMany()
    return NextResponse.json({ data: products, error: [], result: "ok" })
  } catch (error) {
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
