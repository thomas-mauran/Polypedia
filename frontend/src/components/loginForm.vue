<script setup>
/* eslint-disable*/

import '../assets/css/loginSignupForm.css'

import { RouterLink, useRouter } from "vue-router";
import { defineEmits, ref } from "vue";

const emit = defineEmits(["showMessageEvent"]);

const router = useRouter()

const email = ref('')
const password = ref('')

async function login() {
  if (
    email.value === "" ||
    password.value === ""
  ) {
    emit("showMessageEvent", "You need to fill in all the gaps");
  }else {
    const url = `${process.env.VUE_APP_API_URL}/user/login`;

    try{
       fetch(url, {
        method: "POST",

        headers: {"Content-Type": "application/json; charset=UTF-8"},
        body: JSON.stringify({
          "email": email.value,
          "password": password.value
        })
      }).then(async (response ) => {

        let responseMsg = JSON.parse(await response.text())
        if(!response.ok){
        emit('showMessageEvent', responseMsg.error)
      }
      else{
        localStorage.setItem('token', responseMsg.token)
        router.push('home')

      }
      })

      

      } catch(error){
        console.log(error)
        emit("showMessageEvent", error)

      }
  }
}
</script>
<template>
  <article class="verticalDivCentered">
    <form class="verticalDiv" id="form">
      <label for="email">Email</label>
      <input type="text" id="email" placeholder="yourEmail@address.com" v-model="email"/>

      <label for="password">Password</label>
      <input type="text" id="password" placeholder="veryStrongPassword" v-model="password"/>

      <div class="horizontalDiv buttonDiv" type="button">
        <button class="purpleBackground btn" @click="login">Login</button>
        <p>or</p>
        <RouterLink class="btn purpleOutline" to="signup"
          >Create an account</RouterLink
        >
      </div>
      <RouterLink class="purpleText" to="resetPassword"
        >forgot my password 😞</RouterLink
      >
    </form>
  </article>
</template>
<style scoped>

</style>
