<script setup></script>
<template>
  <section class="loaderWrapper">
    <img src="@/assets/loading.gif" alt="loading gif animation with a purple orb" />
    <div class="greyBackground"></div>
  </section>
  
</template>
<style scoped>
.loaderWrapper{
  top: 0px;
  position: fixed;
  margin: 0px;
  height: 100vh;
  width: 100vw;
  z-index: 5;
}
img {
  width: 150px;
  margin: auto;
  align-self: center;
  z-index: 20;
  animation: 1s ease-in-out;
  filter: hue-rotate(-30deg) saturate(200%) brightness(89%) contrast(87%);
}

.greyBackground{
    animation: 1s ease-in-out;
    top: 0;
    left: 0px;
    padding: 100vh 100vw;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 10;
    position: fixed;
}

@media only screen and (max-width: 1000px) {
  img {
    
  }

}
</style>
