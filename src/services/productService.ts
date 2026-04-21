import { api } from "./api"
import type { CategoryResponse, Product, ProductResponse } from "../types/product"

export async function getProducts(): Promise<ProductResponse> {
  const response = await api.get<ProductResponse>("/products?limit=0")
  return response.data
}

export async function getProductById(id: string): Promise<Product> {
  const response = await api.get<Product>(`/products/${id}`)
  return response.data
}

export async function getCategories(): Promise<CategoryResponse[]> {
  const response = await api.get<CategoryResponse[]>("/products/categories")
  return response.data
}