import { computed, ref, watch } from "vue"
import { defineStore } from "pinia"
import type { Product } from "../types/product"

export interface CartItem extends Product {
  quantity: number
}

const CART_STORAGE_KEY = "mini-shop-cart"

function getSavedCart(): CartItem[] {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (!savedCart) return []
    return JSON.parse(savedCart) as CartItem[]
  } catch (error) {
    console.error("Failed to load cart:", error)
    return []
  }
}

export const useCartStore = defineStore("cart", () => {
  const items = ref<CartItem[]>(getSavedCart())
  const isCartOpen = ref(false)

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

    isCartOpen.value = true
  }

  function removeFromCart(productId: number) {
    items.value = items.value.filter((item) => item.id !== productId)
  }

  function decreaseQuantity(productId: number) {
    const item = items.value.find((cartItem) => cartItem.id === productId)

    if (!item) return

    if (item.quantity > 1) {
      item.quantity -= 1
    } else {
      removeFromCart(productId)
    }
  }

  function clearCart() {
    items.value = []
  }

  function toggleCart() {
    isCartOpen.value = !isCartOpen.value
  }

  function openCart() {
    isCartOpen.value = true
  }

  function closeCart() {
    isCartOpen.value = false
  }

  const totalItems = computed(() =>
    items.value.reduce((total, item) => total + item.quantity, 0)
  )

  const subtotal = computed(() =>
    items.value.reduce((total, item) => total + item.price * item.quantity, 0)
  )

  const shipping = computed(() => (items.value.length > 0 ? 12 : 0))
  const grandTotal = computed(() => subtotal.value + shipping.value)

  watch(
    items,
    (newItems) => {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems))
      } catch (error) {
        console.error("Failed to save cart:", error)
      }
    },
    { deep: true }
  )

  return {
    items,
    isCartOpen,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    totalItems,
    subtotal,
    shipping,
    grandTotal
  }
})