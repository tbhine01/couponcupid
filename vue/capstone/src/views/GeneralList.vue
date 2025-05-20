<script setup>
import { reactive, ref } from 'vue'
import { useItemStore } from '../store/listStore.js'
import router from '@/router';
import Header from '@/components/Header.vue';


const itemStore = useItemStore()

function storePage(){
  router.push('/store-items')
}


let groceryItem = ref('')
let editedIndex = null

function submitList() {
    let submitted = document.getElementById("submit")
    submitted.classList.add("test")

    fetch("http://localhost:3000/search-store",
    // https://couponcupid.onrender.com/search-store
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "groceryItems": itemStore.getStored })
        })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(itemStore.getStored)
            itemStore.addKrogerItems(data)
            console.log(itemStore.getStoredKrogerItems)
        })
        .catch((error) => {
            console.log(error)
        })
}

function addItem() {
    let list = itemStore.state.groceryItems

    if (editedIndex != null) {
        let existingItem = list[editedIndex]
        console.log(list)
        console.log("edited index", editedIndex)
        console.log(existingItem)
        existingItem = groceryItem.value
        list[editedIndex] = existingItem
        editedIndex = null
    }
    else {
        itemStore.state.groceryItems.push(groceryItem.value)
        console.log(itemStore.state.groceryItems)
    }
   return groceryItem.value = ''
}


function deleteItem(item) {
    let list = itemStore.state.groceryItems
    for (let i = 0; i < list.length; i++) {
        if (list[i] === item) {
            list.splice(i, 1)
        }
    }
}

function editItem(row) {
    let list = itemStore.state.groceryItems
    for (let i = 0; i < list.length; i++) {
        if (list[i] === row) {
            groceryItem.value = list[i]
            editedIndex = i
            console.log(list)
        }
        console.log(`edited item is ${row}`)
    }
}

</script>


<template>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">

<Header></Header>
    <div class="container">
        <h1 id="title">Search</h1>

        <!-- Input -->
        <div id="search_container">
            <input v-model="groceryItem" type="text" id="search" placeholder="Enter Item">
            <button id="add" @click="addItem">Add</button>
        </div>

        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Item</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in itemStore.state.groceryItems">
                    <td> {{ item }}</td>
                    <td>
                        <div @click="editItem(item)">
                            <span class="fa fa-pen"></span>
                        </div>
                    </td>
                    <td>
                        <div @click="deleteItem(item)">
                            <span class="fa fa-trash"></span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
   

        <div id="submit_container">
            <button id="submit" v-on:click="submitList">Submit</button>
        </div>

        <div class="prices">
            <div>
                <h3 id="estimate">Estimated Total Price </h3>
            </div>
            <div class="stores">
                <div class="store_container" @click="storePage">
                    <h4 class="store_name">Kroger</h4>
                    <h4>${{ itemStore.getKrogerLowest }} - ${{ itemStore.getKrogerHighest }}</h4>
                </div>

                <div class="store_container">
                    <h4 class="store_name">Publix</h4>
                    <h4>${{ Math.round(((itemStore.getKrogerLowest) + (itemStore.getKrogerLowest) * 0.15) * 100)/100 }} - ${{ Math.round(((itemStore.getKrogerHighest) + (itemStore.getKrogerHighest) * 0.15) * 100)/ 100}}</h4>
                </div>
            </div>
        </div>
    </div>  
</template>


<style scoped>
.container{
    background-color: #ffe5ec;
    height: 100vh;
    width: 100vw;
}
#title {
    text-align: center;
    font-family: 'Lobster', sans-serif;
    padding: 2rem;
    /* font-size: 3rem;1.5 */
}

#search_container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
}

#search {
    border-radius: 1rem;
    text-align: center;
    width: 30rem;
    height: 2.5rem;
    font-family: 'Lobster', sans-serif;
    font-size: xx-large;
}

#add {
    margin-left: 1rem;
    border-radius: 2rem;
    background-color: #ffc2d1;
    color: #ff0a54;
    border: none;
    width: 10rem;
    height: 2rem;
    font-weight: bolder;
    font-family: 'Lobster', sans-serif;
    font-size: 150%;
    text-align: center;
}

#add:hover{
    background-color: #ff8fa3;
}


th{
    text-align: center;
    font-size: 200%;
    font-family: 'Lobster', sans-serif;
}

tr{
    text-align: center;
}

td{
    text-align: center;
    font-size: 150%;
    text-transform: capitalize;
    font-family: 'Times New Roman', Times, serif;
    font-weight: bold;
}

#estimate{
    text-decoration: underline;
    font-family: 'Lobster', sans-serif;
}

#submit_container {
    display: flex;
    justify-content: center;
    padding-bottom: 1rem;
}

#submit {
    width: 50rem;
    height: 3rem;
    background-color: #ffc2d1;
    border: none;
    border-radius: 15px;
    border-style: outset;
    font-size: 2rem;
    color: #ff0a54;
    font-weight: bold;
    font-family: 'Lobster', sans-serif;
}

.test{
    background-color: #ff8fa3;
}

.prices {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
}
.stores {
    display: flex;
    gap: 5rem;
    text-align: center;
}
.store_container:hover{
    border: solid 5px white;
    padding: 1rem;
    border-radius: 10px;
    border-style: outset;
}

.store_name{
    font-family: 'Lilita One', sans-serif;
    font-weight: bold;
}

</style>