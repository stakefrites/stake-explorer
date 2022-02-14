import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Validators from "../views/Validators.vue";
import Wallet from "../views/Wallet.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  { path: "/wallet", name: "Wallet", component: Wallet },
  {
    path: "/validators",
    name: "Validators",
    component: Validators,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
