<script setup>
import { ref, reactive } from 'vue'
import { useItemStore } from '@/store/listStore';
import { storeToRefs } from 'pinia'

let results = reactive([])
let storedItems = useItemStore()

console.log("stored items", storedItems.getStored[0])

fetch("http://localhost:3000/search-store",
    {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({"groceryItems": storedItems.getStored})
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
        <div class="item_box">
            {{ item.category }}
            <div v-for= "stuff in item.items">
                <img :src=stuff.image>
                <h6>{{ stuff.description }}</h6>
                <h3>{{ stuff.price.regular }}</h3>
            </div>
        </div>
    </div>
</template>


<style scoped>
.container{
    display: flex;
    flex-direction: row;
}
.item_box{
    width: 5rem;
}
</style>