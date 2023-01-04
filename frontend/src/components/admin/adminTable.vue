<script setup>
import { watch, onMounted, ref, defineProps } from "vue";
import { fetchAll } from "@/utils/fetchers";
import { RouterLink } from "vue-router";
import adminDeleteBtnVue from "@/components/admin/adminDeleteBtn";
import loadingGif from "@/components/loadingGif";

/* eslint-disable */
const props = defineProps({
  category: String,
});

const data = ref([]);
const attributes = ref([]);
const minAttributes = ref([]);
const emit = defineEmits(["showMessageEventPass"]);
const loading = ref(true);

watch(() => {
  data.value, fetchData;
});

async function fetchData() {
  loading.value = true;

  data.value = await fetchAll(props.category);

  if (data.value.length > 0) {
    attributes.value = Object.keys(data.value[0]) ? Object.keys(data.value[0]) : 0;
    minAttributes.value = attributes.value.slice(-2);
  }
  loading.value = false;
}

function trimText(text) {
  if (typeof text === "string" && text.length > 12) return `${text.slice(0, 12)} ...`;

  return text;
}

function formatAttributeName(text) {
  return text.replaceAll("_", " ");
}

function passMessage(id) {
  const index = data.value.findIndex((item) => item.id === id);
  data.value.splice(index, 1);
  emit("showMessageEventPass", id);
}

function updateUrl(id) {
  return (updateUrl.value = `/admin/${props.category}/update/${id}`);
}

onMounted(async () => {
  await fetchData();
});
</script>

<template>
  <section class="verticalDiv">
    <loadingGif v-if="loading" />

    <div class="desktop-list">
      <ul class="headingOfList">
        <li v-for="attribute in attributes">{{ formatAttributeName(attribute) }}</li>
        <li>actions</li>
      </ul>

      <h3 v-if="data.length === 0">No {{ props.category }} in the database</h3>
      <ul v-for="line in data" class="lines">
        <li v-for="attributeName in attributes">
          <p v-if="line[attributeName] === true" class="emoji">👑</p>
          <p v-else-if="line[attributeName] === false" class="emoji">👨‍🌾</p>

          <p v-else="">{{ trimText(line[attributeName]) }}</p>
        </li>
        <li class="horizontalDiv">
          <RouterLink id="updateBtn" :to="updateUrl(line.id)"><img src="@/assets/edit.png" alt="create a new element" /></RouterLink>

          <adminDeleteBtnVue @showMessageEvent="(id) => passMessage(id)" :elemId="line.id" :category="category" class="specialBtn" />
        </li>
      </ul>
    </div>

    <div class="mobile-list">
      <ul class="headingOfList">
        <li v-for="attribute in minAttributes">{{ attribute }}</li>
        <li>actions</li>
      </ul>

      <h3 v-if="data.length === 0">No {{ props.category }} in the database</h3>
      <ul v-for="line in data" class="lines">
        <li v-for="attributeName in minAttributes">
          <p v-if="line[attributeName] === true" class="emoji">👑</p>
          <p v-else-if="line[attributeName] === false" class="emoji">👨‍🌾</p>
          <p v-else="">{{ trimText(line[attributeName]) }}</p>
        </li>
          <RouterLink id="updateBtn" :to="updateUrl(line.id)"><img src="@/assets/edit.png" alt="create a new element" /></RouterLink>

          <adminDeleteBtnVue @showMessageEvent="(id) => passMessage(id)" :elemId="line.id" :category="category" class="specialBtn" />
      </ul>
    </div>
  </section>
</template>
<style scoped>
.emoji {
  font-size: 2.5em;
}
#updateBtn {
  display: flex;
}
#updateBtn img {
  width: 35px;
  margin: auto 30px auto 20px;
}
section {
  display: flex;
  align-items: center;
}

section ul {
  display: flex;
  flex-direction: row;
}

li {
  list-style: none;
  padding: 30px 100px;
  text-align: center;
  width: 35%;
}
.lines {
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.2);
  margin: 20px 0px;
  border-radius: 6px;
}

.lines li:first-child,
.headingOfList li:first-child {
  width: 5%;
}

ul {
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.2);
}

.headingOfList {
  background-color: rgb(218, 195, 248);
  border-radius: 6px;
}
.specialBtn {
  margin-left: auto;
  margin-right: 30px;
}

.mobile-list {
  display: none;
}

@media only screen and (max-width: 1200px) {
  .desktop-list {
    display: none;
  }
  .mobile-list {
    display: block;
    width: 80vw;
  }
  .specialBtn {
    margin-left: auto;
    margin-right: 10px;
  }
  li {
    width: 15%;
    padding-left: 10vw;
    padding-right: 20vw;
  }
}

@media only screen and (max-width: 600px) {
  li {
    font-size: 0.8em;
    width: 100px;
    padding-left: 0px;
    padding-right: 0px;
    margin-left: 80px;
    margin-right: 0px;
  }
  a {
    margin: auto;
  }

  .mobile-list {
    display: block;
    width: 450px;
  }
}
</style>
