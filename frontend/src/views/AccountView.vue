<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import axios from "axios";



const username = ref("");
const email = ref("");
const userId = localStorage.getItem("USER_ID")
const router = useRouter();


async function fetchUserInfos() {
    if(!userId) router.push('login')

  const url = `${process.env.VUE_APP_API_URL}/user/${userId}`;
  try {
    let res = await axios({
      url: url,
      headers:{
        'x-access-token': `${localStorage.getItem('AUTH_TOKEN_KEY')}`,

      },
      method: "GET",
    });

    if (res.status === 200) {
      username.value = res.data[0].login;
      email.value = res.data[0].email;
    }
  } catch (error) {
    console.log(error);
  }
}

function disconnect(){

localStorage.removeItem("AUTH_TOKEN_KEY");
localStorage.removeItem("USER_ID");
localStorage.removeItem("IS_ADMIN");
router.push("login");
}


onMounted(() => {
  fetchUserInfos();
});
</script>
<template>
  <div>
    <h2>Username : {{username}}#{{userId}}</h2>
    <h2>Email: {{email}}</h2>
</div>
  <button @click="disconnect" id="disconnectBtn">Disconnect</button>
</template>
<style scoped>

h2{
    margin: 30px;
}

#disconnectBtn {
  padding: 10px;
  border: none;
  background-color: rgb(252, 120, 120);
  color: white;
  font-weight: bold;
  cursor: pointer;
}
</style>
