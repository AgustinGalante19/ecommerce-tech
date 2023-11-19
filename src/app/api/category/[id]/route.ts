import client from "@/libs/prisma"
import { NextResponse } from "next/server"
import { Category } from "@prisma/client"

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<Category>>> {
  try {
    const id = params.id
    const category = await client.category.findMany({
      where: { categoryId: id },
    })

    if (!category)
      return NextResponse.json(
        {
          data: [],
          error: ["Category not found"],
          result: "error",
        },
        {
          status: 404,
        }
      )
    return NextResponse.json({ data: category, error: [], result: "ok" })
  } catch (err) {
    return NextResponse.json({
      data: [],
      error: ["Error on getting a category"],
      result: "error",
    })
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<Category>>> {
  try {
    const categoryId = params.id

    const deletedCategory = await client.category.delete({
      where: {
        categoryId,
      },
    })

    if (!deletedCategory) {
      return NextResponse.json(
        {
          data: [],
          error: ["Invalid ID"],
          result: "error",
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      data: [deletedCategory],
      error: [],
      result: "ok",
    })
  } catch (err) {
    return NextResponse.json({
      data: [],
      error: ["Something went wrong deleting category"],
      result: "error",
    })
  }
}
