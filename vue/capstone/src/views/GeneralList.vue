<script setup>
import { reactive, ref } from 'vue'
import { useItemStore } from '../store/listStore.js'


const itemStore = useItemStore()
// console.log(itemStore)

let shoppingList = reactive([])

let groceryItem = ref('')
let editedIndex = null

function submitList() {
    itemStore.addGroceryItems(shoppingList)
// move fetch to itemStore
    fetch("http://localhost:3000/search-store",
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
    if (groceryItem.value === "") {
        alert("Please Enter an Item")
        return;
    }

    if (editedIndex != null) {
        let existingItem = shoppingList[editedIndex]
        existingItem.item = groceryItem.value
        editedIndex = null
    }
    else {
        // console.log(groceryItem.value)
        shoppingList.push(groceryItem.value)
        itemStore.state.groceryItems.push(groceryItem.value)
    }
    const shoppingListJson = JSON.stringify(shoppingList)
    localStorage.setItem('array', shoppingListJson)
}


function deleteItem(item) {
    for (let i = 0; i < shoppingList.length; i++) {
        if (shoppingList[i] === item) {
            shoppingList.splice(i, 1)
            //localStorage.removeItem(shoppingList[i])
            const shoppingListJson = JSON.stringify(shoppingList)
            localStorage.setItem('array', shoppingListJson)
        }
    }
}

function editItem(row) {
    for (let i = 0; i < shoppingList.length; i++) {
        if (shoppingList.value[i] === row) {
            //shoppingList[i] = {
            //    item: groceryItem.value
            //}
            groceryItem.value = row.item
            //editedItem = row.item
            editedIndex = shoppingList.indexOf(row)
        }
        console.log(`edited item is ${row}`)
    }
}

if (localStorage.getItem("shoppingList") === null) {
    addItem()
} else {
    JSON.parse(localStorage.getItem(shoppingList))
}

const str = localStorage.getItem('array')
const parsedArray = JSON.parse(str)

</script>


<template>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">

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
                <tr v-for="item in shoppingList">
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
            <button id="submit" @click="submitList">Submit</button>
        </div>
        <!-- turn off button after 1 click -->
        <!-- call groceryItems -->

        <div class="prices">
            <div>
                <h3 id="estimate">Estimated Total Price </h3>
            </div>
            <div class="stores">
                <div>
                    <h4 class="store_name">Kroger</h4>
                    <h4>{{ itemStore.getKrogerLowest }} - {{ itemStore.getKrogerHighest }}</h4>
                </div>

                <div>
                    <h4 class="store_name">Publix</h4>
                </div>
            </div>
        </div>
    </div>  
</template>


<style scoped>
.container{
    background-color: #fadde1;
    height: 100vh;
    width: 100vw;
}
#title {
    text-align: center;
    font-family: 'Lobster', sans-serif;
}

#search_container {
    display: flex;
    justify-content: center;
}

#search {
    border-radius: 1rem;
    text-align: center;
    width: 30rem;
}

#add {
    margin-left: 1rem;
    border-radius: 2rem;
}

.table{
    font-family: 'Lobster', sans-serif;
}

th{
    text-align: center;
}

tr{
    text-align: center;
}

td{
    text-align: center;
}

#estimate{
    text-decoration: underline;
    font-family: 'Lobster', sans-serif;
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
}

.store_name{
    font-family: 'Lilita One', sans-serif;
}

#submit_container {
    display: flex;
    justify-content: center;
    padding-bottom: 1rem;
}

#submit {
    border-radius: 2rem;
    width: 15rem;
}
</style>