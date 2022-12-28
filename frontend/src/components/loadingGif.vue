<script setup></script>
<template>
  <div class="loaderWrapper">
    <img src="../assets/loading.gif" alt="loading gif animation with a purple orb" />
    <div class="greyBackground"></div>
  </div>
  
</template>
<style scoped>
img {
  width: 150px;
  position: fixed;
  margin: auto;
  align-self: center;
  top: 45vh;
  left: 43vw;
  z-index: 20;
  animation: 1s ease-in-out;
  filter: hue-rotate(-30deg) saturate(200%) brightness(89%) contrast(87%);
}

.greyBackground{
    animation: 1s ease-in-out;
    top: 0;
    left: 0px;
    padding: 100% 100%;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 10;
    position: fixed;
}

</style>
