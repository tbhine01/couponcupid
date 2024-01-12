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
app.get('/search/:item/:location', queries.searchProducts)

app.listen(3000)
console.log("Express App is running")