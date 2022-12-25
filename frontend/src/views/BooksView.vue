<script setup>
/* eslint-disable */

import bookCard from "@/components/bookCard.vue";
import axios from "axios";
import { onMounted, ref, watch} from "vue";
import {useRoute } from "vue-router"


const route = useRoute()

const bookList = ref([]);
const urlBook = `${process.env.VUE_APP_API_URL}/book/search`;

const bookTitle = ref("")

watch(() => route.params.bookTitle, newValue => {
  bookTitle.value = newValue
  getBook(bookTitle.value)
})

if(bookTitle !== route.params.bookTitle) getBook()


async function getBook(title) {


  axios
    .get(urlBook,  {
      headers: {
        "x-access-token": `${localStorage.getItem("AUTH_TOKEN_KEY")}`,
        "booktitle": `${title.toLowerCase()}`,

      },
    })
    .then(async (response) => {

      
        console.log("test")
        response.data.forEach((element) => {
        element.image = "data:image/jpeg;base64," + element.image;

      });
      bookList.value = response.data;
      console.log(bookList.value)

    })
    .catch((error) => {
      console.log(error);
      bookList.value = []

    });
}

onMounted(() => {
  
  getBook(route.params.bookTitle);
});
</script>
<template>
  <div>

    <div class="noBooksDiv" v-if="bookList.length < 1" >
      <img id="noBookImg" src="../assets/404noBooks.gif" alt="Books not found gif of a book getting stealed by an ovni">

      <h2 >404 No books found with this title</h2>
    </div>

    <div v-else>
    <h1>Latest books</h1>

    <section>
      <bookCard
        v-for="book in bookList"
        :key="book.id"
        :bookId="book.id"
        :imgPath="book.image"
        imgAlt="Thumbnail of the book"
        :bookTitle="book.title"
      />
    </section>
  </div>
  </div>
</template>
<style scoped>

h1{
  margin-top: 40px;
}

section {
  margin-top: 5vh;
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
}

.noBooksDiv{
  margin-top: 200px;
  color: #5356b8;
}

#noBookImg{
  max-width: 30vw;
}


</style>
