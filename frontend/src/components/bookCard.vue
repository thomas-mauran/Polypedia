<script setup>
/* eslint-disable */
import { RouterLink } from 'vue-router';

const props = defineProps({
    bookId: Int16Array,
    imgPath: String,
    imgAlt: String,
    bookTitle: String
})

const link = `book/${props.bookId}`

</script>
<template>

    <RouterLink :to="link">
        <img :src="imgPath" :alt="imgAlt"/>
        <h3>{{bookTitle}}</h3>
    </RouterLink>

</template>
<style scoped>

a{
    color: black;
    cursor: pointer;
    text-decoration: none;
    max-width: 200px;
}

img{
    width: 200px;
    box-shadow: 2px 2px 5px  black;
    margin-bottom: 20px;
}

</style>