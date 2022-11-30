<script setup>
import {  RouterView } from 'vue-router'

</script>

<template>

  <main>

  </main>
  <RouterView />

</template>



<style>

.verticalDiv{
  display: flex;
  flex-direction: column;
}

.horizontalDiv{
  display: flex;
  flex-direction: row;
}

*{
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
