import { Category, Product } from "@prisma/client"
import api from "."
import { API_URL } from "@/libs/API"
import ProductDetails from "@/types/ProductDetails"

export const useCases = {
  serverSide: {
    randomProducts: () => fetch(`${API_URL}/product/initialData`),
    getAllCategories: () => fetch(`${API_URL}/category`),
  },
  products: {
    getByCatName: (catName: string) =>
      api.get<ApiResponse<Product>>("/product/byCatName", {
        params: {
          catName,
        },
      }),
    getByCatId: (
      catId: string //Todo: Make this endpoint
    ) =>
      api.get<ApiResponse<Product>>("/product/byCatId", {
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
}
