process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const couponJson = require('./couponJson.js')


async function productSearch(item) {
  const location = "02400752"

  let token = { "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYXBzdG9uZWNvdXBvbmN1cGlkLWY3MzkyZDNmNDYxMzRkNzUyNWUyOTg5OTFkYjFjNDMyNjkyMDAzMDQzODU2ODY3NDMyMCIsImV4cCI6MTcwNTk0NjA5OSwiaWF0IjoxNzA1OTQ0Mjk0LCJpc3MiOiJhcGkua3JvZ2VyLmNvbSIsInN1YiI6ImQxZDFhOTA3LWMxMWQtNTlkYi05ODJkLTRkNzViMTZiNTQyMSIsInNjb3BlIjoicHJvZHVjdC5jb21wYWN0IiwiYXV0aEF0IjoxNzA1OTQ0Mjk5NTIxMjQ1MzA3LCJhenAiOiJjYXBzdG9uZWNvdXBvbmN1cGlkLWY3MzkyZDNmNDYxMzRkNzUyNWUyOTg5OTFkYjFjNDMyNjkyMDAzMDQzODU2ODY3NDMyMCJ9.KiCRcdAYkqFn-8xpibVtBwgJ9S4V0bGhpQ-88Ix9YnGvx_QjxT6sVsyIyT8aF4iaSNs6j5OuepyxLMjDPNM-eQbHHKKmfHo7SSRLGDwY72H8_kCXJTqTgBHCKFH0Eg_PuItD4FTSGm8-hPQ_xd-jS0rDHVvIU9Aw5Zy8Y60JfOpORf5W4TGhJnO2cCtSOcZmZLprde-4YKrHPdJUnNfeq_u6uAf6v9rgCNV0HFpIMReSa9fQwaMSwozFNNqQDeV0k2wiulRMhC3Vq7G8F6ifpUBA9uQTVtKchPRLxZdhxPGhpoyI6cfBP15hqQ0zNqQp7HcyMHsJo7MqD16iZCoo2Q" }


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