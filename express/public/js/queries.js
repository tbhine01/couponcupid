process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const couponJson = require('./couponJson.js')


async function productSearch(item) {
  const location = "02400752"

  let token = { "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYXBzdG9uZWNvdXBvbmN1cGlkLWY3MzkyZDNmNDYxMzRkNzUyNWUyOTg5OTFkYjFjNDMyNjkyMDAzMDQzODU2ODY3NDMyMCIsImV4cCI6MTcwNTkzNzExMiwiaWF0IjoxNzA1OTM1MzA3LCJpc3MiOiJhcGkua3JvZ2VyLmNvbSIsInN1YiI6ImQxZDFhOTA3LWMxMWQtNTlkYi05ODJkLTRkNzViMTZiNTQyMSIsInNjb3BlIjoicHJvZHVjdC5jb21wYWN0IiwiYXV0aEF0IjoxNzA1OTM1MzEyODI3NDI1MDk4LCJhenAiOiJjYXBzdG9uZWNvdXBvbmN1cGlkLWY3MzkyZDNmNDYxMzRkNzUyNWUyOTg5OTFkYjFjNDMyNjkyMDAzMDQzODU2ODY3NDMyMCJ9.ww56nFC-qKFnqwfJwdV1d3I6n3ON8vktNl_PbGUHVkubUf3VrXBDrMZuqbqgKY9sjqpzxLW5ptVQ85maWiBjZz2DNIT_-dMUucp3RTdcugHK6CHIYqn0NJeIXMgsOnYHFDVldu9cKzkRfTszYK2m_t1Ja4tUKr0aV3PzYm4eO1EtDohR0lJzUp8LZoegu3VJ7auuMhhbDgSiHclq9ybSacNFmLdET6WS63aaBWibn5-toBlvBHFFjBbFvVHoo2b7-1SggJBVmBpUwY51DR55SWYp--VO6vl1267JyW1Mw_7NvdM4SMHhxoMwIRLLyYW3EWyTrO2PgsVAKqGvGImmYg" }


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