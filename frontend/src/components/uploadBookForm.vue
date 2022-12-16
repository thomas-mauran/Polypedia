<script setup>
/* eslint-disable*/

import { fetchAll } from "../utils/fetchers";
import { defineEmits, onMounted, ref } from "vue";

const emit = defineEmits(["showMessageEvent"]);

const { email, title, description } = ref("");
const authors = ref([]);
const tags = ref([]);
const languages = ref([]);

async function fetchAllValue() {
  tags.value = await fetchAll("tag");
  authors.value = await fetchAll("author");
  languages.value = await fetchAll("language");
}

onMounted(() => {
  fetchAllValue();
});
</script>
<template>
  <article class="verticalDivCentered">
    <form class="verticalDiv" id="form">
      <h2>Upload a book</h2>

      <h3 for="title">Title</h3>
      <input
        type="text"
        id="title"
        placeholder="One piece #23"
        v-model="email"
      />

      <h3>Authors</h3>
      <select name="authors" id="authors">
        <option v-for="author in authors" :key="author.id" :value="author.id">
          {{ author.fullname }}
        </option>
      </select>

      <h3>Tags</h3>
      <section id="tagSection">
        <div v-for="tag in tags" :key="tag.id" class="radioTag">
          <input type="radio" :id="tag.id" />
          <label :for="tag.id">{{ tag.name }}</label>
        </div>
      </section>

      <h3>Language</h3>
      <select name="languages" id="languages">
        <option
          v-for="language in languages"
          :key="language.id"
          :value="language.id"
        >
          {{ language.name }}
        </option>
      </select>

      <h3 for="description">Description</h3>
      <textarea
        type="text"
        id="description"
        placeholder="Once upon a time ..."
        v-model="description"
      ></textarea>

      <h3>Import pdf</h3>
      <input type="file" name="pdfFile" id="pdfFile" />

      <button class="purpleBackground btn" @click="tryLogin">Upload</button>
    </form>
  </article>
</template>
<style scoped>
h2 {
  margin: 0px;
  padding: 0px;
}

#form {
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
  margin: 10px;
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
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}
</style>
