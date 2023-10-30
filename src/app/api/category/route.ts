import { NextResponse } from "next/server"
import { Category } from "@prisma/client"
import client from "@/libs/prisma"

export async function GET(): Promise<NextResponse<ApiResponse<Category>>> {
  try {
    const categories = await client.category.findMany()

    return NextResponse.json({
      data: categories,
      error: [],
      result: "ok",
    })
  } catch (err) {
    console.log("Getting categories: ", err)
    return NextResponse.json({
      data: [],
      error: ["Something went wrong getting categories"],
      result: "error",
    })
  }
}

export async function POST(
  req: Request
): Promise<NextResponse<ApiResponse<Category>>> {
  try {
    const { name } = await req.json()
    const newCategory = await client.category.create({ data: { name } })
    return NextResponse.json({
      data: [newCategory],
      error: [],
      result: "ok",
    })
  } catch (err) {
    console.log("Creating category", err)
    return NextResponse.json({
      data: [],
      error: ["Cannot create a the category"],
      result: "error",
    })
  }
}
