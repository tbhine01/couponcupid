import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useItemStore = defineStore('items', {
    state: () => ({
        groceryItems: []
    }),
    actions: {
        addGroceryItems(items) {
            this.groceryItems.push(...items)
        }
    },
    getters: {
        getStored: (state) => {
            return state.groceryItems
        }
    },
    persist: true
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