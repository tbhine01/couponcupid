import { defineStore } from 'pinia'
import { ref, computed, reactive} from 'vue'

export const useItemStore = defineStore('items', () => {
    const state = reactive({
        groceryItems: [],
        krogerItems: [],
        selectedItems: []
    })

    // function addGroceryItems(items) {
    //     state.groceryItems.push(...items)
    // }

    function addKrogerItems(items) {
        console.log(items)
        state.krogerItems.push(...items)
        console.log("state krogeritems", state.krogerItems)
    }

    function addFinalSelectedItems(items){
        console.log("this worked")
        state.selectedItems.push(items)   
        console.log(state.selectedItems)
    }

    const getStored = computed(() => {
        return state.groceryItems
    })

    const getStoredKrogerItems = computed(() => {
        return state.krogerItems
    })

    const getFinalListItems = computed (() => {
        return state.selectedItems
    })

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

    return { state, addKrogerItems, addFinalSelectedItems, getStored, getKrogerHighest, getKrogerLowest, getStoredKrogerItems, getFinalListItems}
}, {persist: true})
// export { useItemStore }

