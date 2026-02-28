
const tokenManager = require("./token_manager.js");
const fetch = require('node-fetch');
const couponJson = require('./couponJson.js')
let accessToken = null;
let refreshToken = process.env.REFRESH_TOKEN;

async function productSearch(queryTerm, start = 0, limit = 10, locationId) {

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

  let url = `https://api.kroger.com/v1/products?filter.term=${queryTerm}&filter.start=${start}&filter.limit=${limit}`;
  if (locationId) {
    url += `&filter.locationId=${locationId}`;
  }

  let res = await fetch(url, requestOptions)

  if(res.status === 401) {
    await getAccessToken(); // This will update the global accessToken
    requestOptions.headers["Authorization"] = `Bearer ${accessToken}`;
    res = await fetch(url, requestOptions)
  }

  const data = await res.json()

  if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
    return []
  }

  return data.data.map(item => {
    let imageArray = item.images.find(i => i.perspective === "front") || item.images[0];
    let image = imageArray ? (imageArray.sizes.find(i => i.size === "small") || imageArray.sizes[0]) : null;

    const coupon = couponJson.coupons.filter(coupon => coupon.productId === item.productId)
    let formattedItem = {
      "productId": item.productId,
      "upc": item.upc,
      "price": (item.items && item.items.length > 0) ? item.items[0].price : null,
      "brand": item.brand,
      "description": item.description,
      "image": image ? image.url : null,
      "coupon": coupon.length === 0 ? null : coupon[0]
    }
    return formattedItem
  })
}


async function getProducts(groceryItems, term = null, start = 0, limit = 10, locationId) {
  // accessToken management is now handled by getAccessToken and productSearch

  let formattedItems = [];
  if (term) {
    const krogerItems = await productSearch(term, start, limit, locationId);
    formattedItems.push({
      "category": term,
      "items": krogerItems
    });
  } else {
    console.log(groceryItems)
    const result = await groceryItems.map(async (item) => {
      const krogerItems = await productSearch(item, start, limit, locationId);
      let formattedItem = {
        "category": item,
        "items": krogerItems
      }
      return formattedItem
    });
    formattedItems = await Promise.all(result);
  }
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
    await getAccessToken(); // This will update the global accessToken
    requestOptions.headers["Authorization"] = `Bearer ${accessToken}`;
    res = await fetch(`https://api.kroger.com/v1/locations?filter.zipCode.near=${zipcode}&filter.radiusInMiles=10&filter.limit=10`, requestOptions)
  }

  const data = await res.json()
  return data;
}



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
  getCoupons,
  refreshHandler
};