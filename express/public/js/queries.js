process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

function getProducts(req, res) {
  // groceryItems is the list of generic items
  const groceryItems = req.body.groceryItems
  let returnedItems = []

  groceryItems.forEach(async item => {
    let categoryContainer = []

    let krogerItems = await productSearch(item) || []

    krogerItems.forEach(item => {
      categoryContainer.push(
        {
          "productId": item.productId,
          "upc": item.upc,
          "price": item.items[0].price,
          "brand": item.brand,
          "description": item.description,
          "image": item.images
        }
      )
    })

    returnedItems.push(
      {
        "category": item,
        "items": categoryContainer
      })

    console.log(returnedItems)
  })

  res.send(returnedItems)
}


async function productSearch(item) {
  const location = "02400752"

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYXBzdG9uZWNvdXBvbmN1cGlkLWY3MzkyZDNmNDYxMzRkNzUyNWUyOTg5OTFkYjFjNDMyNjkyMDAzMDQzODU2ODY3NDMyMCIsImV4cCI6MTcwNTI3NzE1NCwiaWF0IjoxNzA1Mjc1MzQ5LCJpc3MiOiJhcGkua3JvZ2VyLmNvbSIsInN1YiI6ImQxZDFhOTA3LWMxMWQtNTlkYi05ODJkLTRkNzViMTZiNTQyMSIsInNjb3BlIjoicHJvZHVjdC5jb21wYWN0IiwiYXV0aEF0IjoxNzA1Mjc1MzU0MTI5NjM0ODYwLCJhenAiOiJjYXBzdG9uZWNvdXBvbmN1cGlkLWY3MzkyZDNmNDYxMzRkNzUyNWUyOTg5OTFkYjFjNDMyNjkyMDAzMDQzODU2ODY3NDMyMCJ9.cCZ2LKJdyonTROEZ4JCv5Po4LfGq34oEOLmfjewYdZL13Kt8doOpHvBMsh6YlbZlkhtr73utPYMpgL0zm9uZkA0PUF8YcXhPX-FoaaRCTdEfOLNkIMQjGQ2EZC184_Df0TBd-qkFc8seuRzHOtUsoRxofCijOiafCf7X-k6t5gi0rJVOcSjJBYPTcFDlE4JDgMk6UCuaI_LujB-9EOaf2k3zK9w9j0TgzogA4cvcC7QEd4zn1_5b95g0lXqYMd_FLQLHyruhn1mY_YWB7RjCpsFtK4oaYFdD4pKnSwErttCtmLQljbIwm0daBRhq3mWKEpNWbxlrgBZYQLAjGAgGhw");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const res = await fetch(`https://api.kroger.com/v1/products?filter.term=${item}&filter.locationId=02400752&filter.start=1&filter.limit=10`, requestOptions)
  const data = await res.json()
  return data.data
  // .catch(error => console.log('error', error));
}

module.exports = {
  productSearch, getProducts
}