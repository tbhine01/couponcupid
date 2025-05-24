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

    function assignRandomPricesToKrogerItems(items) {
    return items.map(category => ({
        ...category,
        items: category.items.map(item => ({
            ...item,
            price: { regular: +(Math.random() * 24 + 1).toFixed(2) }
        }))
    }))
}

    function addKrogerItems(items) {
        console.log("Kroger API returned products:", items)
        const emptyCategory = items.find(category => !category.items || category.items.length === 0)
        if (emptyCategory) {
            alert(`No items found for category: ${emptyCategory.category}`)
            return
        }
        const itemsWithPrices = assignRandomPricesToKrogerItems(items)
        console.log("items with prices2", itemsWithPrices)

        state.krogerItems = itemsWithPrices;
        // state.krogerItems = items
        console.log("state krogeritems", state.krogerItems)
    }

    function addFinalSelectedItems(items){
        console.log("this worked")
        state.selectedItems.push(items)   
        console.log(state.selectedItems)
    }

    function removeFinalSelectedItem(item){
        state.selectedItems = state.selectedItems.filter(i => i.productid !== item.productid)  
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
            }, category.items[0])
        max += highestPrice.price.regular
    })
        return Math.round(max * 100) /100
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
            }, category.items[0])
        min += lowestPrice.price.regular
    })
        return Math.round(min * 100) /100
    })

    return { state, addKrogerItems, addFinalSelectedItems, getStored, getKrogerHighest, getKrogerLowest, getStoredKrogerItems, getFinalListItems, removeFinalSelectedItem}
}, {persist: true})
// export { useItemStore }

