<script setup>
import { RouterLink } from "vue-router";
import { ref, computed } from "vue"

const text = ref("")


const url = computed(() => {
  return `/books/${text.value}`

})

</script>
<template>
  <nav class="horizontalDiv">
    <div class="horizontalDiv">
      <img src="../assets/book.png" alt="opened book image" id="bookImg" />
      <RouterLink to="/books" id="polypediaTitle"> Polypedia </RouterLink>
    </div>
    <div class="horizontalDiv">
      <input type="text" placeholder="search a book" id="searchBar" v-model="text"/>
      <RouterLink :to="url" id="searchBtn"><img id="searchIcon" src="../assets/searchLogo.png" alt="loop icon for search button"></RouterLink>
    </div>
    <RouterLink to="/likedBooks" class="navItem">Liked books</RouterLink>
    <RouterLink to="/upload" class="navItem">+ Upload a book</RouterLink>
    <RouterLink to="/account" class="navItem">My account</RouterLink>
  </nav>
</template>
<style scoped>


#searchIcon{
  width: 25px;
  cursor: pointer;
}

#searchBtn{
  margin-top: auto;

  background-color: transparent;
  border: none;
}
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
  padding: 20px 0px;
  font-size: 1.4em;
  justify-content: space-around;
  box-shadow: 0px 0px 15px 3px black;
}

nav input {
  margin: auto 05px auto 5vw;
  width: 25vw;
  font-size: 1em;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #8185e4;
}
</style>
