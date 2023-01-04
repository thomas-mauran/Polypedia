<script setup>
import { RouterLink, useRouter } from "vue-router";
import { ref, computed } from "vue";

const text = ref("");
const router = useRouter();

const url = computed(() => {
  return `/books/${text.value}`;
});

function searchBook() {
  router.push(url.value);
}

const isUserAdmin = ref(localStorage.getItem("IS_ADMIN"));
</script>

<template>
  <nav class="horizontalDiv desktop-list">
    <div class="horizontalDiv logoDiv">
      <img src="@/assets/book.png" alt="opened book image" id="bookImg" />
      <RouterLink to="/books" id="polypediaTitle"> Polypedia </RouterLink>
    </div>
    <div class="horizontalDiv">
      <input type="text" placeholder="Search a book" id="searchBar" v-model="text" v-on:keyup.enter="searchBook" />
      <RouterLink :to="url" id="searchBtn"><img id="searchIcon" src="@/assets/navbar/searchLogo.png" alt="loop icon for search button" /></RouterLink>
    </div>
    <RouterLink to="/likedBooks" class="navItem">Liked books</RouterLink>
    <RouterLink to="/upload" class="navItem">+ Upload a book</RouterLink>
    <RouterLink v-if="isUserAdmin === 'true'" to="/admin" class="navItem">Admin Panel</RouterLink>
    <RouterLink to="/account" class="navItem">My account</RouterLink>
  </nav>

  <nav class="horizontalDiv mobile-list">
    <RouterLink to="/books" class="navItem"><img id="searchIcon" src="@/assets/navbar/search.png" alt="search icon" class="logo" /></RouterLink>
    <RouterLink to="/likedBooks" class="navItem"><img id="heartIcon" class="logo" src="@/assets/navbar/heart.png" alt="Heart icon" /></RouterLink>
    <RouterLink to="/upload" class="navItem"><img id="uploadIcon" class="logo" src="@/assets/navbar/upload.png" alt="Upload icon" /></RouterLink>
    <RouterLink v-if="isUserAdmin === 'true'" to="/admin" class="navItem"
      ><img id="administratorIcon" class="logo" src="@/assets/navbar/administrator.png" alt="Admin icon "
    /></RouterLink>
    <RouterLink to="/account" class="navItem"><img id="userIcon" class="logo" src="@/assets/navbar/user.png" alt="User icon" /></RouterLink>
  </nav>
</template>

<style scoped>
.logoDiv {
  margin-left: 20px;
}
.mobile-list {
  display: none;
}

#searchIcon {
  width: 25px;
  cursor: pointer;
}

#searchBtn {
  margin-top: auto;

  background-color: transparent;
  border: none;
}
#bookImg {
  margin-top: auto;
  margin-bottom: auto;
  width: 40px;
}

#polypediaTitle {
  background-image: linear-gradient(90deg, rgba(30,9,121,1) 0%, rgba(109,67,255,1) 0%, rgba(136,157,252,1) 100%);
  background-size: 100%;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: none;
  font-size: 1.4em;
  font-weight: bold;
  margin: auto 8px;
  font-family: "Jost", sans-serif;

}

.navItem {
  color: #8185e4;
  text-decoration: none;
  margin: auto 3vw;
  width: fit-content;
  white-space: nowrap;
  font-weight: bold;
  
}

nav {
  padding: 20px 0px;
  font-size: 1.2em;
  box-shadow: 0px 0px 15px 3px black;
  text-overflow: ellipsis;
}

nav input {
  margin: auto 05px auto 5vw;
  width: 25vw;
  font-size: 1em;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #8185e4;
}

@media (max-width: 1400px) {
  .navItem {
    margin: auto 2vw;
  }
}

@media (max-width: 1200px) {
  .navItem {
    margin: auto 1vw;
    font-size: 0.8em;
  }
}

@media only screen and (max-width: 1000px) {
  nav {
    height: auto;
  }
  .desktop-list {
    display: none;
  }
  .mobile-list {
    z-index: 1;
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #8185e4;
  }

  .mobile-list a {
    padding: 35px 6vw 20px;
  }

  .logo {
    color: 00A1E7;
    font-size: 30px;
    width: 30px;
    margin-top: auto;
  }
}

@media only screen and (max-width: 400px) {
  .mobile-list a {
    padding: 35px 15px 20px;
  }
  .mobile-list {
    min-width: 300px;
  }
}
</style>
