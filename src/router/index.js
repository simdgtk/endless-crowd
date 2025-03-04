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
  ],
});

export default router;
