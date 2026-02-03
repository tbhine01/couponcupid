const path = require('path');
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });
require('dotenv').config();

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const cors = require("cors")
const fetch = require('node-fetch'); // Ensure node-fetch is available
global.fetch = fetch;

const tokenManager = require('./public/js/token_manager.js');
const queries = require('./public/js/queries.js');

app.use(express.static(path.join(__dirname, '../vue/capstone/dist')))
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
    const { term, start, limit } = req.body;
    let krogerInfo = await queries.getProducts(items, term, start, limit)
    
    res.send(krogerInfo)
})

// app.get('/coupons', async (req, res) => {
//     let productId = req.body.productId
//     let coupons = await queries.getCoupons(productId)

//     res.send(coupons)
// } )

app.post('/coupons', (req, res) => {
    // res.send(couponJson.coupons)

    const productInput = req.body.productId

    for(let i = 0; i < couponJson.coupons.length; i++){
        if(couponJson.coupons[i].productId == productInput){
            res.send(couponJson.coupons[i])
        }
    }
})

app.post('locations', async (req, res) => {
    let zipcode = req.body.zipcode
    let locations = await queries.getLocations(zipcode)

    res.send(locations)
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something broke!' });
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Express App is running')
});