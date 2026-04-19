import { api } from "./api"
import type { Product, ProductResponse } from "../types/product"

export async function getProducts(): Promise<ProductResponse> {
  const response = await api.get("/products")
  return response.data
}

export async function getProductById(id: string): Promise<Product> {
  const response = await api.get(`/products/${id}`)
  return response.data
}