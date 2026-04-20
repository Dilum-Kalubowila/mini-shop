<template>
  <div class="bg-white rounded-xl shadow-md p-4">
    <h2 class="text-xl font-bold text-blue-600 mb-4">
      Shopping Cart
    </h2>

    <div v-if="cart.items.length === 0" class="text-gray-500">
      Cart is empty.
    </div>

    <div v-else>
      <div
        v-for="item in cart.items"
        :key="item.id"
        class="border-b border-gray-200 py-3"
      >
        <h3 class="font-semibold text-gray-800">
          {{ item.title }}
        </h3>

        <p class="text-sm text-gray-500">
          ${{ item.price }} × {{ item.quantity }}
        </p>

        <div class="flex gap-2 mt-2">
          <button
            @click="cart.decreaseQuantity(item.id)"
            class="px-3 py-1 bg-yellow-500 text-white rounded"
          >
            -
          </button>

          <button
            @click="cart.addToCart(item)"
            class="px-3 py-1 bg-green-600 text-white rounded"
          >
            +
          </button>

          <button
            @click="cart.removeFromCart(item.id)"
            class="px-3 py-1 bg-red-600 text-white rounded"
          >
            Remove
          </button>
        </div>
      </div>

      <div class="mt-4 pt-4 border-t border-gray-300">
        <p class="font-semibold text-gray-700">
          Total Items: {{ cart.totalItems }}
        </p>
        <p class="font-bold text-blue-600 text-lg">
          Total Price: ${{ cart.totalPrice.toFixed(2) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "../stores/cart"

const cart = useCartStore()
</script>