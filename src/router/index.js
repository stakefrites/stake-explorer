import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Validators from "../views/Validators.vue";
import Validator from "../views/Validator.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/validators",
    name: "Validators",
    component: Validators,
  },
  {
    path: "/validator/:address",
    name: "Validator",
    component: Validator,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
