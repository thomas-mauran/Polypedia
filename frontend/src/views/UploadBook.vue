<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";


const authors = ref([])

async function fetchUserInfos() {

  const url = `${process.env.VUE_APP_API_URL}/author/`;
  try {
    let res = await axios({
      url: url,
      method: "GET",
    });

    console.log(res.data[0])
    if (res.status === 200) {
      authors.value = res.data;
    }
  } catch (error) {
    // console.log(error);
  }
}

onMounted(() => {
  fetchUserInfos();
});
</script>
<template>
    <div>
        <h1>Upload</h1>
        <h2>{{authors}}</h2>
    </div>
</template>
<style></style>