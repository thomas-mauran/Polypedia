<script setup>
import { watch, onMounted, ref, defineProps } from "vue";
import { fetchAll } from "../utils/fetchers";

import adminDeleteBtnVue from "./adminDeleteBtn.vue";
import loadingGif from "./loadingGif.vue"

/* eslint-disable */
const props = defineProps({
  category: String,
});

const data = ref([]);
const attributes = ref([]);

const emit = defineEmits(["showMessageEventPass"]);
const loading = ref(true)


watch(() => {
  data.value, fetchData;
});

async function fetchData() {
  loading.value = true

  data.value = await fetchAll(props.category);
  attributes.value = Object.keys(data.value[0]) ? Object.keys(data.value[0]) : 0;
  console.log(data.value);
  loading.value = false

}

function trimText(text) {
  if (typeof text === "string" && text.length > 50) return `${text.slice(0, 50)} ...`;

  return text;
}

function formatAttributeName(text) {
  return text.replaceAll("_", " ");
}


function passMessage(id){
    const index = data.value.findIndex(item => item.id === id)
    data.value.splice(index, 1)
    emit("showMessageEventPass", id)
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <section class="verticalDiv">
    <loadingGif v-if="loading"/>

    <div>
      <ul class="headingOfList">
        <li v-for="attribute in attributes">{{ formatAttributeName(attribute) }}</li>
      </ul>

      <ul v-for="line in data" class="lines">
        <li v-for="(attributeName, index) in attributes">
          <p>{{ trimText(line[attributeName]) }}</p>
        </li>
        <adminDeleteBtnVue @showMessageEvent="(id) => passMessage(id)" :elemId="line.id" :category="category" class="specialBtn"/>
      </ul>
    </div>
  </section>
</template>
<style scoped>
section {
  display: flex;
  align-items: center;
}


section ul {
  display: flex;
  flex-direction: row;
}


li{
    list-style: none;
    padding: 30px 100px;
    text-align: center;
    width: 35%;


}
.lines {
    box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.2);
    margin: 20px 0px ;
    border-radius: 6px;

}


.lines li:first-child, .headingOfList li:first-child{
    width: 5%;
}



ul{
    box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.2);
}

.headingOfList{
    background-color: rgb(218, 195, 248);
}
.specialBtn{
    margin-left: auto;
    margin-right: 20px;
}
</style>
