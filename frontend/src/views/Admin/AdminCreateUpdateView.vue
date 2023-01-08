<script setup>
import { useRoute } from "vue-router";
import { onBeforeMount, ref } from "vue";

import adminCreateForm from "@/components/admin/adminCreateForm.vue";
import adminUpdateForm from "@/components/admin/adminUpdateForm.vue";
import bookUpdate from "@/components/books/bookUpdate.vue";

const route = useRoute();

const id = route.params.id;
const action = route.params.action;
const category = route.params.category;
const showMessage = ref("");

function changeMessage(m) {
  window.scrollTo(0, 0);
  showMessage.value = m;
}

onBeforeMount(async () => {});
</script>
<template>
  <!-- If the action is create  -->
  <section>
    <h5>{{ showMessage }}</h5>

    <h1>{{ action }} {{ category }}</h1>
    <adminCreateForm @showMessageEvent="(msg) => changeMessage(msg)" v-if="action === 'create'" :category="category" />
    <adminUpdateForm @showMessageEvent="(msg) => changeMessage(msg)" v-if="action === 'update' && category !== 'books'" :category="category" :id="id" />
    <bookUpdate
      @showMessageEvent="(msg) => changeMessage(msg)"
      v-else-if="action === 'update' && category === 'books'"
      :category="category"
      :id="id" />
  </section>
</template>
<style scoped>
section {
  margin-top: 30px;
}

h5 {
  color: rgb(206, 103, 103);
  font-size: 1.2em;
}
</style>
