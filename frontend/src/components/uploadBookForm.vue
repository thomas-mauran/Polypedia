<script setup>
/* eslint-disable*/
import { useRouter } from "vue-router";

import FormData from "form-data";

import { fetchAll } from "../utils/fetchers";
import { defineEmits, onMounted, ref } from "vue";
import axios from "axios";
const emit = defineEmits(["showMessageEvent"]);
const router = useRouter();

const title = ref("");
const pageNumber = ref(10);
const description = ref("");
const selectedLanguage = ref(15);
const selectedTags = ref([]);
const selectedAuthors = ref(1);
const file = ref(null);

const authors = ref([]);
const tags = ref([]);
const languages = ref([]);


function onChangeFile(event) {
  file.value = event.target.files[0];
  console.log(file.value);
}

async function fetchAllValue() {
  tags.value = await fetchAll("tag");
  authors.value = await fetchAll("author");
  languages.value = await fetchAll("language");
}

async function uploadBook() {
  let formData = new FormData();
  console.log(formData)

  if (
    title.value === "" ||
    description.value === "" ||
    pageNumber.value === ""
  ) {
    emit("showMessageEvent", "You need to fill in all the gaps");
  } else {
    const url = `${process.env.VUE_APP_API_URL}/book`;

    formData.append("file", file.value);
    formData.append("title", title.value);
    formData.append("description", description.value);
    formData.append("pageNumber", pageNumber.value);
    formData.append("authors", JSON.stringify(selectedAuthors.value));
    formData.append("tags", JSON.stringify(selectedTags.value));
    formData.append("language", JSON.stringify(selectedLanguage.value));
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.status)
        // let responseText = response;
        // let responseMsg = responseText.error
        //   ? responseText.error
        //   : responseText;
        if (response.status !== 201) {
          emit("showMessageEvent", responseMsg);
        } else {
          router.push("home");
          emit("showMessageEvent", "Book uploaded");
        }
      }).catch(error => {
        console.log(error)
        emit("showMessageEvent", error.response.data);

      });

  }
}

onMounted(() => {
  fetchAllValue();
});
</script>
<template>
  <article class="verticalDivCentered">
    <form class="verticalDiv" id="form">
      <h2>Upload a book</h2>

      <h3>Title</h3>
      <input
        type="text"
        id="title"
        placeholder="One piece #23"
        v-model="title"
      />
      <h3 for="description">Description</h3>
      <textarea
        type="text"
        id="description"
        placeholder="Once upon a time ..."
        v-model="description"
      ></textarea>

      <h3>Number of page</h3>
      <input type="number" v-model="pageNumber" min="0" />

      <h3>Authors</h3>
      <select name="authors" id="authors" v-model="selectedAuthors">
        <option v-for="author in authors" :key="author.id" :value="author.id">
          {{ author.fullname }}
        </option>
      </select>

      <h3>Tags</h3>
      <section id="tagSection">
        <div v-for="tag in tags" :key="tag.id" class="radioTag">
          <input
            type="checkbox"
            :id="tag.id"
            :value="tag.id"
            v-model="selectedTags"
          />
          <label :for="tag.id">{{ tag.name }}</label>
        </div>
      </section>

      <h3>Language</h3>
      <select name="languages" id="languages" v-model="selectedLanguage">
        <option
          v-for="language in languages"
          :key="language.id"
          :value="language.id"
        >
          {{ language.name }}
        </option>
      </select>

      <h3>Import pdf</h3>
      <input type="file" name="file" id="pdfFile" @change="onChangeFile" />

      <button class="purpleBackground btn" type="button" @click="uploadBook">
        Upload
      </button>
    </form>
  </article>
</template>
<style scoped>
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
</style>
