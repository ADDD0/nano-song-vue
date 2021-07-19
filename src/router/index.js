import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Import from "@/views/Import";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/import",
    name: "Import",
    component: Import,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
