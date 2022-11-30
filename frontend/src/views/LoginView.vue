<script setup>
import loginForm from "../components/loginForm.vue";

console.log("test");
</script>

<template>
  <section id="leftSection">
    <h1>Welcome back</h1>
    <loginForm />
  </section>
  <section id="rightSection"></section>
</template>

<style>
section {
  width: 50%;
}



#leftSection {
  background-color: #e7e7e7;
  display: flex;
  flex-direction: column;
}
#rightSection img {
  background-color: red;
}
</style>
