<script setup>
import {useRouter} from 'vue-router'

const router = useRouter()

function disconnect(){
    localStorage.removeItem('token')
    router.push("login")
}


</script>
<template>
    <div><h1>Profile</h1></div>
    <button @click="disconnect" id="disconnectBtn">Disconnect</button>
</template>
<style>

#disconnectBtn{
    padding: 10px;
    border: none;
    background-color: rgb(252, 120, 120);
    color: white;
    font-weight: bold;
    cursor: pointer;
}


</style>