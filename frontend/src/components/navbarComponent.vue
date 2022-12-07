<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <nav class="horizontalDiv">
    <div class="horizontalDiv">
      <img src="../assets/book.png" alt="opened book image" id="bookImg" />
      <RouterLink to="home" id="polypediaTitle">
        Polypedia
      </RouterLink>
    </div>
    <input type="text" placeholder="search a book" id="searchBar"/>
    <RouterLink to="books/id" class="navItem">My books</RouterLink>
    <RouterLink to="upload" class="navItem">+ Upload a book</RouterLink>
    <RouterLink to="account" class="navItem">My account</RouterLink>
  </nav>
</template>
<style>


#bookImg {
  width: 40px;
}

#polypediaTitle {
  color: #5356b8;
  text-decoration: none;
  font-size: 1.4em;
  font-weight: bold;
  margin: auto 8px;
}

.navItem {
  color: #8185e4;
  text-decoration: none;
  margin: auto 50px;
}

nav {
  margin-top: 10px;
  justify-content: space-around;
}

nav input {
  margin: auto 5vw;
  width: 25vw;
  height: 20px;
  font-size: 1em;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #8185e4;
}
</style>
