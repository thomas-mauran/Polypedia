<script

setup>
/* eslint-disable */

import bookCard from "@/components/bookCard.vue";
import axios from "axios"
import {onMounted, ref} from "vue"


const bookList = ref()
const urlBook = `${process.env.VUE_APP_API_URL}/book`;

console.log (urlBook)

async function getBook(){
    axios
      .get(urlBook, {

      }).then(async(response)=> {
        response.data.forEach((element) => {
            element.image = 'data:image/jpeg;base64,'+element.image
            // let image = element.image
            // const blob = await image.blob()
            // element.image = URL.createObjectURL(blob)

        })
        bookList.value = response.data
      }).catch(error => {
        console.log(error)
      })
}

onMounted(() => {
    getBook()
})

</script>
<template>
  <div>
    <h1>Home page</h1>



    <section>
      <bookCard v-for="book in bookList" :key="book.id" :bookId="book.id" :imgPath="book.image" imgAlt="Thumbnail of the book" :bookTitle="book.title"/>
    </section>
  </div>
</template>
<style scoped>

section{
    margin: 120px;
    display: grid;
grid-template-columns: repeat(3, 1fr);
grid-column-gap: 100px;
grid-row-gap: 70px;
}

</style>
