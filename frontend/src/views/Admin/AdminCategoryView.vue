<script setup>
import { ref, onBeforeMount } from "vue";
import { RouterLink, useRoute } from "vue-router";

import adminTable from "@/components/admin/adminTable";

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
  
  // We bypass for books since it's already coded and very specific case 
  if(currentCategory.value === "books"){
    createUrl.value = "/upload"
  }else{
    createUrl.value = `/admin/${route.params.category}/create`;
  }
});
</script>
<template>
  <section class="verticalDiv">
    <h5 id="message" v-if="showMessage !== ''">{{ showMessage }}</h5>

    <div class="horizontalDiv">
      <h1 id="title">{{ currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1) }} panel</h1>

      <RouterLink  :to="createUrl"><img id="createBtn" src="@/assets/createBtn.png" alt="create a new element" /></RouterLink>
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
  margin: 10px auto;
  color: white;
  border-radius: 10px;
  background-color: rgb(42, 146, 42);
}
</style>
