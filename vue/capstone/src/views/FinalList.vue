<script setup>
import { reactive, ref } from 'vue'

let shoppingList = reactive([
    {
        item: "bananas"
    },
    {
        item: "Bleach"
    }
])

let groceryItem = ref('')
let editedItem = ref('')

function addItem() {
    if (groceryItem.value === "") {
        alert("Please Enter an Item")
    } else {
        shoppingList.push(
            {
                item: groceryItem.value
            }
        )
        console.log(shoppingList)
    }

    const shoppingListJson = JSON.stringify(shoppingList)
    localStorage.setItem('array', shoppingListJson)
}


function deleteItem(item) {
    for (let i = 0; i < shoppingList.length; i++) {
        if (shoppingList[i] === item) {
            shoppingList.splice(i, 1)
        }
    }
}

function editItem(item) {
    for (let i = 0; i < shoppingList.length; i++) {
        if (shoppingList[i] === item) {
            shoppingList[i] = {
                item: groceryItem.value
            }
            editedItem = item
        }
        console.log(`edited item is ${editedItem}`)
    }
}



const str = localStorage.getItem('array')
const parsedArray = JSON.parse(str)

console.log(parsedArray)

</script>


<template>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">

    <div class="container">
        <h1 id="title">Shopping List</h1>

        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Quantity</th>
                    <th scope="col">Item</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in shoppingList">
                    <th id="quantity_container"><input type="number" id="quantity"></th>
                    <td> {{ item.item }}</td>
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
    </div>
</template>


<style scoped>
.container {
    width: 100vw;
    background-color: #fadde1;
    height: 100vh;
}


#title {
    text-align: center;
    font-family: 'Lobster', sans-serif;
    padding: 2rem;
}

#quantity_container {
    width: 1rem;
    border: dis;
}

#quantity {
    width: 1.5rem;
    border: hidden
}

th {
    text-align: center;
}

tr {
    text-align: center;
}

td {
    text-align: center;
}
</style>