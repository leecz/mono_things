import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
// 1. Define route components.
// These can be imported from other files
const Home = { template: "<div>Home</div>" };
const About = { template: "<div>About</div>" };

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const constantRoutes: Array<RouteRecordRaw> = [
  { path: "/", component: Home },
  {
    path: "/login",
    component: () => import("@/views/login/"),
    meta: { hidden: true },
  },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const routes = [...constantRoutes];
export const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});
