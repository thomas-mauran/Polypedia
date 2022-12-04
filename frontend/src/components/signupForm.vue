<script setup>
    import { RouterLink } from "vue-router"
    import {ref, defineEmits} from "vue"

    const username = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')


    const emit = defineEmits(['showMessageEvent'])

    function createAccount(){
        console.log("test")
        if(username.value === ''|| email.value === ''|| password.value === ''|| confirmPassword.value === ''){
            emit('showMessageEvent', 'You need to fill in all the gaps')
        }
        else if(password.value !== confirmPassword.value)
        {
            emit('showMessageEvent', "Both passwords aren't matching")
            console.log("emit")

        }
    }
    
</script>
<template>
  <article class="verticalDivCentered">
    <form class="verticalDiv" id="form">
        
        <label for="username">Username</label>
      <input type="text" name="username" id="username" placeholder="yourEmail@address.com" v-model="username"/>

      <label for="email">Email</label>
      <input type="text" name="email" id="email" placeholder="yourEmail@address.com" v-model="email" />

      <label for="password">Password</label>
      <input type="password" name="password" id="password" placeholder="veryStrongPassword" v-model="password"/>


      <label for="passwordConfirm">Confirm password</label>
      <input type="password" name= "passwordConfirm" id="passwordConfirm" placeholder="veryStrongPassword" v-model="confirmPassword"/>
      
      
      <div class="horizontalDiv buttonDiv" type="button">

        <button  class="btn purpleBackground" type="button" @click="createAccount" >Create the account</button>


      </div>
      <RouterLink  class="purpleText" to="login">I already have an account </RouterLink>
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

.buttonDiv {
  margin: 20px 50px;
  text-align: center;

}

.buttonDiv p {
  padding-top: 7px;
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

.purpleBackground {
  background-color: #8185e4;
  color: white;
}

.purpleOutline {
  border: 2px #8185e4 solid;
  color: black;
}

input[type="password"]{
    color: black;
}

</style>
