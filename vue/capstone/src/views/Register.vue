<script setup>
import router from "@/router";
import { ref } from "vue"


let email = ref('')
let name = ref('')
let password = ref('')

function register(){
  const reqBody = {
    "email": email.value, 
    "password": password.value,
    "name": name.value,
  }

  fetch("http://localhost:3000/user", {
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(reqBody),
    method: "POST"
  })

  .then(response => {
    console.log(response)
    if(email.value ===""|| name.value === "" || password.value === ""){
      alert("Please fill out all fields")
    } else{

    if(response.status === 201){
      alert("Account created. Please login to continue")
      router.push("/")
    }else {
      alert("Something went wrong. Please try again")
    }}
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
    <div class="container">
      <div id="register_box">
        <img id="logo" src="../assets/couponcupid.png" alt="CouponCupid Logo">
        <input v-model="name" type="text" id="name" name="name" placeholder="Name">
        <input v-model="email" type="text" id="email" name="email"  placeholder="Email">
        <input v-model="password" type="password" id="password" name="password" placeholder="Password">
        <button @click="register" id="register">Register</button>
        <p id="terms-text">By signing up you agree to our Terms, Privacy Policy and Cookies Policy</p>
      </div>
      <div id="login_box">
        <p id="login">Have an account? <router-link to = "/">Login</router-link> </p>
      </div>
    </div>
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
    height: 10rem;
  }

  #register_box{
    font-family: 'Lobster', sans-serif;
    border: .5rem solid white;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 30rem;
    height: 40rem;
    padding-bottom: 2rem;
    text-align: center;
  }

  #register{
    font-family: 'Lobster', sans-serif;
    background-color: #ffb3c1;
    color: white;
    border: 1px lightgrey solid;
    border-radius: 10px;
    width: 10rem;
    height: 2.75rem;
  }

  #login_box{
    margin-top: 1rem;
    border: .5rem solid white;
    border-radius: 30px;
    width: 25vw;
    text-align: center;
  }

  #login{
    font-family: 'Lobster', sans-serif;
  }

  #name{
    font-family: 'Lobster', sans-serif;
    border-radius: 10px;
    border: lightgrey 1px solid;
    width: 17rem;
    height: 2.5em;
    text-align: center;
  }

  #email{
    font-family: 'Lobster', sans-serif;
    border-radius: 10px;
    border: lightgrey 1px solid;
    width: 17rem;
    height: 2.5em;
    text-align: center;
  }

  #password{
    font-family: 'Lobster', sans-serif;
    border-radius: 10px;
    border: lightgrey 1px solid;
    width: 17rem;
    height: 2.5em;
    text-align: center;
  }

</style>