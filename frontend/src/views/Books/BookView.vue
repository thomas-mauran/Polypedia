<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { Slide } from "vue3-burger-menu";

import BurgerLabel from "@/components/burgerLabel.vue";
import loadingGif from "@/components/loadingGif.vue";

const route = useRoute();

const bookInfo = ref("");
const bookAuthors = ref([]);
const bookTags = ref([]);
const windowSize = ref(0);
const pdfData = ref(null);

const isLiked = ref(false);
const token = localStorage.getItem("AUTH_TOKEN_KEY");
const loading = ref(true);

// const numPages = ref(0);
const urlBook = `${process.env.VUE_APP_API_URL}/books/${route.params.id}`;

async function fetchBook() {
  loading.value = true;

  axios
    .get(urlBook, {
      headers: {
        "x-access-token": `${localStorage.getItem("AUTH_TOKEN_KEY")}`,
      },
    })
    .then(async (response) => {
      bookInfo.value = response.data;
      bookTags.value = response.data.tags;
      isLiked.value = response.data.isLiked;
      bookAuthors.value = response.data.authors.length > 0 ? response.data.authors[0] : "undefined";

      loading.value = false;
    })
    .catch((error) => {
      loading.value = false;

      console.log(error);
    });
}

async function fetchFile() {
  loading.value = true;

  const urlFile = `${process.env.VUE_APP_API_URL}/books/file/${route.params.id}`;
  axios
    .get(urlFile, {
      headers: {
        "x-access-token": `${localStorage.getItem("AUTH_TOKEN_KEY")}`,
      },
      responseType: "blob",
    })
    .then(async (response) => {
      //const blob = new Blob([response.data], { type: "application/pdf" });
      //console.log(blob)
      pdfData.value = URL.createObjectURL(response.data);
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
    loading.value = true;

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
        loading.value = false;
      })
      .catch((error) => {
        console.log(error);
        loading.value = false;
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
  fetchFile();
  windowSize.value = window.innerWidth;
});
</script>
<template>
  <section id="container">
    <loadingGif v-if="loading" />

    <object v-if="windowSize >= 500" :data="pdfData" type="application/pdf" class="pdfLoader">
      <p v-if="loading === false">
        Your web browser doesn't have a PDF plugin. Instead you can <a :href="pdfData">click here to download the PDF file.</a>
      </p>
    </object>
    <div class="middleCentered">
      <a v-if="windowSize < 500" :href="pdfData" target="_blank" rel="noopener noreferrer" id="downloadBtn">click here to see the PDF file.</a>
      <p>The inline pdf reader is not included in the mobile version. Click on the button to see your book</p>
    </div>
    <Slide noOverlay disableOutsideClick isOpen="true" left width="400">
      <div class="verticalDiv">
        <h1>Informations</h1>

        <BurgerLabel isBig title="Title" :text="bookInfo.title" />
        <BurgerLabel title="Id" :text="bookInfo.id" />
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
.middleCentered {
  margin-top: 45vh;
}

.middleCentered p {
  margin-top: 20px;
}

#downloadBtn {
  padding: 10px;
  border: none;
  border-radius: 5px;
  align-self: center;
  background-color: rgb(164, 120, 198);
  color: white;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
}
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
  top: 110px !important;
  min-width: 2vw !important;
  min-height: 2vw !important;
}

.bm-burger-bars {
  background-color: #8185e4 !important;
}

.bm-menu {
  box-shadow: inset 0 7px 9px -7px black !important;

  margin-top: 80px !important;
  margin-bottom: 2vh !important;
  background-color: #dbdcf6 !important;
  max-height: calc(105vh - 8rem) !important;
  overflow-y: auto !important;
}

.bm-cross {
  background: black !important;
}

.bm-item-list > * {
  color: black !important;
}
.bm-item-list h1 {
  margin-bottom: 20px !important;
  font-size: 1.8em !important;
  text-decoration: underline 2px !important;
}

.bm-item-list h2 {
  font-size: 1.4em !important;
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
    top: 20px !important;
  }
  .bm-menu {
    z-index: 0;
    box-shadow: inset 0 7px 9px -7px black !important;
    margin-top: 0px !important;
    background-color: #dbdcf6 !important;
    max-height: calc(105vh - 8rem) !important;
    overflow-y: auto !important;
  }

  .pdfLoader {
    margin: 0px;
    margin-top: 60px;
    width: 100%;
    height: 100%;
  }
}
</style>
