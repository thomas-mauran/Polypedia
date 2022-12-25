/* eslint-disable*/
import { createRouter, createWebHashHistory } from "vue-router";
import LoginView from "../views/LoginView";
import SignupView from "../views/SignupView";
import AccountView from "../views/AccountView";
import BooksView from "../views/BooksView";
import UploadView from "../views/UploadBook";
import BookView from "../views/BookView";
import LikedBooksView from "../views/LikedBooksView";
import AdminPannelView from "../views/AdminPannelView";

import { isLoggedIn } from "../utils/auth";

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
      component: BooksView,
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
      beforeEnter(to, from, next) {

        const url = `${process.env.VUE_APP_API_URL}/user/isAdmin/${localStorage.getItem("USER_ID")}`;
        axios
          .get(url, {
            headers: {
              "x-access-token": `${localStorage.getItem("AUTH_TOKEN_KEY")}`,
            },
          })
          .then(async (response) => {
            
            if(response.status !== 200) next({name: "/books"})
            next()
          })
          .catch((error) => {
            next({name: "/books"})
          });
      },
      component: AdminPannelView,
      meta: { navbar: true },
    },
  ],
});

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
