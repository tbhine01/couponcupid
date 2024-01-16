const express = require("express")
const path = require("path")
const app = express()
const queries = require('./public/js/queries.js')
const bodyParser = require('body-parser')

app.use(express.static(path.join(__dirname, '/public')))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/html/index.html'))
})


// Search Products

app.post('/search-store', async (req, res) => {
    let items = req.body.groceryItems
    let krogerInfo = await queries.getProducts(items)
    
    res.send(krogerInfo)
})

app.listen(3000)
console.log("Express App is running")

