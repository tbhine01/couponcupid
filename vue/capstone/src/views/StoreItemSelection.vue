<script setup>
import { ref, reactive } from 'vue'
import { useItemStore } from '@/store/listStore';

let results = reactive([])
let storedItems = useItemStore()

console.log("stored items", storedItems.groceryItems)

fetch("http://localhost:3000/search-store",
    {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            // storedItems.groceryItems
            "groceryItems": [
                "milk", "eggs"
            ]
        })
    })
.then((response) => {
    return response.json()
})
.then((data) => {
    results.push(...data)
    console.log(results)
})
.catch((error) => {
    console.log(error)
})

</script>


<template>
    <div class="container" v-for="item in results">
        <div>
            {{ item.category }}
            <div v-for= "stuff in item.items">
                <!-- <div v-for="pic in "></div> -->
                <h2>{{ stuff.description }}</h2>
            </div>
        </div>
       <!-- <div v-for="stuff in item.items">
            <h2>{{ stuff.description }}</h2>
       </div> -->
    </div>
</template>


<style scoped></style>