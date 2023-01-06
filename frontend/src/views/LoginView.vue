<script setup>
import loginForm from "@/components/loginForm.vue";

import { ref } from "vue";

const showMessage = ref("");

function changeMessage(m) {
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
        <h1 class="bigTitle" id="title">Welcome back</h1>
        <div id="formDiv">
          <h5>{{ showMessage }}</h5>

          <loginForm @showMessageEvent="(msg) => changeMessage(msg)" id="formComponent" />
        </div>
      </div>
    </section>
    <section id="rightSection">
      <img src="@/assets/undraw_library.png" alt="Girl reading a library" />
    </section>
  </div>
</template>

<style scoped>
#formDiv {
  text-align: center;
  margin-top: 20vh;
}

#formDiv h5 {
  color: red;
}

#logoDiv {
  vertical-align: middle;
  margin-top: 1vh;
}

#bookImg {
  margin: auto 20px;
  width: 40px;
}

#polypediaTitle {
  background-image: linear-gradient(90deg, rgba(30, 9, 121, 1) 0%, rgba(109, 67, 255, 1) 0%, rgba(136, 157, 252, 1) 100%);
  background-size: 100%;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-top: auto;
  margin-bottom: auto;
  font-family: "Jost", sans-serif;
  font-size: 1.7em;
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

@media only screen and (max-width: 900px) {
  #rightSection {
    display: none;
  }
  #leftSection {
    width: 100vw;
  }

}
</style>
