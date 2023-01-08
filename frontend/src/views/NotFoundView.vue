<script setup></script>
<template>
    <section class="verticalDiv">
        <div class="mainContent">
        <img id="gif404" src="@/assets/404Page.gif" alt="Monkey gif for 404 not found">
        <h1>404 not found</h1>
        <h4>This page doesn't exists </h4>
    </div>
   </section>
</template>

<style scoped>

section{
    flex-direction: column;
    align-items: center;
    margin-top: 40px;

}

.mainContent{
    background-image: linear-gradient(90deg, rgba(30,9,121,1) 0%, rgba(109,67,255,1) 0%, rgba(136,157,252,1) 100%);
    width: 30%;
    border-radius: 20px;
    padding: 30px;
    min-width: 300px;
}
h1{
    color: white;

  font-family: "Jost", sans-serif;
  font-size: 3em;
}
h4{
    color: white;
}

#gif404{
    width: 20vw;
    min-width: 200px;
}
</style>