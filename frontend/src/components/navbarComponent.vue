<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <nav class="horizontalDiv">
    <RouterLink to="home"  class="horizontalDiv">

      <img src="../assets/book.png" alt="opened book image" id="bookImg" />
      <h1 id="polypediaTitle">Polypedia</h1>
    </RouterLink>
    <input type="text" placeholder="search a book">
    <RouterLink to="books/id" class="navItem">My books</RouterLink>
    <RouterLink to="upload" class="navItem">My books</RouterLink>
    <RouterLink to="account" class="navItem">My account</RouterLink>

  </nav>
</template>
<style>

#polypediaTitle{
    text-decoration: none;
}

.navItem{
    color: #8185e4;
   text-decoration: none;
   margin: auto 50px;

}

nav{
    margin-top: 10px;
    justify-content: space-around;
}

nav input{
    margin: auto 5vw;
    width: 25vw;
    height: 20px;
    font-size: 1em;
    background-color: transparent;
    border: none;
    border-bottom: 2px solid #8185e4;
}

</style>
