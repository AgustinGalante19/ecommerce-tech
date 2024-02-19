"use server"

import client from "@/libs/prisma"
import { OrderRequest, OrdersWithProducts } from "@/types/Order"
import { Order } from "@prisma/client"
import { getServerSession } from "next-auth"
import { getSession } from "next-auth/react"

export async function getOrders(userId: string): Promise<OrdersWithProducts[]> {
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

  return orders
}

export async function createOrder(
  products: OrderRequest[],
  total: number,
  userId: string
): Promise<ApiResponse<Order>> {
  const newOrderResponse = await client.order.create({
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

  return {
    data: [newOrderResponse],
    error: [],
    result: "ok",
  }
}
