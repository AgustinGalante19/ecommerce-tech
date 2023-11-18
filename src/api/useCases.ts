import { Category, Order, Product } from "@prisma/client"
import api from "."
import ProductDetails from "@/types/ProductWithCategory"
import { OrderRequest, OrdersWithProducts } from "@/types/Order"
import ProductWithCategory from "@/types/ProductWithCategory"

export const useCases = {
  products: {
    getByCatId: (catId: string) =>
      api.get<ApiResponse<ProductWithCategory>>("/product/byCatId", {
        params: {
          catId,
        },
      }),
    getById: (id: string) =>
      api.get<ApiResponse<ProductDetails>>(`/product/${id}`),
    create: (data: Product) => api.post("/product", { data }),
    destroy: (id: string) => api.delete(`/product/${id}`),
  },
  categories: {
    getAll: () => api.get<ApiResponse<Category>>("/category"),
    getById: (id: string) => api.get<ApiResponse<Category>>(`/category/${id}`),
    getByName: (catName: string) =>
      api.get<ApiResponse<Category>>(`/category/byName`, {
        params: {
          catName,
        },
      }),
    create: (data: Category) =>
      api.post<ApiResponse<Category>>("/category", { data }),
    destroy: (id: string) =>
      api.delete<ApiResponse<Category>>(`/category/${id}`),
  },
  orders: {
    getAll: (userId: string) =>
      api.get<ApiResponse<OrdersWithProducts>>("/order", {
        headers: { userId },
      }),
    create: ({
      request,
      total,
      userId,
    }: {
      request: OrderRequest[]
      total: number
      userId: string
    }) =>
      api.post<ApiResponse<Order>>(
        "/order",
        { products: request, total },
        {
          headers: {
            userId,
          },
        }
      ),
  },
}
