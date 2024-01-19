process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

async function productSearch(item) {
  const location = "02400752"

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYXBzdG9uZWNvdXBvbmN1cGlkLWY3MzkyZDNmNDYxMzRkNzUyNWUyOTg5OTFkYjFjNDMyNjkyMDAzMDQzODU2ODY3NDMyMCIsImV4cCI6MTcwNTcwMzMzOCwiaWF0IjoxNzA1NzAxNTMzLCJpc3MiOiJhcGkua3JvZ2VyLmNvbSIsInN1YiI6ImQxZDFhOTA3LWMxMWQtNTlkYi05ODJkLTRkNzViMTZiNTQyMSIsInNjb3BlIjoicHJvZHVjdC5jb21wYWN0IiwiYXV0aEF0IjoxNzA1NzAxNTM4NzE0NTk2NTExLCJhenAiOiJjYXBzdG9uZWNvdXBvbmN1cGlkLWY3MzkyZDNmNDYxMzRkNzUyNWUyOTg5OTFkYjFjNDMyNjkyMDAzMDQzODU2ODY3NDMyMCJ9.mTqQdBeKXgUS2U33a6Klwtei6WcymNl9hgEsof2M5Xb0PeRwY6CgEW9ztcrd4gpXniYJWbs1lIblzZO8khVweDnsCtp7GkUOmsBWCajPPqiJFYxAAVBV5LLlMZTHv4UrY87ULTCN2CHgyjS6HYf_nlk7J_wp4p4tVONI7XzM3DlCGoS3MbfefpLtbvEGkIk0VTdz9d_fE5Gk2NauCUVkSiezJ9HiOUjtUXn7plx5XWwoLiaIk62y51TW3DB6X4AcEU3VRPQ1L5VHliBZ0SQizJUVN1PCLQ0B2dIl-nyOrHn5beEyRQE4kqp4EboHAS6AB80k9eS9JExEW5MDFyQbwQ");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const res = await fetch(`https://api.kroger.com/v1/products?filter.term=${item}&filter.locationId=02400752&filter.start=1&filter.limit=10`, requestOptions)
  const data = await res.json()

  // console.log(data.data)
  

  return data.data.map(item => {
    let imageArray = item.images.find(i => i.perspective === "front")
    let image = imageArray.sizes.find(i => i.size === "small")

    let formattedItem = {
      "productId": item.productId,
      "upc": item.upc,
      "price": item.items[0].price,
      "brand": item.brand,
      "description": item.description,
      "image": image.url

    }
    
    console.log(data.data)
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


function getCoupons(productId){
  fetch("http://localhost:3000/coupons")
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(results)
    })
    .catch((error) => {
        console.log(error)
    })

}

module.exports = {
  productSearch, 
  getProducts,
  getCoupons
}