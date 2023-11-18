import { Category, ProductOrder, Order as PrismaOrder } from "@prisma/client"

export default interface Order {
  [key: string]: {
    name: string
    productId: string
    productCategoryId: string
    price: number
    description: string
    images: string[]
    features: string[]
    category: Category
    quantity: number
  }
}

export interface OrderRequest {
  productId: string
  name: string
  price: number
  quantity: number
  userId: string
  categoryId: string
}

export type OrdersWithProducts = PrismaOrder & {
  products: ProductOrder[]
}
