<script setup>
import { reactive, ref } from 'vue'

    let shoppingList = reactive([])

    let groceryItem = ref('')
    let editedItem = ref('')
    

    function addItem(){
        if (groceryItem.value === ""){
            alert("Please Enter an Item")
        }else{
            shoppingList.push(
                {
                    item: groceryItem.value
                }
            )
            // console.log(shoppingList)
        }

        const shoppingListJson = JSON.stringify(shoppingList)
        localStorage.setItem('array', shoppingListJson)
    }


    function deleteItem(item){
        for(let i = 0; i < shoppingList.length; i++){
            if(shoppingList[i] === item){
                shoppingList.splice(i, 1)
                localStorage.removeItem(shoppingList[i])
            }
        }
    }

    function editItem(item){
        for(let i = 0; i < shoppingList.length; i++){
            if(shoppingList[i] === item){
                shoppingList[i] = {
                    item: groceryItem.value
                }
                editedItem = item
            }
            console.log(`edited item is ${editedItem}`)
        }
    }

    if(localStorage.getItem("shoppingList") === null){
        addItem()
    } else {
        JSON.parse(localStorage.getItem(shoppingList))
    }
    
    const str = localStorage.getItem('array')
    const parsedArray = JSON.parse(str)

    console.log(parsedArray)   

</script>


<template>
<div class="container">
    <h1>Shopping List</h1>

    <!-- Input -->
    <div>
        <input v-model="groceryItem" type="text" placeholder="Enter Item">
        <button @click="addItem">Add</button>
    </div>

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
    #quantity_container{
        width: 1rem;
    }

    #quantity{
        width: 1.5rem;
        border: hidden
    }

</style>