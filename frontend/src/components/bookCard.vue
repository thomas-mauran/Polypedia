<script setup>
/* eslint-disable */

const props = defineProps({
    bookId: Int16Array,
    imgPath: String,
    imgAlt: String,
    bookTitle: String
})

</script>
<template>

    <article>
        <img :src="imgPath" :alt="imgAlt"/>
        <h3>{{bookTitle}}</h3>
    </article>

</template>
<style scoped>

img{
    width: 200px;
    box-shadow: 2px 2px 5px  black;
    margin-bottom: 20px;
}

</style>