import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const constantRoutes: Array<RouteRecordRaw> = [
  { path: "/", component: () => import("@/views/home/Home.vue") },
];

const routes = [...constantRoutes];
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

