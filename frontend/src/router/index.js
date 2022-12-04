import { createRouter, createWebHashHistory } from "vue-router";
import LoginView from "../views/LoginView";
import SignupView from "../views/SignupView";

import HomeView from "../views/HomeView";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
        meta: { navbar: true },
      path: "/home",
      name: "home",
      component: HomeView,
    },

    {
      path: "/login",
      name: "Login vue",
      component: LoginView,
    },

    {
      path: "/signup",
      name: "Signup vue",
      component: SignupView,
    },
    // { path: "/", name: "Login vue", component: LoginView },

  ],
});

export default router;
