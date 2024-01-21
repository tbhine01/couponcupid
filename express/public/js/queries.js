process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const couponJson = require('./couponJson.js')


async function productSearch(item) {
  const location = "02400752"

  let token = { "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYXBzdG9uZWNvdXBvbmN1cGlkLWY3MzkyZDNmNDYxMzRkNzUyNWUyOTg5OTFkYjFjNDMyNjkyMDAzMDQzODU2ODY3NDMyMCIsImV4cCI6MTcwNTg3ODgwMiwiaWF0IjoxNzA1ODc2OTk3LCJpc3MiOiJhcGkua3JvZ2VyLmNvbSIsInN1YiI6ImQxZDFhOTA3LWMxMWQtNTlkYi05ODJkLTRkNzViMTZiNTQyMSIsInNjb3BlIjoicHJvZHVjdC5jb21wYWN0IiwiYXV0aEF0IjoxNzA1ODc3MDAyODY4NTMzNDUxLCJhenAiOiJjYXBzdG9uZWNvdXBvbmN1cGlkLWY3MzkyZDNmNDYxMzRkNzUyNWUyOTg5OTFkYjFjNDMyNjkyMDAzMDQzODU2ODY3NDMyMCJ9.QVyegIFlMaJ143EZuvAcnKRsp1pDq_J6vWf7Ic8W_WyPXym8kZwD0zeAu3hsvvq_ceSdiBRBjFoNAtrGqpq3u24m7iOOBUustwH7upjRiBp3d1EnsD4twGC7jmxoZagUa_0jbNONoEacl77Pj0K631Nw6WU-ipheTD1UPBCZ_o8_Lm_8-Q3xaCf4AZyqoseNlgJFtqhLKR5hrGv1MKZEr6nby_3JUlwR-qeIUmgCX_3aT6l7X9mR6niHnMh-992--dNghyRxX_r0WnCe1hxt24An0-Mgjk8OgQT2mQKhAP13z4zBn_NHSu7yGiRLa9Z6GTKxx5BQmponPPkMm-IbJg" }


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

    // console.log(data.data)
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


module.exports = {
  productSearch,
  getProducts
}