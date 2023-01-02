<script setup>
import signupForm from "@/components/signupForm.vue";

import { ref } from "vue";

const showMessage = ref("");

function changeMessage(m) {
  console.log(m);
  showMessage.value = m;
}
</script>

<template>
  <div class="horizontalDiv">
    <section id="leftSection">
      <div class="horizontalDiv" id="logoDiv">
        <img src="@/assets/book.png" alt="opened book image" id="bookImg" />
        <h1 id="polypediaTitle">Polypedia</h1>
      </div>

      <div class="verticalDivCentered">
        <h1 class="bigTitle" id="title">Create an account</h1>
        <div id="formDiv">
          <h5>{{ showMessage }}</h5>

          <signupForm @showMessageEvent="(msg) => changeMessage(msg)" />
        </div>
      </div>
    </section>
    <section id="rightSection">
      <img src="@/assets/undraw_signup.png" alt="Girl reading a library" />
    </section>
  </div>
</template>

<style scoped>
#formDiv {
  text-align: center;
  margin-top: 10vh;
}

#formDiv h5 {
  color: red;
}

#logoDiv {
  vertical-align: middle;
  margin-top: 1vh;
}

#bookImg {
  width: 40px;
  margin: 0px 20px;
}

#polypediaTitle {
  color: #5054cb;
  margin-top: auto;
  margin-bottom: auto;
  font-family: "Jost", sans-serif;
}

#title {
  margin-top: 5vh;
}

section {
  width: 50%;
  height: 100vh;
}

#leftSection {
  background-color: #e7e7e7;
  text-align: left;
}
#rightSection img {
  display: flex;
  margin-top: 27vh;
  width: 40vw;
  min-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

@media only screen and (max-width: 800px) {
  #rightSection {
    display: none;
  }
  #leftSection {
    width: 100vw;
  }
}
</style>
