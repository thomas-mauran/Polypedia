<script setup>
/* eslint-disable*/

import "@/assets/css/loginSignupForm.css";
import { login } from "@/utils/auth";

import { RouterLink, useRouter } from "vue-router";
import { defineEmits, ref } from "vue";

const emit = defineEmits(["showMessageEvent"]);

const router = useRouter();

const email = ref("");
const password = ref("");

async function tryLogin() {
  const response = await login(email.value, password.value);

  if (!response[0]) {
    emit("showMessageEvent", response[1]);
  } else {
    router.push("books");
  }
}
</script>
<template>
  <article class="verticalDivCentered">
    <form class="verticalDiv" id="form">
      <label for="email">Email</label>
      <input
        type="text"
        id="email"
        placeholder="yourEmail@address.com"
        v-model="email"
        v-on:keyup.enter="tryLogin"

      />

      <label for="password">Password</label>
      <input
      type="password"
        id="password"
        placeholder="veryStrongPassword"
        v-model="password"
        v-on:keyup.enter="tryLogin"
      />

      <div class="horizontalDiv buttonDiv" type="button">
        <button class="purpleBackground btn" @click="tryLogin" type="button">Login</button>
        <p>or</p>
        <RouterLink class="btn purpleOutline" to="signup"
          >Create an account</RouterLink
        >
      </div>
      <!-- <RouterLink class="purpleText" to="resetPassword"
        >forgot my password 😞</RouterLink
      > -->
    </form>
  </article>
</template>
<style scoped></style>
