<script setup>
import { ref, reactive } from 'vue'
import { useItemStore } from '../store/listStore.js';
import { storeToRefs } from 'pinia'

let results = reactive([])
let storedItems = useItemStore()

console.log("stored items", storedItems.state.krogerItems)



    // function chooseProduct(){
    //    let color =  document.getElementsByClassName("selected")
    //     document.body.style.color = "purple"
    // }

</script>


<template>
    <div class="container">
        <div class="category">
            <div class="item_box" v-for="item in results">
                <h3>{{ item.category }}</h3>
                <div @click="chooseProduct" class="products selected" v-for="stuff in item.items">
                    <img class :src=stuff.image>
                    <p>{{ stuff.description }}</p>
                    <p>{{ stuff.price.regular }}</p>
                </div>
            </div>
        </div>
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

/* .item_box {
    display: inline-block;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    gap: 1rem;
    margin-left: 1rem;
} */

.products {
    background-color: #fff0f3;
    border: 1px grey solid;
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