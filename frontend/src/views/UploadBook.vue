<script setup>
import { ref } from "vue";
import uploadBookForm from "../components/uploadBookForm.vue";

const showMessage = ref("");


function changeMessage(m) {
  window.scrollTo(0,0)
  showMessage.value = m;
}

</script>
<template>
  <div>
    <div class="horizontalDiv">
      <section id="leftSection">
        <div class="verticalDivCentered" id="formDiv">
          <h5>{{ showMessage }}</h5>

          <uploadBookForm  @showMessageEvent="(msg) => changeMessage(msg)" id="form" />
        </div>
      </section>
      <section id="rightSection">
        <img src="../assets/undraw_library.png" alt="Girl reading a library" />
      </section>
    </div>
  </div>
</template>

<style scoped>

#formDiv {
  text-align: center;
  margin: 10vh 15vh;
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
  margin-top: 15vh;
  width: 40vw;
  min-width: 500px;
}

section {
  width: 50%;
  height: 100vh;
}

</style>
