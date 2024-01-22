<script setup>
import { reactive, ref } from 'vue'
import { useItemStore } from '../store/listStore.js'

const itemStore = useItemStore()
</script>


<template>
<div class="container">
    <h1>Your Coupon Collection</h1>
    <div v-for="item in itemStore.getFinalListItems">
        <h6> {{ item.coupon.title }}</h6>
    </div>
</div>

</template>


<style scoped>
.container{
    background-color: #fadde1;
    height: 100%;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5rem;
}
</style>