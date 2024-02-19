"use server"

import client from "@/libs/prisma"

export async function getCategories() {
  try {
    const categories = await client.category.findMany()

    return {
      data: categories,
      error: [],
      result: "ok",
    }
  } catch (err) {
    return {
      data: [],
      error: ["Unexpected error"],
      result: "error",
    }
  }
}

export async function getCategoryById(id: string) {
  try {
    const category = await client.category.findUnique({
      where: {
        categoryId: id,
      },
    })

    if (!category)
      return {
        data: [],
        error: ["Category not found"],
        result: "error",
      }

    return {
      data: category,
      error: [],
      result: "ok",
    }
  } catch (err) {
    return {
      data: [],
      error: ["Unexpected error"],
      result: "error",
    }
  }
}
