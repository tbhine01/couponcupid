const express = require("express")
const path = require("path")
const app = express()
const queries = require('./public/js/queries.js')
const bodyParser = require('body-parser')
const cors = require("cors")

app.use(express.static(path.join(__dirname, '/public')))
app.use(bodyParser.json())
let corsOptions = {
    origin : 'http://localhost:5173'
 }
   
 app.use(cors(corsOptions))
//  app.options("/search-store", cors())

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/html/index.html'))
})


// Search Products

app.post('/search-store', async (req, res) => {
    // console.log("stuff")
    let items = req.body.groceryItems
    let krogerInfo = await queries.getProducts(items)
    
    res.send(krogerInfo)
})

app.get('/coupons', async (req, res) => {
    let productId = req.body.productId
    let coupons = await queries.getCoupons(productId)

    res.send(coupons)
} )

app.listen(3000)
console.log("Express App is running")

