const fs = require('fs');
const path = require('path');

// Try to load from /etc/secrets first (Render), then fallback to local .env
if (fs.existsSync('/etc/secrets/.env')) {
  require('dotenv').config({ path: '/etc/secrets/.env' });
  console.log('Loaded environment from /etc/secrets/.env');
} else if (fs.existsSync('.env')) {
  require('dotenv').config();
  console.log('Loaded environment from local .env');
} else {
  console.log('No .env file found, using system environment variables');
}
// require('dotenv').config();
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
console.log('ENV VARIABLES:', {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  OAUTH2_BASE_URL: process.env.OAUTH2_BASE_URL,
});
const express = require("express")
const path = require("path")
const app = express()
const queries = require('./public/js/queries.js')
const bodyParser = require('body-parser')
const cors = require("cors")

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
    let krogerInfo = await queries.getProducts(items)
    
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

// Users

//Get User by ID
app.get('/user/:id', queries.getUser)

// Register New User
app.post('/user', queries.createUser)

// Login 
app.post('/login', queries.login)

// app.listen(3000)
// console.log("Express App is running")

app.listen(3000, '0.0.0.0', () => {
  console.log('Express App is running')
});