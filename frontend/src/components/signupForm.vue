<script setup>
import "@/assets/css/loginSignupForm.css";
import { RouterLink, useRouter } from "vue-router";
import { ref, defineEmits } from "vue";

const router = useRouter();

const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const checkbox = ref(false);

const emit = defineEmits(["showMessageEvent"]);

async function createAccount() {
  if (username.value === "" || email.value === "" || password.value === "" || confirmPassword.value === "") {
    emit("showMessageEvent", "You need to fill in all the gaps");
  } else if (checkbox.value === false) {
    emit("showMessageEvent", "You need to check the polypedia conditions at the bottom");
  } else if (password.value !== confirmPassword.value) {
    emit("showMessageEvent", "Both passwords aren't matching");
  } else {
    const url = `${process.env.VUE_APP_API_URL}/users`;

    try {
      fetch(url, {
        method: "POST",

        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          username: username.value,
          email: email.value,
          password: password.value,
        }),
      }).then(async (response) => {
        let responseText = await response.text();

        let responseMsg = responseText.error ? responseText.error : responseText;
        if (!response.ok) {
          emit("showMessageEvent", responseMsg);
        } else {
          router.push("login");
          emit("showMessageEvent", "account created");
        }
      });
    } catch (error) {
      console.log(error);
      emit("showMessageEvent", error);
    }
  }
}
</script>
<template>
  <article class="verticalDivCentered">
    <form class="verticalDiv" id="form">
      <label for="username">Username</label>
      <input type="text" name="username" id="username" placeholder="coolUsername1234" v-model="username" v-on:keyup.enter="createAccount" />

      <label for="email">Email</label>
      <input type="text" name="email" id="email" placeholder="yourEmail@address.com" v-model="email" v-on:keyup.enter="createAccount" />

      <label for="password">Password</label>
      <input type="password" name="password" id="password" placeholder="veryStrongPassword" v-model="password" v-on:keyup.enter="createAccount" />

      <label for="passwordConfirm">Confirm password</label>
      <input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="veryStrongPassword" v-model="confirmPassword" v-on:keyup.enter="createAccount" />

      <div id="confirmRights">
        <p>I am the owner of the file I will upload on polypedia:</p>
        <input id="checkboxInput" type="checkbox" v-model="checkbox" />
      </div>
      <div class="horizontalDiv buttonDiv" type="button">
        <button class="btn purpleBackground" type="button" @click="createAccount">Create the account</button>
      </div>
      <RouterLink class="purpleText" to="login">I already have an account </RouterLink>
    </form>
  </article>
</template>
<style scoped>
#confirmRights {
  max-width: 300px;
}

#confirmRights p {
  font-size: 0.8em;
  font-weight: bold;
  text-align: left;
  margin-left: 0px;
  margin-top: 30px;
}

#checkboxInput {
  margin-top: 5px;
  margin-right: 200px;
  width: 1.3em;
  height: 1.3em;
}
</style>
