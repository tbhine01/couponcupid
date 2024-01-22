<script setup>
import router from '@/router';

function get_started(){
  router.push('/general')
}


</script>

<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">

  <div class="container">
    <h1 id="title">CouponCupid</h1>
    <button id="get_started" @click="get_started">Get Started!</button>
  </div>
</template>

<style scoped>
  .container{
    background-image: url('../assets/background.png');
    background-color: #ff4d6d;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5rem;
  }

  #title{
    font-family: 'Lobster', sans-serif;
    color: #e05780;
    font-size: 500%;
  }

  #get_started{
    font-family: 'Lobster', sans-serif;
    width: 50vw;
    height: 10%;
    font-size: xx-large;
    border-radius: 30px;
    background-color: #ffb3c1;
    color: white;
    border: none;
  }
</style>
