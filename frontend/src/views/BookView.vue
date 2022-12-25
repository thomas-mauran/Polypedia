<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { Slide } from "vue3-burger-menu";

import BurgerLabel from "../components/burgerLabel.vue";

const route = useRoute();

const bookInfo = ref("");
const bookAuthors = ref([]);
const bookTags = ref([]);

const pdfData = ref(null);

// const numPages = ref(0);
const urlBook = `${process.env.VUE_APP_API_URL}/book/${route.params.id}`;

console.log(urlBook);

async function fetchBook() {
  axios
    .get(urlBook, {
      headers: {
        "x-access-token": `${localStorage.getItem("AUTH_TOKEN_KEY")}`,
      },
    })
    .then(async (response) => {
      bookInfo.value = response.data;
      bookAuthors.value = response.data.authors[0];
      bookTags.value = response.data.tags;
      let pdf = await response.data.pdfFile.data;

      const pdfBuffer = await new Uint8Array(pdf);
      const blob = new Blob([pdfBuffer], { type: "application/pdf" });
      pdfData.value = URL.createObjectURL(blob);
      console.log(bookInfo.value);
    })
    .catch((error) => {
      console.log(error);
    });
}

onMounted(() => {
  fetchBook();
});
</script>
<template>
  <section id="container">
    <object :data="pdfData" type="application/pdf" class="pdfLoader"></object>
    <Slide isOpen="true" left width="400">
      <div class="verticalDiv">
        <h1>Informations</h1>

        <BurgerLabel title="Title" :text="bookInfo.title" />
        <BurgerLabel isBig title="Author" :text="bookAuthors.fullname" />
        <BurgerLabel isBig title="Description" :text="bookInfo.description" />
        <BurgerLabel title="Number of pages" :text="bookInfo.number_of_pages" />
        <BurgerLabel title="Tags" isBig prettyLabel :list="bookTags" />
        <BurgerLabel title="Language" :text="bookInfo.language_name" />
        <BurgerLabel title="Likes" :text="bookInfo.number_of_likes" />
      </div>
    </Slide>
  </section>
</template>

<style >


.bm-burger-button {
  top: 110px;
}

.bm-burger-bars {
  background-color: #8185e4;
}

.bm-menu {
  margin-top: 8vh;
  background-color: #dbdcf6;
}
.bm-overlay {
  background: rgba(0, 0, 0, 0);
}
.bm-cross {
  background: black;
}

.bm-item-list > * {
  color: black;
}
.bm-item-list h1 {
  margin-bottom: 20px;
  font-size: 1.8em;
  text-decoration: underline 2px;
}

.bm-item-list h2 {
  font-size: 1.4em;
}

#container {
  height: 90vh;
}
.pdfLoader {
  margin: 20px;
  width: 50%;
  height: 95%;
}


</style>
