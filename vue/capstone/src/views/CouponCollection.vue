<script setup>
import { reactive, ref } from 'vue'
import { useItemStore } from '../store/listStore.js'

const itemStore = useItemStore()
console.log(itemStore.getFinalListItems[0].coupon.title)
</script>


<template>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">


<div class="container">
    <h1>Your Coupon Collection</h1>
    <div v-for="item in itemStore.getFinalListItems">
        <h6 v-if="item.coupon != undefined"> {{ item.coupon.title }}</h6>
    </div>
</div>

</template>


<style scoped>
.container{
    background-color: #fadde1;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5rem;
}

h1{
    font-family: 'Lobster', sans-serif;
    margin-top: 1rem;
}
</style>