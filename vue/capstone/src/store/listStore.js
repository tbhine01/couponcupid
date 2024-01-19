import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'

export const useItemStore = defineStore('items', () => {
    const state = reactive({
        groceryItems: [],
        krogerItems: []
    })

    function addGroceryItems(items) {
        state.groceryItems.push(...items)
    }

    function addKrogerItems(items) {
        state.krogerItems.push(...items)
    }

    const getStored = computed(() => {
        return state.groceryItems
    })

    // getter for Kroger Items

    const getKrogerHighest = computed(() => {
        let max = 0
        state.krogerItems.forEach(category => {
           let highestPrice = category.items.reduce(function (lowest, curr) {
                try {
                    return lowest.price.regular > curr.price.regular ? lowest : curr
                }
                catch (error) {
                    console.log(error)
                }
            })
        max += highestPrice.price.regular
    })
        return max
    })

    const getKrogerLowest = computed(() => {
        let min = 0
        state.krogerItems.forEach(category => {
           let lowestPrice = category.items.reduce(function (lowest, curr) {
                try {
                    return lowest.price.regular < curr.price.regular ? lowest : curr
                }
                catch (error) {
                    console.log(error)
                }
            })
        min += lowestPrice.price.regular
    })
        return min
    })

    persist: true
    return { state, addGroceryItems, addKrogerItems, getStored, getKrogerHighest, getKrogerLowest}
})
// export { useItemStore }




//   {

//     category: "milk",
//     items: [
//     {
//         "productId": "0001111042908",
//         "upc": "0001111042908",
//         "price": {
//             "regular": 6.29,
//             "promo": 0
//         },
//         "brand": "Simple Truth Organic",
//         "description": "Simple Truth Organic® Whole Milk",
//         "image": "some.image.url"
//     },
//     {
//         "productId": "0001111042908",
//         "upc": "0001111042908",
//         "price": {
//             "regular": 6.29,
//             "promo": 0
//         },
//         "brand": "Simple Truth Organic",
//         "description": "Simple Truth Organic® Whole Milk",
//         "image": "some.image.url"
//         }
//     ]
// },