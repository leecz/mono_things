import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const constantRoutes: Array<RouteRecordRaw> = [
  { path: "/", component: () => import("@/views/home/Home.vue") },
  { path: "/girl", component: () => import("@/views/girl/Girl.vue") },
  { path: "/cube", component: () => import("@/views/simple/Cube.vue") },
  { path: "/cube2", component: () => import("@/views/simple/Cube2.vue") },
];

const routes = [...constantRoutes];
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

