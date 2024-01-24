process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const couponJson = require('./couponJson.js')
const Pool = require('pg').Pool

const pool = new Pool({
    user: 'thinesshelley',
    host: 'localhost',
    database: 'couponcupid', 
    password: 'password',
    port: 5432
})


async function productSearch(item) {
  const location = "02400752"

  let token = { "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYXBzdG9uZWNvdXBvbmN1cGlkLWY3MzkyZDNmNDYxMzRkNzUyNWUyOTg5OTFkYjFjNDMyNjkyMDAzMDQzODU2ODY3NDMyMCIsImV4cCI6MTcwNTk2MDk0MCwiaWF0IjoxNzA1OTU5MTM1LCJpc3MiOiJhcGkua3JvZ2VyLmNvbSIsInN1YiI6ImQxZDFhOTA3LWMxMWQtNTlkYi05ODJkLTRkNzViMTZiNTQyMSIsInNjb3BlIjoicHJvZHVjdC5jb21wYWN0IiwiYXV0aEF0IjoxNzA1OTU5MTQwODk3ODczNTIyLCJhenAiOiJjYXBzdG9uZWNvdXBvbmN1cGlkLWY3MzkyZDNmNDYxMzRkNzUyNWUyOTg5OTFkYjFjNDMyNjkyMDAzMDQzODU2ODY3NDMyMCJ9.aO7aSvSiA2-BXHCKd_XxQ6gm8_MPvQ0GaHoZBSQZFJz7ftAFETqnTl_QCTZAfBhcefpZy_ZlcfHAOB085K6oVAV5YeFdcPZ_UsreeqYX2zFz07InO144t-40Zirxeti473ytRaZNpBcJy016CwrAvBXjFOBrdEIgiTLuLcXLZicWT64SwJPI9BkENbs3kl1S3sw-GlfKLLuK320TwnbLmbso9Vj5tfBKCdrlMXUxPS_9ONsAYbGZY-D8OvEkAKXvcTJ9XA0AIVzGwTVntk3OzaNkb3aYcamnyun76LVOS4wf8jZhNnXwiIqwaPNIcxb6kvokDrU-cENP_ZsPy-nGNA" }


  var requestOptions = {
    method: 'GET',
    headers: token,
    redirect: 'follow'
  };

  const res = await fetch(`https://api.kroger.com/v1/products?filter.term=${item}&filter.locationId=02400752&filter.start=1&filter.limit=10`, requestOptions)
  const data = await res.json()



  return data.data.map(item => {
    let imageArray = item.images.find(i => i.perspective === "front")
    let image = imageArray.sizes.find(i => i.size === "small")

    const coupon = couponJson.coupons.filter(coupon => coupon.productId === item.productId)
    console.log(coupon)

    let formattedItem = {
      "productId": item.productId,
      "upc": item.upc,
      "price": item.items[0].price,
      "brand": item.brand,
      "description": item.description,
      "image": image.url,
      "coupon": coupon == [] ? null : coupon[0]
    }
    return formattedItem
  })
}


async function getProducts(groceryItems) {
  // groceryItems is the list of generic items
  console.log(groceryItems)
  const result = await groceryItems.map(async (item) => {
    const krogerItems = await productSearch(item);
    let formattedItem = {
      "category": item,
      "items": krogerItems
    }
    return formattedItem
  });

  let formattedItems = await Promise.all(result);
  return formattedItems
}

async function getLocations(zipcode){
  var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYXBzdG9uZWNvdXBvbmN1cGlkLWY3MzkyZDNmNDYxMzRkNzUyNWUyOTg5OTFkYjFjNDMyNjkyMDAzMDQzODU2ODY3NDMyMCIsImV4cCI6MTcwNTk0NzcyNiwiaWF0IjoxNzA1OTQ1OTIxLCJpc3MiOiJhcGkua3JvZ2VyLmNvbSIsInN1YiI6ImQxZDFhOTA3LWMxMWQtNTlkYi05ODJkLTRkNzViMTZiNTQyMSIsInNjb3BlIjoiIiwiYXV0aEF0IjoxNzA1OTQ1OTI2NTk1NTY3MzQzLCJhenAiOiJjYXBzdG9uZWNvdXBvbmN1cGlkLWY3MzkyZDNmNDYxMzRkNzUyNWUyOTg5OTFkYjFjNDMyNjkyMDAzMDQzODU2ODY3NDMyMCJ9.NmWVnbJYrhGkQGMghIfeuFjMj_f26OT-E81b6M1_ZoAy8ALnGBz1fZQurYUV_VKTyfRLNJ5oCAZw_lZvQKxFFaKWgczEf5LvRtLMIWPmCP5Y5i62en3e_KOi1MzbWUlgd7VpIJzZLo0gbS3QAjGGPfdk1zgqK7y4wjzXcabN6ZGYgvFP1eIqZZOI2m_RLpacCofw7DF3XM-oCMyS57eFlYHSK4LKJleT3VofDafZxHAQXPr3-HxO2cE9Kl7Xc7Dm-xTWC_cXrF0BmcTfd4qbJZwsFiriujq4gyaIuHgWSRasvtYHDHJUKUK32Sde4o-W9uT9R7QspvHaBIg-sRpVjA");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`https://api.kroger.com/v1/locations?filter.zipCode.near=${zipcode}&filter.radiusInMiles=10&filter.limit=10`, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

// Postgres Table
async function getUser(req, res) {
  const id = req.params.id

  await pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if(error){
          throw error 
      }
      res.status(200).json(results.rows)
  })
}

async function createUser(req, res) {
  const email = req.body.email
  const password = req.body.password
  const name = req.body.name

  await pool.query('INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING *', [email, name, password], (error, results) => {
      if (error){
          throw error 
      }

      res.status(201).send(results.rows) //201 means it successfully posted
  })
}

async function login (req, res) {
  const email = req.body.email
  const password = req.body.password

  await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password], (error, results) => {
      if(error){
          throw error 
      }

      // const token = tokenManger.generateAccessToken(results.rows[0].id) //generate our access token with the ID we get back from the database
      res.status(200).send(results.rows) //we are sendong back the token
  })
}


module.exports = {
  productSearch,
  getProducts, 
  getLocations,
  getUser,
  createUser,
  login
}