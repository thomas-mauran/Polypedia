<script setup>
/* eslint-disable */

const props = defineProps({
  text: String
});

function randomNumber(max, min) {
  return Math.floor(Math.random() * max) + min;
}
function randomColor() {
  return `background-color: rgba(${randomNumber(255, 50)}, ${randomNumber(
    255,
    50
  )}, ${randomNumber(200, 50)}, 0.8);`;
}

const customBackground = randomColor();

</script>
<template>
    <p id="label" :style="customBackground">{{ text }}</p>
</template>
<style scoped>

p{
    width: fit-content;
    padding: 5px;
    margin: 20px;
}
#label{
    margin: 7px 10px;
}
</style>
