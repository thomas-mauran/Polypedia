<script setup>
import { ref } from "vue";
import uploadBookForm from "@/components/books/uploadBookForm.vue";

const showMessage = ref("");

function changeMessage(m) {
  window.scrollTo(0, 0);
  showMessage.value = m;
}
</script>
<template>
  <div>
    <div class="horizontalDiv">
      <section id="leftSection">
        <div class="verticalDivCentered" id="formDiv">
          <h5>{{ showMessage }}</h5>

          <uploadBookForm @showMessageEvent="(msg) => changeMessage(msg)" id="form" />
        </div>
      </section>
      <section id="rightSection">
        <img src="@/assets/undraw_uploadBook.svg" alt="Girl reading a library" />
      </section>
    </div>
  </div>
</template>

<style scoped>


#formDiv {
  text-align: center;
  margin: 10vh 10vh;
}

#formDiv h5 {
  color: rgb(206, 103, 103);
  font-size: 1.2em;
}

#logoDiv {
  vertical-align: middle;
  margin-top: 1vh;
}

#bookImg {
  width: 40px;
  margin: 0px 20px;
}

#polypediaTitle {
  color: #5054cb;
  margin-top: auto;
  margin-bottom: auto;
  font-family: "Jost", sans-serif;
}

#title {
  margin-top: 5vh;
}

#rightSection img {
  display: flex;
  margin-top: 24vh;
  margin-left: auto;
  margin-right: auto;
  width: 20vw;
  max-width: 700px;
  min-width: 300px;
}

section {
  width: 50%;
  height: 100vh;
}
@media only screen and (max-width: 1000px) {
  #rightSection {
    display: none;
  }
  #leftSection {
    width: 100vw;
  }
  #formDiv {
    margin: 2vh 5vh 10vh 10vh;
  }

  #form{
    width: 90%;
  }
}
</style>
