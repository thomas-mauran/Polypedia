<script setup>
import { defineProps, defineEmits } from "vue";
import axios from "axios";

const emit = defineEmits(["showMessageEvent"]);


const props = defineProps({
    elemId: Number,
    category: String,
})



async function callDelete(){
    const url = `${process.env.VUE_APP_API_URL}/${props.category}/${props.elemId}`;

    axios
      .delete(url, {
        headers: {
          "x-access-token": `${localStorage.getItem("AUTH_TOKEN_KEY")}`,
        },
      }).then((response) => {
        emit("showMessageEvent", props.elemId);

        console.log(response)

      }).catch((error) => {
        console.log(error)
      })
      
}

</script>

<template>
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
