<script setup>
import { defineProps, defineEmits, ref} from "vue";
import axios from "axios";
import loadingGif from "../components/loadingGif.vue"

const emit = defineEmits(["showMessageEvent"]);


const props = defineProps({
    elemId: Number,
    category: String,
})

const loading = ref(false)


async function callDelete(){
    const url = `${process.env.VUE_APP_API_URL}/${props.category}/${props.elemId}`;
    loading.value = true

    axios
      .delete(url, {
        headers: {
          "x-access-token": `${localStorage.getItem("AUTH_TOKEN_KEY")}`,
        },
      }).then((response) => {
        emit("showMessageEvent", props.elemId);

        console.log(response)
        loading.value = false

      }).catch((error) => {
        console.log(error)
        loading.value = false

      })
      
}

</script>

<template>
    <loadingGif v-if="loading"/>

    <button type="button" @click="callDelete"><img src="../assets/trash.png" alt="trashcan image"> </button>
</template>

<style scoped>

img{
    width: 2vw;

}

button{
    cursor: pointer;
    background-color: transparent;
    border: none;
    margin: auto 0px;
}

</style>
