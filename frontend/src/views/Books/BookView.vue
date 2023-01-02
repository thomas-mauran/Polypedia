<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { Slide } from "vue3-burger-menu";

import BurgerLabel from "@/components/burgerLabel.vue";
import loadingGif from "@/components/loadingGif.vue"

const route = useRoute();

const bookInfo = ref("");
const bookAuthors = ref([]);
const bookTags = ref([]);

const pdfData = ref(null);

const isLiked = ref(false);
const token = localStorage.getItem("AUTH_TOKEN_KEY");
const loading = ref(true)


// const numPages = ref(0);
const urlBook = `${process.env.VUE_APP_API_URL}/books/${route.params.id}`;


async function fetchBook() {
  loading.value = true;

  axios
    .get(
      urlBook,
      {
        headers: {
          "x-access-token": `${localStorage.getItem("AUTH_TOKEN_KEY")}`,
        },
      }
    )
    .then(async (response) => {
      bookInfo.value = response.data
      bookTags.value = response.data.tags;
      isLiked.value = response.data.isLiked;
      bookAuthors.value = response.data.authors.length > 0 ? response.data.authors[0] : "undefined";

      let pdf = await response.data.pdfFile.data;

      const pdfBuffer = await new Uint8Array(pdf);
      const blob = new Blob([pdfBuffer], { type: "application/pdf" });
      pdfData.value = URL.createObjectURL(blob);
      loading.value = false;

    })
    .catch((error) => {
      loading.value = false;

      console.log(error);
    });
}

function likeBook() {
  isLiked.value = !isLiked.value;

  // We like the book
  if (isLiked.value) {
    bookInfo.value.number_of_likes += 1;
    const url = `${process.env.VUE_APP_API_URL}/books/like/${bookInfo.value.id}`;

    axios
      .post(
        url,
        { userToken: token },
        {
          headers: {
            "x-access-token": `${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.status);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // We unlike the book
  else {
    bookInfo.value.number_of_likes -= 1;
    const url = `${process.env.VUE_APP_API_URL}/books/unlike/${bookInfo.value.id}`;

    axios
      .post(
        url,
        { userToken: token },
        {
          headers: {
            "x-access-token": `${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.status);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

onMounted(() => {

  fetchBook();

});
</script>
<template>
  <section id="container">
    <loadingGif v-if="loading"/>

    <object :data="pdfData" type="application/pdf" class="pdfLoader"></object>
    <Slide noOverlay disableOutsideClick isOpen="true" left width="400">
      <div class="verticalDiv">
        <h1>Informations</h1>

        <BurgerLabel isBig title="Title" :text="bookInfo.title" />
        <BurgerLabel title="Title" :text="bookInfo.id" />
        <BurgerLabel isBig title="Author" :text="bookAuthors.fullname" />
        <BurgerLabel isBig title="Description" :text="bookInfo.description" />
        <BurgerLabel title="Number of pages" :text="bookInfo.number_of_pages" />
        <BurgerLabel title="Tags" isBig prettyLabel :list="bookTags" />
        <BurgerLabel title="Language" :text="bookInfo.language_name" />
        <BurgerLabel title="Likes" :text="bookInfo.number_of_likes" />
        <button type="button" @click="likeBook" id="likeBtn">
          <img v-if="isLiked" src="@/assets/liked.png" alt="Heart logo meaning we liked the book" />
          <img v-if="!isLiked" src="@/assets/notLiked.png" alt="Heart logo meaning we liked the book" />
        </button>
      </div>
    </Slide>
  </section>
</template>

<style>
#likeBtn {
  width: fit-content;
  align-self: center;
  padding: 5px 10px;
  border: none;
  background-color: transparent;
}

#likeBtn img {
  width: 40px;
  cursor: pointer;
}

.bm-burger-button {
  top: 110px;
  min-width: 2vw;
  min-height: 2vw;
}

.bm-burger-bars {
  background-color: #8185e4;
}

.bm-menu {
  box-shadow: inset 0 7px 9px -7px black;

  margin-top: 80px;
  margin-bottom: 2vh;
  background-color: #dbdcf6;
  max-height: calc(105vh - 8rem);
      overflow-y: auto;
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

@media only screen and (max-width: 1000px) {
  .bm-burger-button {
  top: 20px;
}
.bm-menu {
  z-index: 0;
  box-shadow: inset 0 7px 9px -7px black;
  margin-top: 0px;
  background-color: #dbdcf6;
  max-height: calc(105vh - 8rem);
      overflow-y: auto;
}

.pdfLoader {
  margin-top: 60px;
  width: 100%;
  height: 100%;
}
}
</style>
