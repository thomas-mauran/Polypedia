<script setup>
/* eslint-disable */

import bookCard from "@/components/books/bookCard.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import loadingGif from "@/components/loadingGif.vue"

const bookList = ref([]);
const urlBook = `${process.env.VUE_APP_API_URL}/books/likedBooks/${localStorage.getItem("AUTH_TOKEN_KEY")}`;
const loading = ref(true)

async function getBook() {
  loading.value = true

  axios
    .get(urlBook, {
      headers: {
        "x-access-token": `${localStorage.getItem("AUTH_TOKEN_KEY")}`,
      },
    })
    .then(async (response) => {
      response.data.forEach((element) => {
        element.image = "data:image/jpeg;base64," + element.image;
      });
      bookList.value = response.data;
      loading.value = false

    })
    .catch((error) => {
      console.log(error);
      bookList.value = [];
      loading.value = false

    });

}

onMounted(() => {
  getBook();
});
</script>
<template>
  <section>
    <loadingGif v-if="loading"/>

    <div class="noBooksDiv" v-if="bookList.length < 1">
      <img id="noBookImg" src="@/assets/noLikesAnimation.gif" alt="Books not found gif of a book getting stealed by an ovni" />

      <h2>You did not like any book yet !</h2>
    </div>

    <div v-else>
      <h1>Books you liked</h1>

      <section>
        <bookCard
          v-for="book in bookList"
          :key="book.book_id"
          :bookId="book.book_id"
          :imgPath="book.image"
          imgAlt="Thumbnail of the book"
          :bookTitle="book.title" />
      </section>
    </div>
  </section>
</template>
<style scoped>
h1 {
  margin-top: 40px;
}

section {
  margin-top: 5vh;
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
}

.noBooksDiv {
  margin-top: 200px;
  color: #5356b8;
}

#noBookImg {
  max-width: 30vw;
  min-width: 300px;
}
</style>
