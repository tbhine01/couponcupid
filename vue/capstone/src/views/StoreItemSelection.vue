<script setup>
import { ref, reactive } from 'vue'
import { useItemStore } from '../store/listStore.js';
import { storeToRefs } from 'pinia'
import router from '@/router';

let itemStore = useItemStore()

function chooseProduct(selected){
    console.log(selected)
    itemStore.addFinalSelectedItems(selected)
}

function finalList(){
    router.push('/final-list')
}
</script>


<template>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">

    <div class="container">
        <div class="category" v-for="group in itemStore.getStoredKrogerItems">
            <h3 class="category_title">{{ group.category }}</h3>
            <div class="item_box">
                <div class="products" @click="chooseProduct(item)" v-for="item in group.items">
                    <img :src=item.image>
                    <p>{{ item.description }}</p>
                    <span class="prices">${{ item.price.regular }}</span>
                    <span class="prices promo" v-if="item.price.promo > 0"> ${{ item.price.promo }}</span>
                    <p class="coupon_icon" v-if="item.coupon"> <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-through-heart-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2.854 15.854A.5.5 0 0 1 2 15.5V14H.5a.5.5 0 0 1-.354-.854l1.5-1.5A.5.5 0 0 1 2 11.5h1.793l3.103-3.104a.5.5 0 1 1 .708.708L4.5 12.207V14a.5.5 0 0 1-.146.354zM16 3.5a.5.5 0 0 1-.854.354L14 2.707l-1.006 1.006c.236.248.44.531.6.845.562 1.096.585 2.517-.213 4.092-.793 1.563-2.395 3.288-5.105 5.08L8 13.912l-.276-.182A24 24 0 0 1 5.8 12.323L8.31 9.81a1.5 1.5 0 0 0-2.122-2.122L3.657 10.22a9 9 0 0 1-1.039-1.57c-.798-1.576-.775-2.997-.213-4.093C3.426 2.565 6.18 1.809 8 3.233c1.25-.98 2.944-.928 4.212-.152L13.292 2 12.147.854A.5.5 0 0 1 12.5 0h3a.5.5 0 0 1 .5.5z"/>
</svg>
                        <p class="coupon_description">{{ item.coupon.title }}</p>
                    </p>
                </div>
            </div>
        </div>
        <button class="submit" @click="finalList">Submit</button>
    </div>
</template>


<style scoped>
.container {
    width: 100vw;
    height: 100vh;
    background-color: #fadde1;
}

.item_box{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 15rem;
    gap: 1rem;
    margin: 1rem;
}
.category_title{
    background-color: #ffc2d1;
    color: #ff5d8f;
    font-family: 'Lobster', sans-serif;
    font-size: 250%;
    text-transform: capitalize;
    text-align: center;
    font-weight: bolder;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
    padding: 1rem;
}
.products {
    background-color: #fff0f3;
    height: 100%;
    width: 100%;
    text-align: center;
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 10px;
}
.products:hover{
    background-color: #ff8fa3;
}

.prices{
    font-weight: bold;
}

.promo{
    background-color: #ff758f;
    padding: 5px;
    border-radius: 10px;
    margin-left: 10px;
 
}

.coupon_description{
    visibility: hidden;
    font-size: small;
    background-color: white;
    border-radius: 10px;
}

.coupon_icon{
    color: #ff758f;
}

.coupon_icon:hover .coupon_description{
    visibility: visible;
}

.submit{
    width: 50rem;
    height: 3rem;
    margin-left: 50vh;
    background-color: #ffc2d1;
    border: none;
    border-radius: 15px;
    font-size: 2rem;
    color: #ff0a54;
    font-weight: bold;
    font-family: 'Lobster', sans-serif;
}
</style>