import { Product } from "@prisma/client"

export default interface TResponse {
  catId: string
  category: string
  products: Product[]
}
