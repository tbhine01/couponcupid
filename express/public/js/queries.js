process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

async function productSearch(item) {
  const location = "02400752"

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYXBzdG9uZWNvdXBvbmN1cGlkLWY3MzkyZDNmNDYxMzRkNzUyNWUyOTg5OTFkYjFjNDMyNjkyMDAzMDQzODU2ODY3NDMyMCIsImV4cCI6MTcwNTUxMDE1MywiaWF0IjoxNzA1NTA4MzQ4LCJpc3MiOiJhcGkua3JvZ2VyLmNvbSIsInN1YiI6ImQxZDFhOTA3LWMxMWQtNTlkYi05ODJkLTRkNzViMTZiNTQyMSIsInNjb3BlIjoicHJvZHVjdC5jb21wYWN0IiwiYXV0aEF0IjoxNzA1NTA4MzUzNDU5ODEwMzc0LCJhenAiOiJjYXBzdG9uZWNvdXBvbmN1cGlkLWY3MzkyZDNmNDYxMzRkNzUyNWUyOTg5OTFkYjFjNDMyNjkyMDAzMDQzODU2ODY3NDMyMCJ9.kaQrfg3tdAuqMwYijuFs67fTMnV6Z2o6BKp1mOPzqeBDMDhyOkRn7iQVT_3gbdgPh4qdNSpOC_86W60ZVNTwsGQa_sCs2lVfv0C1Ih9PawGv0A13VAE7C3kas0pXHTORbz3LF0Eomdnadbvcn3X3IXD2Pw8NgdOpI-hNfKQd0LyJ_RwcKFp6HIXbg5ZAaPqEyXVR8sE9AhOH3eDgH-wuI2DmXv05khHPwjuseH6u32LWLLhVKmreJsQxrQTqY_JbAB43CtKRiyy77D5SvQG54T3jueBQJHUplx4qUFlH17fl4i6CvH-FSF3AvNi4n2nsaXd7OaJd8uc7c_IbMfjmaQ");

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


module.exports = {
  productSearch, getProducts
}