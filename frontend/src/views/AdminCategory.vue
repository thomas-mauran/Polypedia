
<script setup>

import { ref, onBeforeMount } from "vue"
import {useRoute} from "vue-router"

import adminTable from "../components/adminTable.vue"

const route = useRoute()

const currentCategory = ref("")
const showMessage = ref("");


function changeMessage(m) {
    window.scrollTo(0,0)
  showMessage.value = `${currentCategory.value} with id ${m} has been successfully deleted`;
}

onBeforeMount(()=> {
    currentCategory.value = route.params.category
})

</script>
<template>
    <h1 id="title">{{ currentCategory }} pannel</h1>
    <h5 id="message" v-if="showMessage !== ''">{{ showMessage }}</h5>

    <adminTable @showMessageEventPass="(msg) => changeMessage(msg)" :category="currentCategory"/>
</template>

<style scoped>

    #title{
        margin: 5vh 0px;
    }

    #message{
        padding: 20px 10px;
        width: 30%;
        font-size: 1em;
        margin: 30px auto;
        color: white;
        border-radius: 10px;
        background-color: rgb(42, 146, 42);
    }
</style>