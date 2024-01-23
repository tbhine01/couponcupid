<script setup>

</script>

<template>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">

<div id="header">
    <img id="logo" src="../assets/couponcupid.png" alt="CouponCupid Logo">
    <h1 class="title">CouponCupid</h1>
    <div id="options">
    </div>
</div>
</template>

<style scoped>
#header{
    width: 100vw;
    height: 5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #fb6f92;
    margin: 0;
    padding: 1rem;
    font-family: 'Lobster', sans-serif;
}

#logo{
    width: 5rem;
    height: 5rem;
    /* border-radius: 50px; */
    /* border-style: ridge; */
}

.title{
    color: #ffe5ec;
    text-decoration:wavy;
}
</style>