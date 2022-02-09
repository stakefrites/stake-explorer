import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Validators from "../views/Validators.vue";
import ChainSelect from "../views/ChainSelect.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  { path: "/chain-select", name: "ChainSelect", component: ChainSelect },
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
