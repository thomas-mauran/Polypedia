<script setup>
import { ref, onBeforeMount } from "vue";
import { RouterLink, useRoute } from "vue-router";

import adminTable from "../components/adminTable.vue";

const route = useRoute();

const currentCategory = ref("");
const createUrl = ref("");
const showMessage = ref("");

function changeMessage(m) {
  window.scrollTo(0, 0);
  showMessage.value = `${currentCategory.value} with id ${m} has been successfully deleted`;
}

onBeforeMount(() => {
  currentCategory.value = route.params.category;
  createUrl.value = `/admin/${route.params.category}/create`;
});
</script>
<template>
  <section class="verticalDiv">
    <div class="horizontalDiv">
      <h1 id="title">{{ currentCategory }} pannel</h1>

      <h5 id="message" v-if="showMessage !== ''">{{ showMessage }}</h5>
      <RouterLink  :to="createUrl"><img id="createBtn" src="../assets/createBtn.png" alt="create a new element" /></RouterLink>
    </div>
    <adminTable @showMessageEventPass="(msg) => changeMessage(msg)" :category="currentCategory" />
  </section>
</template>

<style scoped>


.verticalDiv {
  align-items: center;
}
#createBtn {
  width: 30px;
  margin: 0px 20px;
}

.createDiv {
  margin: 2vh;
}

a {
  color: black;
  text-decoration: none;
  margin-top: auto;
  margin-bottom: auto;
}
#title {
  margin: 5vh 0px 5vh 40px;
  width: fit-content;
}

#message {
  padding: 20px 10px;
  width: 30%;
  font-size: 1em;
  margin: 30px auto;
  color: white;
  border-radius: 10px;
  background-color: rgb(42, 146, 42);
}
</style>
