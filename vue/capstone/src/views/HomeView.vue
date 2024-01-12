<script setup>

</script>

<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">

  <div class="container">
    <h1 id="title">CouponCupid</h1>
    <button>Get Started!</button>
  </div>
</template>

<style scoped>
  .container{
    background-color: #EEE5E5;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5rem;
  }

  #title{
    font-family: 'Lobster', sans-serif;
    font-size: 500%;
  }

  button{
    width: 50vw;
    height: 10%;
    font-size: xx-large;
    border-radius: 30px;
    background-color: #D34F73;
    color: white;
  }
</style>
