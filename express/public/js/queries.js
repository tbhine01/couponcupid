process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

function searchProducts(req, res){
    console.log(req.params)

    const item = req.params.item
    const location = req.params.location

   

    var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYXBzdG9uZWNvdXBvbmN1cGlkLWY3MzkyZDNmNDYxMzRkNzUyNWUyOTg5OTFkYjFjNDMyNjkyMDAzMDQzODU2ODY3NDMyMCIsImV4cCI6MTcwNTAwNzE1MCwiaWF0IjoxNzA1MDA1MzQ1LCJpc3MiOiJhcGkua3JvZ2VyLmNvbSIsInN1YiI6ImQxZDFhOTA3LWMxMWQtNTlkYi05ODJkLTRkNzViMTZiNTQyMSIsInNjb3BlIjoicHJvZHVjdC5jb21wYWN0IiwiYXV0aEF0IjoxNzA1MDA1MzUwMDY1NjQ1NTQ4LCJhenAiOiJjYXBzdG9uZWNvdXBvbmN1cGlkLWY3MzkyZDNmNDYxMzRkNzUyNWUyOTg5OTFkYjFjNDMyNjkyMDAzMDQzODU2ODY3NDMyMCJ9.Fz1UKbrRxCrejYPkKmJlZLb4Pfb2_d4gUCMTRIUB_rnunVV1YMfztByvXQHyODIWOl4zipWM7O6TI0kB4q_0IyzSfK85BumvYZBWpyJtP0i7h4Qm7J5T-UxIjh6143SWK_iuClN5RuxWEuNqjZulxWk64yeJb1dktx7ENnuzaOqz93NskrLr44dMccOocawZgqMp3ZNPZUP6S7Ea7ohbi4qFC6NfUlICkq0CHH2l3ocMJQo1fYXAa5L5nSebLUmyZgtn6UxSlYofQgWDJ7y0MDYU2rFzA74ay9WXMKW3sMUV4uCARL4SUt_V4VWGU4PrPPiLw7W0srCqcpxlAOr4SQ");

    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(`https://api.kroger.com/v1/products?filter.term=${item}&filter.locationId=${location}&filter.start=1&filter.limit=10`, requestOptions)
      .then(response =>  response.json())
      .then((data) => {
        res.send(data)
      })
      .catch(error => console.log('error', error));
}

module.exports = {
    searchProducts
}