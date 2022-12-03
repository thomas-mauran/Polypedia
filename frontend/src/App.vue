<script setup>
import {  RouterView, useRoute} from 'vue-router'

import navbar from "./components/navbarComponent"
const route = useRoute()


</script>

<template>

  <main>
    <navbar v-if="route.meta.navbar"/>

  </main>
  <RouterView />

</template>



<style>

@import url('https://fonts.googleapis.com/css2?family=Itim&family=Jost:wght@700&display=swap');

@font-face {
  font-family: 'JejuGothic';
  src: url('./fonts/JejuGothic-Regular.ttf');
}

*{
  font-family: "JejuGothic", regular;
}

.verticalDivCentered{
  display: flex;
  flex-direction: column;
  align-items: center;
}


.bigTitle{
  font-family: 'Itim', cursive;
  font-size: 2em;
}

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
