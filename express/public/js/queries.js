require('dotenv').config();
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const tokenManager = require("./token_manager.js")


const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const couponJson = require('./couponJson.js')
const Pool = require('pg').Pool
let accessToken = ""
let refreshToken = process.env.KROGER_REFRESH_TOKEN;

const pool = new Pool({
    user: 'thinesshelley',
    host: 'localhost',
    database: 'couponcupid', 
    password: 'password',
    port: 5432
})


async function productSearch(item) {

  const location = "02400752"
  console.log(accessToken)
  let token = { "Authorization": `Bearer ${accessToken}` }


  var requestOptions = {
    method: 'GET',
    headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Accept": "application/json"
    },
    redirect: 'follow'
  };

  let res = await fetch(`https://api-ce.kroger.com/v1/products?filter.term=${item}&filter.start=1&filter.limit=10`, requestOptions)

  if(res.status === 401) {
    const token = await tokenManager.getByRefresh(refreshToken)
    requestOptions.headers = { "Authorization": `Bearer ${token.access_token}` }
    res = await fetch(`https://api-ce.kroger.com/v1/products?filter.term=${item}&filter.start=1&filter.limit=10`, requestOptions)
  }

  const data = await res.json()
  console.log(data)

  if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
    return []
  }

  return data.data.map(item => {
    let imageArray = item.images.find(i => i.perspective === "front")
    let image = imageArray.sizes.find(i => i.size === "small")

    const coupon = couponJson.coupons.filter(coupon => coupon.productId === item.productId)
    let formattedItem = {
      "productId": item.productId,
      "upc": item.upc,
      "price": item.items[0].price,
      "brand": item.brand,
      "description": item.description,
      "image": image.url,
      "coupon": coupon.length === 0 ? null : coupon[0]
    }
    return formattedItem
  })
}


async function getProducts(groceryItems) {
  // groceryItems is the list of generic items
  console.log(groceryItems)
  if(!accessToken) {
    // make the call to get a new access token using refresh token
    const refreshResult = await getAccessToken()
    accessToken = refreshResult.access_token
    // refreshToken = refreshResult.refresh_token
    console.log(accessToken)
  }

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

fetch(`https://api-ce.kroger.com/v1/locations?filter.zipCode.near=${zipcode}&filter.radiusInMiles=10&filter.limit=10`, requestOptions)
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
      res.status(200).send(results.rows[0]) //we are sendong back the token
  })
}

// async function refreshHandler(req, res) {
//   if (!req.body.refreshToken) {
//       res.sendStatus(400)
//       return
//   }

//   try {
//       const token = await tokenManager.getByRefresh(req.body.refreshToken)
//       const result = {
//           refreshToken: token.refresh_token,
//           access_token: token.access_token
//       }
//   }

//   catch (error) {
//       console.log(error)
//   }
// }

async function refreshHandler() {
  try {
      const token = await tokenManager.getByRefresh(refreshToken)
      const result = {
          refreshToken: token.refresh_token,
          access_token: token.access_token
      }

      return result
  }

  catch (error) {
      console.error(error)
      return {}
  }
}

async function getAccessToken() {
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }
  return await tokenManager.getByRefresh(refreshToken);
}


module.exports = {
  productSearch,
  getProducts, 
  getLocations,
  getUser,
  createUser,
  login,
  getAccessToken
}