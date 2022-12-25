<script setup>
/* eslint-disable */

import bookCard from "@/components/bookCard.vue";
import axios from "axios";
import { onMounted, ref } from "vue";

const bookList = ref([]);
const urlBook = `${process.env.VUE_APP_API_URL}/book/likedBooks/${localStorage.getItem("AUTH_TOKEN_KEY")}`;

async function getBook() {
  axios
    .get(urlBook, {
      headers: {
        "x-access-token": `${localStorage.getItem("AUTH_TOKEN_KEY")}`,
      },
    })
    .then(async (response) => {
      console.log("test");
      response.data.forEach((element) => {
        element.image = "data:image/jpeg;base64," + element.image;
      });
      bookList.value = response.data;
      console.log(bookList.value);
    })
    .catch((error) => {
      console.log(error);
      bookList.value = [];
    });
}

onMounted(() => {
  getBook();
});
</script>
<template>
  <div>
    <div class="noBooksDiv" v-if="bookList.length < 1">
      <img id="noBookImg" src="../assets/noLikesAnimation.gif" alt="Books not found gif of a book getting stealed by an ovni" />

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
  </div>
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
}
</style>
