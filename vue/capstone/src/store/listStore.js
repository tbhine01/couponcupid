import { defineStore } from 'pinia'
import { ref } from 'vue'

const SETTINGS_LOCAL_STORAGE_KEY = 'settings'

export const useItemStore = defineStore('items', {
    state: () => {
        if (localStorage.getItem("groceryItems"))
        return JSON.parse(localStorage.getItem("groceryItems"))
    }, 
    actions: {
        addGroceryItems(items){
            this.groceryItems.push(...items)
            localStorage.setItem("groceryItems")
        }
    }
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