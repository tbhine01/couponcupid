<script setup>
import { reactive, ref } from 'vue'
import { useItemStore } from '../store/listStore.js'
import Header from '@/components/Header.vue';

const itemStore = useItemStore()
console.log(itemStore.getFinalListItems)
</script>


<template>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">

<Header></Header>
<div class="container">
    <h1>Your Coupon Collection</h1>
    <div v-for="item in itemStore.getFinalListItems">
        <div v-if="item.coupon != undefined" class="coupon">
        <h6> {{ item.coupon.title }}
        <div><img class="barcode" src='../assets/barcode.png'></div>
        </h6>
        
    </div>
        
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
}

h1{
    font-family: 'Lobster', sans-serif;
    margin-top: 1rem;
}

.coupon{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff0f3;
    padding: 1rem;
    margin: 3rem;
    border: 3px dashed black;
}

.barcode{
    height: 5rem;
    width: 25rem;
}
</style>