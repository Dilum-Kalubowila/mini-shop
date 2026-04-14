import { api } from "./api"
import type { ProductResponse } from "../types/product"

export async function getProducts(): Promise<ProductResponse> {
  const response = await api.get("/products")
  return response.data
}