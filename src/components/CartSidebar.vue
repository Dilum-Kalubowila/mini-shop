<template>
  <Teleport to="body">
    <div
      v-if="cart.isCartOpen"
      class="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
      @click="cart.closeCart()"
    >
      <aside
        class="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
        @click.stop
      >
        <div class="border-b border-slate-200 px-6 py-5">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-bold text-slate-900">Your Cart</h2>
              <p class="text-sm text-slate-500">
                {{ cart.totalItems }} item(s) selected
              </p>
            </div>

            <button
              type="button"
              @click="cart.closeCart()"
              class="rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100"
            >
              ✕
            </button>
          </div>
        </div>

        <div v-if="cart.items.length === 0" class="flex flex-1 items-center justify-center px-6">
          <div class="text-center">
            <div class="mb-4 text-5xl">🛍️</div>
            <h3 class="text-lg font-bold text-slate-900">Your cart is empty</h3>
            <p class="mt-2 text-sm text-slate-500">
              Add some beautiful products to get started.
            </p>
          </div>
        </div>

        <div v-else class="flex flex-1 flex-col overflow-hidden">
          <div class="flex-1 space-y-4 overflow-y-auto px-6 py-5">
            <div
              v-for="item in cart.items"
              :key="item.id"
              class="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div class="flex gap-4">
                <img
                  :src="item.thumbnail"
                  :alt="item.title"
                  class="h-20 w-20 rounded-xl object-cover"
                />

                <div class="min-w-0 flex-1">
                  <div class="flex items-start justify-between gap-3">
                    <div>
                      <h3 class="line-clamp-1 text-base font-semibold text-slate-900">
                        {{ item.title }}
                      </h3>
                      <p class="mt-1 text-sm text-slate-500">
                        {{ formatCurrency(item.price) }} each
                      </p>
                    </div>

                    <button
                      type="button"
                      @click="cart.removeFromCart(item.id)"
                      class="text-sm font-medium text-rose-500 transition hover:text-rose-600"
                    >
                      Remove
                    </button>
                  </div>

                  <div class="mt-4 flex items-center justify-between">
                    <div class="flex items-center rounded-full border border-slate-200 bg-white px-2 py-1">
                      <button
                        type="button"
                        @click="cart.decreaseQuantity(item.id)"
                        class="flex h-8 w-8 items-center justify-center rounded-full text-lg text-slate-700 transition hover:bg-slate-100"
                      >
                        −
                      </button>

                      <span class="min-w-8 text-center text-sm font-semibold text-slate-900">
                        {{ item.quantity }}
                      </span>

                      <button
                        type="button"
                        @click="cart.addToCart(item)"
                        class="flex h-8 w-8 items-center justify-center rounded-full text-lg text-slate-700 transition hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>

                    <p class="text-base font-bold text-slate-900">
                      {{ formatCurrency(item.price * item.quantity) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="border-t border-slate-200 bg-white px-6 py-5">
            <div class="space-y-3 text-sm">
              <div class="flex items-center justify-between text-slate-600">
                <span>Subtotal</span>
                <span>{{ formatCurrency(cart.subtotal) }}</span>
              </div>

              <div class="flex items-center justify-between text-slate-600">
                <span>Shipping</span>
                <span>{{ formatCurrency(cart.shipping) }}</span>
              </div>

              <div class="flex items-center justify-between border-t border-dashed border-slate-200 pt-3 text-lg font-bold text-slate-900">
                <span>Total</span>
                <span>{{ formatCurrency(cart.grandTotal) }}</span>
              </div>
            </div>

            <div class="mt-5 grid grid-cols-2 gap-3">
              <button
                type="button"
                @click="cart.clearCart()"
                class="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Clear Cart
              </button>

              <button
                type="button"
                class="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useCartStore } from "../stores/cart"
import { formatCurrency } from "../utils/format"

const cart = useCartStore()
</script>