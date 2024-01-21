<script setup>
import { ref, reactive } from 'vue'
import { useItemStore } from '../store/listStore.js';
import { storeToRefs } from 'pinia'

let itemStore = useItemStore()

function chooseProduct(selected){
    console.log(selected)
    itemStore.addFinalSelectedItems(selected)
}
</script>


<template>
    <div class="container">
        <div class="category" v-for="group in itemStore.getStoredKrogerItems">
            <h3>{{ group.category }}</h3>
            <div class="item_box">
                <div class="products" @click="chooseProduct(item)" v-for="item in group.items">
                    <img :src=item.image>
                    <p>{{ item.description }}</p>
                    <p>{{ item.price.regular }}</p>
                </div>
            </div>
        </div>
        <button>Submit</button>
    </div>
</template>


<style scoped>
.container {
    width: 100vw;
    background-color: #fadde1;
}

.item_box{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 15rem;
    gap: 1rem;
    margin: 1rem;
}
h3{
    display: flex;
}

.products {
    background-color: #fff0f3;
    height: 100%;
    width: 25rem;
    text-align: center;
    margin-bottom: 1rem;
    padding: 1rem;
}

.products:hover{
    background-color: #ff8fa3;
}
</style>