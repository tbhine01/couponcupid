<script setup>
import router from '@/router';
import { ref } from "vue"

let email = ref('')
let password = ref('')

// function get_started(){
//   router.push('/general')
// }

function login(){
  const reqBody = {
    "email": email.value,
    "password": password.value
  }

  fetch("http://localhost:3000/login", 
  {headers: {"Content-Type": "application/json"},
  body: JSON.stringify(reqBody),
  method: "POST"
  })

  .then(response => {
    return response.json()
  })

  .then(data => {
    document.cookie = data
    router.push('/general')
  })

  .catch(error => {
    console.log(error)
  })
}


</script>

<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">

  <div class="container">
    <h1 id="title">CouponCupid</h1>
    <img id="logo" src='../assets/transparentlogo.png' alt="CouponCupid Logo">
    <div class="login_box">
        <input type="text" id="username" name="username" v-model="email" placeholder="Email">
        <input type="password" id="password" name="password" v-model="password" placeholder="Password">
        <button @click="login" id="login">Log In</button>
      </div>
      <div id="register_box">
        <p>Don't have an account? <router-link to = "/register">Register Here</router-link> </p>
      </div>
    <!-- <button id="get_started" @click="get_started">Get Started!</button> -->
  </div>
</template>

<style scoped>
  .container{
    padding: 0 !important; 
    background-image: url('../assets/background.png');
    background-color: #ff4d6d;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  #logo{
    border-radius: 10px;
  }

  #title{
    font-family: 'Lobster', sans-serif;
    color: #e05780;
    font-size: 500%;
  }

  .login_box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
  }

  #username{
    font-family: 'Lobster', sans-serif;
    width: 20rem;
    height: 2.5rem;
    border-radius: 30px;
    text-align: center;
    margin-bottom: 1rem;
  }

  #password{
    font-family: 'Lobster', sans-serif;
    width: 20rem;
    height: 2.5rem;
    border-radius: 30px;
    text-align: center;
  }

  #login{
    font-family: 'Lobster', sans-serif;
    background-color: #ffb3c1;
    border: solid white 2px;
    border-radius: 30px;
    width: 15rem;
    height: 2.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  #register_box{
    font-family: 'Lobster', sans-serif;
  }

  /* #get_started{
    font-family: 'Lobster', sans-serif;
    width: 50vw;
    height: 10%;
    font-size: 200%;
    border-radius: 30px;
    background-color: #ffb3c1;
    color: white;
    border: none;
    border-style: outset;
  } */
</style>
