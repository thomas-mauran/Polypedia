<script setup>
/* eslint-disable*/
import { useRoute, useRouter } from "vue-router";

import FormData from "form-data";
import loadingGif from "@/components/loadingGif.vue";

import { fetchAll, fetchOne } from "@/utils/fetchers";
import { defineEmits, onMounted, ref, onBeforeMount } from "vue";
import axios from "axios";
const emit = defineEmits(["showMessageEvent"]);
const router = useRouter();

let id;

const title = ref("");
const pageNumber = ref(10);
const description = ref("");
const selectedLanguage = ref(15);
const selectedTags = ref([]);

const selectedAuthors = ref(87);
const isAuthorFieldOpen = ref(false);

const file = ref(null);

const authors = ref([]);
const tags = ref([]);
const languages = ref([]);

const loading = ref(true);

const route = useRoute();

const pdfData = ref(null);

function onChangeFile(event) {
  file.value = event.target.files[0];
  console.log(file.value);
}

async function fetchAllValue() {
  loading.value = true;

  tags.value = await fetchAll("tags");
  authors.value = await fetchAll("authors");
  languages.value = await fetchAll("languages");
  loading.value = false;
}

async function uploadBook() {
  loading.value = true;

  let formData = new FormData();

  if (title.value === "" || description.value === "" || pageNumber.value === "") {
    loading.value = false;

    emit("showMessageEvent", "You need to fill in all the gaps");
  } else {
    const url = `${process.env.VUE_APP_API_URL}/books/${id}`;

    formData.append("file", file.value);
    formData.append("title", title.value);
    formData.append("description", description.value);
    formData.append("pageNumber", pageNumber.value);
    formData.append("authors", JSON.stringify([selectedAuthors.value]));
    formData.append("tags", JSON.stringify(selectedTags.value));
    formData.append("language", JSON.stringify(selectedLanguage.value));
    axios
      .post(url, formData, {
        headers: {
          "x-access-token": `${localStorage.getItem("AUTH_TOKEN_KEY")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // let responseText = response;
        // let responseMsg = responseText.error
        //   ? responseText.error
        //   : responseText;
        if (response.status !== 204) {
          emit("showMessageEvent", responseMsg);
          loading.value = false;
        } else {
          router.replace("/admin/books");
          emit("showMessageEvent", "Book uploaded");
          loading.value = false;
        }
      })
      .catch((error) => {
        emit("showMessageEvent", error.response.data);
        loading.value = false;
      });
  }
}

function createAuthorBtnClicked() {
  isAuthorFieldOpen.value = !isAuthorFieldOpen.value;
  if (!isAuthorFieldOpen.value) selectedAuthors.value = 87;
  else selectedAuthors.value = "";
}

onBeforeMount(async () => {
  id = route.params.id;
  const data = await fetchOne("books", id);

  title.value = data.title;
  description.value = data.description;
  pageNumber.value = data.number_of_pages;

  const authors = data.authors.map((author) => author.id)[0];
  selectedAuthors.value = authors;

  const tags = data.tags.map((tag) => tag.id);
  selectedTags.value = tags;

  selectedLanguage.value = data.language_id;
  const pdf = data.pdfFile.data;
  const pdfBuffer = await new Uint8Array(pdf);
  const blob = new Blob([pdfBuffer], { type: "application/pdf" });
  pdfData.value = URL.createObjectURL(blob);
});

onMounted(() => {
  fetchAllValue();
});
</script>
<template>
  <loadingGif v-if="loading" />
  <div class="horizontalDiv">
    <article id="leftSection" class="verticalDivCentered">
      <form class="verticalDiv" id="form">
        <h2>Update a book</h2>

        <h3>Title</h3>
        <input type="text" id="title" placeholder="One piece #23" v-model="title" />
        <h3 for="description">Description</h3>
        <textarea type="text" id="description" placeholder="Once upon a time ..." v-model="description"></textarea>

        <h3>Number of page</h3>
        <input type="number" v-model="pageNumber" min="0" />

        <h3>Authors</h3>
        <select v-if="!isAuthorFieldOpen" name="authors" id="authors" v-model="selectedAuthors">
          <option v-for="author in authors" :key="author.id" :value="author.id">
            {{ author.fullname }}
          </option>
        </select>
        <input v-if="isAuthorFieldOpen" type="text" placeholder="Author fullname" v-model="selectedAuthors" />
        <button id="createAuthorBtn" @click="createAuthorBtnClicked" type="button">Create an author</button>

        <h3>Tags</h3>
        <section id="tagSection">
          <div v-for="tag in tags" :key="tag.id" class="radioTag">
            <input type="checkbox" :id="tag.id" :value="tag.id" v-model="selectedTags" />
            <label :for="tag.id">{{ tag.name }}</label>
          </div>
        </section>

        <h3>Language</h3>
        <select name="languages" id="languages" v-model="selectedLanguage">
          <option v-for="language in languages" :key="language.id" :value="language.id">
            {{ language.name }}
          </option>
        </select>

        <h3>Upload another pdf</h3>
        <p>If you wanna change the pdf file for this book you just need to select a new one using the button down bellow</p>
        <input accept="application/pdf" type="file" name="file" id="pdfFile" @change="onChangeFile" />

        <button class="purpleBackground btn" type="button" @click="uploadBook">Upload</button>
      </form>
    </article>

    <section id="rightSection">
      <h3>Current book</h3>
      <object :data="pdfData" type="application/pdf" class="pdfLoader"></object>
    </section>
  </div>
</template>
<style scoped>
#createAuthorBtn {
  background-color: #8185e4;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 0px;
  margin: 10px 0px;
  margin-right: auto;
}

article {
  width: 40vw;
}
h2 {
  margin: 0px;
  padding: 0px;
}

#form {
  width: 30vw;
  min-width: 400px;
  font-size: 1em;
  border-radius: 10px;
  background-color: #ccceef;
  padding: 20px;
  text-align: left;
}

#form h3 {
  margin-top: 30px;
  margin-bottom: 5px;
}

#form select {
  height: 40px;
  width: 50%;
}

#form textarea {
  height: 100px;
  border-radius: 5px;
}

input[type="text"] {
  border: none;
  background-color: white;
  height: 35px;
  border-radius: 5px;
}

.radioTag {
  font-size: 0.7em;
  margin: 0px 5px;
}

.radioTag label {
  margin-left: 10px;
}

button {
  align-self: center;
  width: 30%;
  padding: 15px 0px;
}

#pdfFile {
  border: none;
}

#tagSection {
  margin: 20px;
  text-align: left;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.pdfLoader {
  width: 100%;
  height: 90vh;
}

#rightSection{
    width: 50vw;
}
#rightSection h3{
    text-decoration: underline;
}
</style>
