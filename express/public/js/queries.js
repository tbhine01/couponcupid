require('dotenv').config();
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const tokenManager = require("./token_manager.js")


const fetch = require('node-fetch');
const couponJson = require('./couponJson.js')
let accessToken = null;
let refreshToken = process.env.REFRESH_TOKEN;


async function productSearch(item) {

  if(!accessToken) {
    await getAccessToken();
  }

  var requestOptions = {
    method: 'GET',
    headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Accept": "application/json"
    },
    redirect: 'follow'
  };

  let res = await fetch(`https://api.kroger.com/v1/products?filter.term=${item}&filter.start=1&filter.limit=10`, requestOptions)

  if(res.status === 401) {
    await getAccessToken();
    requestOptions.headers["Authorization"] = `Bearer ${accessToken}`;
    res = await fetch(`https://api.kroger.com/v1/products?filter.term=${item}&filter.start=1&filter.limit=10`, requestOptions)
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
  // accessToken management is now handled by getAccessToken and productSearch

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
  if(!accessToken) {
    await getAccessToken();
  }

  var requestOptions = {
    method: 'GET',
    headers: {
        "Authorization": `Bearer ${accessToken}`,
    },
    redirect: 'follow'
  };

  let res = await fetch(`https://api.kroger.com/v1/locations?filter.zipCode.near=${zipcode}&filter.radiusInMiles=10&filter.limit=10`, requestOptions)

  if(res.status === 401) {
    await getAccessToken();
    requestOptions.headers["Authorization"] = `Bearer ${accessToken}`;
    res = await fetch(`https://api.kroger.com/v1/locations?filter.zipCode.near=${zipcode}&filter.radiusInMiles=10&filter.limit=10`, requestOptions)
  }

  const data = await res.json()
  console.log(data)
  return data;
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
  const tokenResult = await tokenManager.getByAuth();
  accessToken = tokenResult.access_token; // Update the global accessToken
  return tokenResult;
}


async function getCoupons(productId) {


  const coupons = couponJson.coupons.filter(coupon => coupon.productId === productId);


  return coupons;


}





module.exports = {


  productSearch,


  getProducts, 


  getLocations,


  getAccessToken,


  getCoupons


}