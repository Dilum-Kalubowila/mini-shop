import { createRouter, createWebHistory } from "vue-router"
import Home from "../pages/Home.vue"
import ProductDetail from "../pages/ProductDetail.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/product/:id",
      component: ProductDetail
    }
  ]
})

export default router