<script setup>
/* eslint-disable */

import bookCard from "@/components/books/bookCard.vue";
import loadingGif from "@/components/loadingGif.vue";

import axios from "axios";
import { onMounted, ref, watch, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const bookList = ref([]);
const urlBook = `${process.env.VUE_APP_API_URL}/books/search`;

const bookTitle = ref("");
const loading = ref(true);
const text = ref("");

const url = computed(() => {
  return `/books/${text.value}`;
});

function searchBook() {
  router.push(url.value);
}
watch(
  () => route.params.bookTitle,
  (newValue) => {
    bookTitle.value = newValue;
    getBook(bookTitle.value);
  }
);

if (bookTitle !== route.params.bookTitle) getBook();

async function getBook(title) {
  loading.value = true;

  axios
    .get(urlBook, {
      headers: {
        "x-access-token": `${localStorage.getItem("AUTH_TOKEN_KEY")}`,
        booktitle: `${title.toLowerCase()}`,
      },
    })
    .then(async (response) => {
      response.data.forEach((element) => {
        element.image = "data:image/jpeg;base64," + element.image;
      });
      bookList.value = response.data;
      loading.value = false;
    })
    .catch((error) => {
      console.log(error);
      bookList.value = [];
      loading.value = false;
    });
}

onMounted(() => {
  getBook(route.params.bookTitle);
});
</script>
<template>
  <section class="verticalDiv">
    <loadingGif v-if="loading" />
    <h1 v-if="bookTitle === ''">Latest books</h1>
    <h1 v-else>Search result</h1>

    <div class="horizontalDiv mobileSearchbar">
        <input type="text" placeholder="Search a book" id="searchBar" v-model="text" v-on:keyup.enter="searchBook" />
        <RouterLink :to="url" id="searchBtn"
          ><img id="searchIcon" src="@/assets/navbar/searchLogo.png" alt="loop icon for search button"
        /></RouterLink>
      </div>

    <div class="noBooksDiv" v-if="bookList.length < 1">
      <img id="noBookImg" src="@/assets/404noBooks.gif" alt="Books not found gif of a book getting stealed by an ovni" />

      <h2>404 No books found with this title</h2>
    </div>

    <div v-else class="mainDiv">


      <p id="numberOfResults" v-if="bookList.length !== 0 && bookTitle !== ''">{{bookList.length}} books found</p>
      <section class="booksList">
        <bookCard
          v-for="book in bookList"
          :key="book.id"
          :bookId="book.id"
          :imgPath="book.image"
          imgAlt="Thumbnail of the book"
          :bookTitle="book.title" />
      </section>
    </div>
  </section>
</template>
<style scoped>

#numberOfResults{
  margin-top: 20px;
  font-size: 1.3em;
}

.mainDiv{
  width: 100%;
}
#searchBar{
  height: 3vh;
  width: 80%;
  border: none;
  border-bottom: 2px solid black;
}
#searchIcon {
  min-width: 30px;
  width: 4vw;
  cursor: pointer;
}

#searchBtn {
  margin-top: auto;
  height: fit-content;
  width: fit-content;
  background-color: transparent;
  border: none;
}

.mobileSearchbar {
  display: none;
  width: 100%;
}

h1 {
  margin-bottom: 20px;
  font-family: "Jost", sans-serif;
  font-size: 1.7em;
}

section {
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
}

.booksList{
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
  min-width: 400px;
}



@media only screen and (max-width: 1000px) {
  .mobileSearchbar {
    display: block;
  }
}
</style>
