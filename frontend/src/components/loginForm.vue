<script setup>
    import { RouterLink } from "vue-router"

    
</script>
<template>
  <article class="verticalDivCentered">
    <form class="verticalDiv" id="form">
      <label for="login">Login</label>
      <input type="text" id="login" placeholder="yourEmail@address.com" />

      <label for="password">Password</label>
      <input type="text" id="password" placeholder="veryStrongPassword" />

      <div class="horizontalDiv buttonDiv" type="button">

        <button class="purpleBackground">Login</button>
        <p>or</p>
        <RouterLink  class="btn purpleOutline" to="resetPassword">Create an account</RouterLink>

      </div>
      <RouterLink  class="purpleText" to="resetPassword">forgot my password 😞</RouterLink>
    </form>
  </article>
</template>
<style scoped>
#form {
  text-align: center;
}

#form p {
  margin: 10px;
}

.purpleText {
  color: #8185e4;
  text-decoration: none;
}
form {
  text-align: left;
  margin: 40px;
  font-size: 1.2em;
}

form label {
  text-align: left;
  margin: 20px 0px;
}

form input {
font-size: 0.8em;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid black;
}

input:focus{
    outline: none;
}

form button {
  padding: 10px 20px;
  margin: 10px;
  background-color: transparent;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
 }

.buttonDiv {
  margin-top: 20px;
  text-align: center;
}

.buttonDiv p {
  padding-top: 7px;
}

.purpleBackground {
  background-color: #8185e4;
  color: white;
}


.btn{
    padding: 10px 20px;
  margin: 10px;
  background-color: transparent;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  font-size: 0.8em;
  cursor: pointer;
  text-decoration: none;

}

.purpleOutline {
  border: 2px #8185e4 solid;
  color: black;
}

</style>
