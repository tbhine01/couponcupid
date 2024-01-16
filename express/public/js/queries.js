process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

async function getProducts(groceryItems) {
  // groceryItems is the list of generic items
  let returnedItems = []

  groceryItems.forEach(async item => {
    let categoryContainer = []

    let krogerItems = await productSearch(item) 

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

  return returnedItems
}


async function productSearch(item) {
  const location = "02400752"

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYXBzdG9uZWNvdXBvbmN1cGlkLWY3MzkyZDNmNDYxMzRkNzUyNWUyOTg5OTFkYjFjNDMyNjkyMDAzMDQzODU2ODY3NDMyMCIsImV4cCI6MTcwNTQxMzE5MCwiaWF0IjoxNzA1NDExMzg1LCJpc3MiOiJhcGkua3JvZ2VyLmNvbSIsInN1YiI6ImQxZDFhOTA3LWMxMWQtNTlkYi05ODJkLTRkNzViMTZiNTQyMSIsInNjb3BlIjoicHJvZHVjdC5jb21wYWN0IiwiYXV0aEF0IjoxNzA1NDExMzkwNzQ0OTc2OTcyLCJhenAiOiJjYXBzdG9uZWNvdXBvbmN1cGlkLWY3MzkyZDNmNDYxMzRkNzUyNWUyOTg5OTFkYjFjNDMyNjkyMDAzMDQzODU2ODY3NDMyMCJ9.Ptge0nF_skacvL5cS9wapVjmR-ndq5SFG820gNupCKtpEwEXRIAYpiotXj0Fd5KKjMxVZsj-kKK7CLIDlgor2IHnrPsaKZda3_PFcmn4NtGpV1j4qcWP5QLV_OkBLhcFk0rOUvM0ubmSP0VXBh0KL0WHbIer93VbQ4s7y_v4eMYIypSe2WgIh_cVhFoZdCnLQ_4xQJRTGvH5_lOSXvZZ7mDOAT2E-zhRLarYNFvMQmaZ_qO1eiWra7tGBFYlOBAtBKXK04f6_HL0zRhmXfQmmHWdnasxBSbWSGUOL49ezbdELPu_MRSiFOT_dV5vNUjvPGeks8lEra_PCmVow2YeYw");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const res = await fetch(`https://api.kroger.com/v1/products?filter.term=${item}&filter.locationId=02400752&filter.start=1&filter.limit=10`, requestOptions)
  const data = await res.json()
  console.log(data)
  return data.data
  // .catch(error => console.log('error', error));
}

module.exports = {
  productSearch, getProducts
}