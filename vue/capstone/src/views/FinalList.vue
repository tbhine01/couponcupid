<script setup>
import { reactive, ref } from 'vue'
import { useItemStore } from '../store/listStore.js'
import router from '@/router';
import Header from '@/components/Header.vue';

const itemStore = useItemStore()

console.log(itemStore.getFinalListItems)

function couponCollection(){
    router.push('/coupons')
}

function deleteItem(item) {
    for (let i = 0; i < itemStore.getFinalListItems.length; i++) {
        if (itemStore.getFinalListItems[i] === item) {
            itemStore.getFinalListItems.splice(i, 1)
        }
    }
}

function total(){
   let finalList = itemStore.getFinalListItems
   let total = 0
   console.log(finalList)
   for(let i = 0; i < finalList.length; i++){
        total += finalList[i].price.regular
    }
   console.log(total)
   return Math.round(total * 100) / 100
}
total()
</script>


<template>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">

    <Header></Header>
    <div class="container">
        <div class="header_container">
            <h1 id="title">Shopping List</h1>
            <button class="coupon_button" @click="couponCollection">Coupon Collection</button>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Quantity</th>
                    <th scope="col">Item</th>
                    <th scope="col"> Price</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in itemStore.getFinalListItems">
                    <th id="quantity_container"><input type="number" id="quantity" min="0"></th>
                    <td> 
                        {{ item.description }}
                        <span class="coupon_icon" v-if="item.coupon"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-through-heart-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M2.854 15.854A.5.5 0 0 1 2 15.5V14H.5a.5.5 0 0 1-.354-.854l1.5-1.5A.5.5 0 0 1 2 11.5h1.793l3.103-3.104a.5.5 0 1 1 .708.708L4.5 12.207V14a.5.5 0 0 1-.146.354zM16 3.5a.5.5 0 0 1-.854.354L14 2.707l-1.006 1.006c.236.248.44.531.6.845.562 1.096.585 2.517-.213 4.092-.793 1.563-2.395 3.288-5.105 5.08L8 13.912l-.276-.182A24 24 0 0 1 5.8 12.323L8.31 9.81a1.5 1.5 0 0 0-2.122-2.122L3.657 10.22a9 9 0 0 1-1.039-1.57c-.798-1.576-.775-2.997-.213-4.093C3.426 2.565 6.18 1.809 8 3.233c1.25-.98 2.944-.928 4.212-.152L13.292 2 12.147.854A.5.5 0 0 1 12.5 0h3a.5.5 0 0 1 .5.5z"/>
                        </svg> </span>
                    </td>
                    <td v-if="item.price.promo > 0"> ${{ item.price.promo }}</td>
                    <td v-else>${{ item.price.regular }}</td>
                    <td>
                        <div @click="deleteItem(item)">
                            <span class="fa fa-trash"></span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="total_container">
            <div id="total_box">
            <h4 class="total">Total</h4>
            <h5 class="amount">$ {{ total() }}</h5>
            </div>
        </div>
    </div>
</template>


<style scoped>
.container {
    width: 100vw;
    background-color: #fadde1;
    height: 100vh;
    position: relative;
}

.header_container{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4rem;
}

.coupon_button{
    border-radius: 2rem;
    background-color: #ffc2d1;
    color: #ff0a54;
    border: none;
    width: 13rem;
    height: 4rem;
    font-weight: bolder;
    font-size: 125%;
    font-family: 'Lobster', sans-serif;
    position: absolute;
    right: 1rem;
}

.coupon_button:hover{
    background-color: #ff8fa3;
}

#title {
    text-align: center;
    font-family: 'Lobster', sans-serif;
    padding: 2rem;
}


#quantity {
    width: 3rem;
    border: 1px solid white;
    background-color: #fadde1;
    text-align: center;
}

th {
    text-align: center;
    font-size: 200%;
    font-family: 'Lobster', sans-serif;
}

tr {
    text-align: center;
}

td {
    text-align: center;
    font-size: 150%;
    font-family: 'Times New Roman', Times, serif;
    font-weight: bold;
}

.coupon_icon{
    color: #ff758f;
    margin-left: 1rem;
}

.total_container{
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-bottom: 10rem;
    width: 100vw;
    justify-content: center;
    align-items: center;
}

#total_box{
    background-color: #ffc2d1;
    width: 20rem;
    padding: .5rem;
    border-radius: 25px;
}

.total{
    font-family: 'Lobster', sans-serif;
    font-weight: bold;
    font-size: 2rem;
}

.amount{
    font-size: 180%;
    font-weight: bold;
}

</style>