import { Product } from "@prisma/client"

export default interface ProductDetails extends Product {
  category: {
    categoryId: string
    name: string
  }
}
