<script setup>
/* eslint-disable*/

import { RouterLink } from "vue-router";

import { ref, onMounted, defineProps} from "vue";

// const imagePath = ref("")
const imageAlt = ref("");
const routePath = ref("");

const props = defineProps({
  title: String,
  categorie: String,
  imagePath: String,
});

onMounted(() => {
  // imagePath.value = `/assets/admin_${props.categorie}.png`
  imageAlt.value = `Image of the ${props.categorie} categorie`;
  routePath.value = `/admin/${props.categorie}`;
});
</script>
<template>
  <article>
    <RouterLink :to="routePath">
      <img :src="imagePath" :alt="imageAlt" />
      <h3>{{ title }}</h3>
    </RouterLink>
  </article>
</template>
<style scoped>

article{
  width: fit-content;
  box-shadow: 3px 3px 3px #5356b8;
  padding: 20px 20px 5px 20px;
  border-radius: 5px;
  transition: 0.1s ease-in-out;
}

article:hover{
  transform: scale(1.1);
}

a{
  text-decoration: none;
  color: black;
}
 img{
  width: 100px;
 }
 h3{
  margin-top: 15px;
 }
</style>
