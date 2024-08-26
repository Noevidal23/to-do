import { createWebHistory, createRouter } from "vue-router";

import HomeView from "../views/index.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/task",
      name: "task",
      component: () => import("../views/taskForm.vue"),
    },
  ],
});

export default router;
