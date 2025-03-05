import { createRouter, createWebHistory } from "vue-router";

import MainContainer from "../views/MainContainer.vue";
import LegalsAndCredit from "../views/LegalsAndCredit.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "MainContainer", component: MainContainer },
    {
      path: "/mentions-legales-credits",
      name: "LegalsAndCredit",
      component: LegalsAndCredit,
    },
    {
      path: "/mentions-legales",
      redirect: { name: "LegalsAndCredit" },
    },
    {
      path: "/credits",
      redirect: { name: "LegalsAndCredit" },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      redirect: { name: "MainContainer" },
    },
  ],
});

export default router;
