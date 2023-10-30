import api from "@/api"
import { Product } from "@prisma/client"

export default async function getProductByCategory(catId: string) {
  return await api.get<ApiResponse<Product>>("/product/byCatId", {
    params: {
      catId,
    },
  })
}
