process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));
  // const fetch = require('node-fetch');
  // const { Headers } = fetch;

async function productSearch(item) {
  const location = "02400752"

  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYXBzdG9uZWNvdXBvbmN1cGlkLWY3MzkyZDNmNDYxMzRkNzUyNWUyOTg5OTFkYjFjNDMyNjkyMDAzMDQzODU2ODY3NDMyMCIsImV4cCI6MTcwNTc5NTczNSwiaWF0IjoxNzA1NzkzOTMwLCJpc3MiOiJhcGkua3JvZ2VyLmNvbSIsInN1YiI6ImQxZDFhOTA3LWMxMWQtNTlkYi05ODJkLTRkNzViMTZiNTQyMSIsInNjb3BlIjoicHJvZHVjdC5jb21wYWN0IiwiYXV0aEF0IjoxNzA1NzkzOTM1MDA4NDAyODQyLCJhenAiOiJjYXBzdG9uZWNvdXBvbmN1cGlkLWY3MzkyZDNmNDYxMzRkNzUyNWUyOTg5OTFkYjFjNDMyNjkyMDAzMDQzODU2ODY3NDMyMCJ9.VzkrVCipfGAA_N38tRyTzRDGF01p1zHMyGswqZ-qqbMpFPhQ_d6TQttN0S0f_dXww7PZRyFY3zbzog8mk3MRX79tSe2clxsspTXy6BOYEZhu45eeENz21jQhZT-6KwgymsiQuXDPkxCL5D4Er_hOZXxwZliiZIJlfUCpXQLj5odjCZFDaPaenki71v1DF7LyLMgUY9tn0NIwCgBNP-l7duONJhR24wSqjwVfGuojSbZT7HpGlMp5gFJUnoRTLyX7EFo7k0WgwNQLPuo94rb5wXzb_XOqae4S3RCRBfkX-2mg93j5ktSlfjeWl73EY0JxycQjGeEwzPASk7Kl2Db2WQ");

  let token = {"Authorization": "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYXBzdG9uZWNvdXBvbmN1cGlkLWY3MzkyZDNmNDYxMzRkNzUyNWUyOTg5OTFkYjFjNDMyNjkyMDAzMDQzODU2ODY3NDMyMCIsImV4cCI6MTcwNTc5OTY2MCwiaWF0IjoxNzA1Nzk3ODU1LCJpc3MiOiJhcGkua3JvZ2VyLmNvbSIsInN1YiI6ImQxZDFhOTA3LWMxMWQtNTlkYi05ODJkLTRkNzViMTZiNTQyMSIsInNjb3BlIjoicHJvZHVjdC5jb21wYWN0IiwiYXV0aEF0IjoxNzA1Nzk3ODYwODI3ODc5ODM4LCJhenAiOiJjYXBzdG9uZWNvdXBvbmN1cGlkLWY3MzkyZDNmNDYxMzRkNzUyNWUyOTg5OTFkYjFjNDMyNjkyMDAzMDQzODU2ODY3NDMyMCJ9.cquOn4Kf0lTfrxJCc71z1sc-7jmAgutm3CB7iRt14jYrH2aDgTJ2KZdqUsYim0KjKeQ4MK0aArIUxp1YwS886E_UMmtacv7XOws0dYkH6le9yBGtgZ_4JuhVH76aMTH3xDqYPrU7cl8TTmjF6zTfsJ5qGSb52kd5FkVYDBAtKxVYnxJGj_q78Q7p4a7WIbyDHD23wm3Qq90pkg2aZ0v-_qb-AzNH6G8VjA_JyPcR3xi9tgg3n2y_6obkMC5KsXePjefk5G9_XiZYS70XiORgtergD0TBEvXylWTLZRfgs96ZUIIqtGA4B5EeyU553-AKgjRqGr_upjj0xa16Ou92Ng"}

  // const myHeaders = new Headers(token)

  var requestOptions = {
    method: 'GET',
    headers: token,
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