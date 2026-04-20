import { defineStore } from "pinia"
import { ref, computed } from "vue"
import type { Product } from "../types/product"

export interface CartItem extends Product {
  quantity: number
}

export const useCartStore = defineStore("cart", () => {
  const items = ref<CartItem[]>([])

  function addToCart(product: Product) {
    const existingItem = items.value.find((item) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      items.value.push({
        ...product,
        quantity: 1
      })
    }
  }

  function removeFromCart(productId: number) {
    items.value = items.value.filter((item) => item.id !== productId)
  }

  function decreaseQuantity(productId: number) {
    const item = items.value.find((item) => item.id === productId)

    if (!item) return

    if (item.quantity > 1) {
      item.quantity -= 1
    } else {
      removeFromCart(productId)
    }
  }

  const totalItems = computed(() =>
    items.value.reduce((total, item) => total + item.quantity, 0)
  )

  const totalPrice = computed(() =>
    items.value.reduce((total, item) => total + item.price * item.quantity, 0)
  )

  return {
    items,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    totalItems,
    totalPrice
  }
})