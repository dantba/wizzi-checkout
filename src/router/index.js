import { createRouter, createWebHistory } from "vue-router";
import Checkout from "../pages/checkout.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Checkout,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
