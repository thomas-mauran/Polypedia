/* eslint-disable*/
import { createRouter, createWebHashHistory } from "vue-router";
import LoginView from "@/views/LoginView";
import SignupView from "@/views/SignupView";
import AccountView from "@/views/AccountView";
import UploadView from "@/views/Books/UploadBook";
import BookView from "@/views//Books/BookView";
import BookList from "@/views/Books/BookList";
import LikedBooksView from "@/views/Books/LikedBooksView";
import AdminPannelView from "@/views/Admin/AdminPannelView";
import AdminCategory from "@/views/Admin/AdminCategoryView";
import AdminCreateUpdateView from "@/views/Admin/AdminCreateUpdateView";
import notFoundView from "@/views/NotFoundView"

import { isLoggedIn } from "@/utils/auth";

import axios from "axios"

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "default",
      component: LoginView,
      meta: { allowAnonymous: true },
    },

    {
      path: "/books/:bookTitle?",
      name: "Books",
      component: BookList,
      meta: { navbar: true },
    },

    {
      path: "/likedBooks",
      name: "Liked",
      component: LikedBooksView,
      meta: { navbar: true },
    },

    {
      path: "/login",
      name: "Login",
      component: LoginView,
      meta: { allowAnonymous: true },
    },

    {
      path: "/signup",
      name: "Signup",
      component: SignupView,
      meta: { allowAnonymous: true },
    },

    {
      path: "/account",
      name: "Account",
      component: AccountView,
      meta: { navbar: true },
    },

    {
      path: "/upload",
      name: "Upload",
      component: UploadView,
      meta: { navbar: true },
    },
    {
      path: "/book/:id",
      name: "Book",
      component: BookView,
      meta: { navbar: true },
    },
    {
      path: "/admin",
      name: "Admin Pannel",
      beforeEnter(to, from, next) {beforeEnterAdmin(to, from, next)},
      component: AdminPannelView,
      meta: { navbar: true },
    },
    {
      path: "/admin/:category",
      name: "Admin category",
      beforeEnter(to, from, next) {beforeEnterAdmin(to, from, next)},
      component: AdminCategory,
      meta: { navbar: true },
    },
    {
      path: "/admin/:category/:action/:id?",
      name: "Admin create update",
      beforeEnter(to, from, next) {beforeEnterAdmin(to, from, next)},
      component: AdminCreateUpdateView,
      meta: { navbar: true },
    },
    {
      path: "/:pathMatch(.*)",
      name: "NotFound",
      meta: { navbar: true },
      component: notFoundView,
    },
  ],
});

function beforeEnterAdmin(to, from, next) {

  const url = `${process.env.VUE_APP_API_URL}/users/isAdmin/${localStorage.getItem("USER_ID")}`;
  axios
    .get(url, {
      headers: {
        "x-access-token": `${localStorage.getItem("AUTH_TOKEN_KEY")}`,
      },
    })
    .then(async (response) => {
      
      if(response.status !== 200) next({path: "/NotFound"})
      next()
    })
    .catch((error) => {
      console.log("test")
      next({path: "/NotFound"})
    });
}

router.beforeEach(async (to, from, next) => {
  if (!to.meta.allowAnonymous && !isLoggedIn()) {
    localStorage.removeItem("AUTH_TOKEN_KEY");
    localStorage.removeItem("USER_ID");
    localStorage.removeItem("IS_ADMIN");
    next({ name: "Login" });
  }

  next();
});

export default router;
