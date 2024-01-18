process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

async function productSearch(item) {
  const location = "02400752"

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYXBzdG9uZWNvdXBvbmN1cGlkLWY3MzkyZDNmNDYxMzRkNzUyNWUyOTg5OTFkYjFjNDMyNjkyMDAzMDQzODU2ODY3NDMyMCIsImV4cCI6MTcwNTUzMTEyNSwiaWF0IjoxNzA1NTI5MzIwLCJpc3MiOiJhcGkua3JvZ2VyLmNvbSIsInN1YiI6ImQxZDFhOTA3LWMxMWQtNTlkYi05ODJkLTRkNzViMTZiNTQyMSIsInNjb3BlIjoicHJvZHVjdC5jb21wYWN0IiwiYXV0aEF0IjoxNzA1NTI5MzI1ODQ1NDg4ODU5LCJhenAiOiJjYXBzdG9uZWNvdXBvbmN1cGlkLWY3MzkyZDNmNDYxMzRkNzUyNWUyOTg5OTFkYjFjNDMyNjkyMDAzMDQzODU2ODY3NDMyMCJ9.Oy1o0wP0GHAIYf3U6SrRlWMuqp6ncEzEIuSfhm2om2GzP3FE2a-bWOspILs3QFGxgA9ZvLqb9jJG8Fb-7g5GiXw-cDNp4Nj68Wbtdwh_asN3cbfY2_HUdaWEs9RxxAJsJvdmnRQZeRcHvBKDe-Fhvm1-8MjqYdfqoKe_Onyy485yFAGmxNvwRwe8eC20CFNcu4qenyXolZ4v0v1OGKQ483L5e1iqBWZi5KdiFw9Frs4qWSdhqA62Ao0X3f1akwS_4hwGakT_EFLnEMqU2JwkocyG9LinS39hEvorGhINtvUhFaln8nWVyLMPa1jgE063RoY5Q9MypftOI1T5oGtgfA");

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
  var myHeaders = new Headers();
    myHeaders.append("Accept-Language", "en-US");
    myHeaders.append("x-mock-response-code", "200");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(`https://api.kroger.com//experimental/savings/v0/discounts?filter.productId=${productId}&page.size=1&page.offset=0`, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

}

module.exports = {
  productSearch, 
  getProducts,
  getCoupons
}