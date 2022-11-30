<script setup>
</script>
<template>
    <form class="verticalDiv">
        <label for="login">Login</label>
        <input type="text" id="login" placeholder="yourEmail@address.com">

        <label for="password">Password</label>
        <input type="text" id="password" placeholder="veryStrongPassword">

        <div class="horizontalDiv buttonDiv" type="button">
            <button class="purpleBackground">Login</button>
            <p>or</p>
            <button class="purpleOutline" type="button">Create an account</button>
        </div>
    </form>
</template>
<style scoped>
    form{
        background-color: red;
        align-items: center;
        text-align: left;
        margin: 40px;
        font-size: 1.2em;
    }

    form label{
        text-align: left;
        margin: 20px 0px;
    }

    form input {
        width: 40%;
        background-color: transparent;
        border: none;
        border-bottom: 2px solid black;
    }

    form button{
        padding: 10px 20px;
        margin: 10px;
        background-color: transparent;
        border: none;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
    }

    .buttonDiv{
        margin-top: 20px;
        text-align: center;
    }

    .buttonDiv p{
        margin-top: auto;
        margin-bottom: auto;
    }

    .purpleBackground{
        background-color: #8185e4;
        color: white;
    }

    .purpleOutline{
        border: 2px #8185e4 solid;

    }
</style>