<script setup>
import { reactive, ref } from 'vue'
import { useItemStore } from '../store/listStore.js'

    const itemStore  = useItemStore()

    console.log(itemStore)
    let shoppingList = reactive([])

    let groceryItem = ref('')
    //let editedItem = ''
    let editedIndex = null

    // function getItemPrices() {
    //     console.log(itemStore)
    //     //make request
    //     itemStore.items.value.push("testttttt")
    // }

    function addItem(){
        if (groceryItem.value === ""){
            alert("Please Enter an Item")
            return;
        }
        
        //let existingItem = shoppingList.find(i=> i.item === editedItem);
        if (editedIndex) {
            let existingItem = shoppingList[editedIndex]
            existingItem.item = groceryItem.value
            //editedItem = ''
            editedIndex = null
        }
        else {
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
                //localStorage.removeItem(shoppingList[i])
                const shoppingListJson = JSON.stringify(shoppingList)
                localStorage.setItem('array', shoppingListJson)
            }
        }
    }

    function editItem(row){
        for(let i = 0; i < shoppingList.length; i++){
            if(shoppingList[i] === row){
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
      <!-- <th scope="col">Quantity</th> -->
      <th scope="col">Item</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in shoppingList">
      <!-- <th id="quantity_container"><input type="number" id="quantity"></th> -->
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

<button @click="getItemPrices">Submit</button>
<!-- call groceryItems -->

<div class="prices">
    <div>Estimated Total Price</div>
    <div class="stores">
        <div>
            Store 1
        </div>

        <div>
            Store 2
        </div>
    </div>
</div>

</template>


<style scoped>
  .prices{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
  }

  .stores{
    display: flex;
    gap: 5rem;
  }

</style>