process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

async function searchProducts(req, res){
    const item = req.body
    // const locationId = req.body.location

    console.log(req)
    console.log(item)
    // console.log(locationId)
   

    var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYXBzdG9uZWNvdXBvbmN1cGlkLWY3MzkyZDNmNDYxMzRkNzUyNWUyOTg5OTFkYjFjNDMyNjkyMDAzMDQzODU2ODY3NDMyMCIsImV4cCI6MTcwNTAwMTUwNiwiaWF0IjoxNzA0OTk5NzAxLCJpc3MiOiJhcGkua3JvZ2VyLmNvbSIsInN1YiI6ImQxZDFhOTA3LWMxMWQtNTlkYi05ODJkLTRkNzViMTZiNTQyMSIsInNjb3BlIjoicHJvZHVjdC5jb21wYWN0IiwiYXV0aEF0IjoxNzA0OTk5NzA2Mjg3ODQ1NDkxLCJhenAiOiJjYXBzdG9uZWNvdXBvbmN1cGlkLWY3MzkyZDNmNDYxMzRkNzUyNWUyOTg5OTFkYjFjNDMyNjkyMDAzMDQzODU2ODY3NDMyMCJ9.BrhSPB4ZiLNUhN_ZuL6SC6bAHVrdMlzM4FgQy80oDBJ64xbNidPoSPzGiXfNSreXi7JjP9lB8Zmt08-B-U68jTDhOxN-uvwZL98rLmWzKoCRW8uqbWY5yI5vpYcPdzdBiGPBO5zns4Q45R5Dayp8uPndsjn4jOqHLXxwPRtMPd9w7y6v10kvCcxEVq_EeChx2WjcO1vr3X3X_cXZwkfwduWuToEReyhyRecheF0U2c7UYbhPfsWJW7FM36YORcXMaSHMYoOxSQiu1ZYhDMuV9Jy13-OjPQGRGYs8X-6taW5vcjxZA9NLHAmaat_v9vT18WAeNpOZ-OxP9o-eqrnkTA");

        myHeaders.append("Cookie", "_abck=FADDBB3BBCB1DDF07F8440604BF91A18~-1~YAAQRmgBFywCI9eMAQAANpEJ+QvcKjOyBwu7h5t+gTFmghf5adR4AqjEvsfuyZlQCtQ1BTG1uUzHs0MIuhElRqBXoej1+KB7AvlXr5QkZ7MTwY9eL4X+LFe2WOPTdMzQqfv/uFUw34CKMrdeZot7lGOnPX98n0YHCq1Jy0mGfXIN25djx71UxXNUS9f57UYGPKFQ1guqiX8B13XrqYnyIAHYvIzDtauaT6StIpGWWg3ru3NsnnguZmPFvwDQg89JLWhKcSqHmfCoVUYNwvEnSaJ9BkOIYfPTBEoAotpR4O2OmdU9d5kaLdClMSBotheJrE8809cQ2oEfLyueu6GIICF+rhnF/giA2PySUOT3UzfVUREM/zjcJwonIP4=~-1~-1~1704752963; ak_bmsc=F1000545CD0BBAC152CE03B1867E0448~000000000000000000000000000000~YAAQRmgBFy0CI9eMAQAANpEJ+RZyAf91XQAnRX63vvCgYGgy4mhvpAu/g9t6gBifmSVhEjx4OxJiz3nuw6erOOxBkpdmqg5Ip6DU11YdCKmhW9fgcLru4SFrhLu+/m/DQ7vKxxU6hLzFoKkMyiOcBkq4pi/HFgERh2drGQP0qYRU43T/O1xg1COEAE0gZJ2LZEoGNSnF8bVnZTkDtEKmY3Z9xAyvBQbnyM24AQr+vwHx2TbOhC5L1TAEGxCi6hyubiiKk1ShzZV+9FHsw2zVio8SomEbtH3MRBJvh+bKphKtW+K0LFNqY9mHVCny3WRnHokg3wyhTHnBfUP/SzShjbfI3Yj96bGlLxWccYGrLxqLWLt++910JE07; bm_sv=0A1FAA20DCC3A3034D4962A75DA8A038~YAAQRmgBF4L3NNeMAQAANJ9P+RYHS1wmPe2khVmgxAI3+H0+lA0C8XUCBdW3jsvWtJMtLc5n0euBtA56mCaF65JAY6z6OGEbtGwGJTd22Bnuqv+hJH8EF6sH2svU0r/d6J+v4GvOmgk6s7KSoIYkxEJPPWVxy6FB1uR885sEYLlQRM+YzBY+OF9Ph5/DtH1RBQtfLEGSp75AQS3VWpNc4orlF6b2mdP4EQG1RCaJhMV3IBAVWy5T6rg8YkFKrzyB~1; bm_sz=798CCAA55A71A844D5BD549F7D22DBA5~YAAQRmgBFy4CI9eMAQAANpEJ+RbpO1g2xDWKMSytRLAwvy5KB2c9cXEZ7btNgUnxBtZpeUJcFAv40YViP97DgtJKGu+mNCW+4ITMDaX4AYBhBL3qVBHPtzWsUxi20wjD6o6VZVADm2u9sRwx5VK2Lwd5f0bABtf8moKDJ8fPf+c53vcdywCyxhot5zUo+s79VttBNX+8PBdcVNmErRLpBXQYNE6VHx+6sg6/4gihrDh3dZIPYKvJh52blOxqknfPrlRQOvcTTQqxassMouelongjl/ZWeqbNfB0C3vO/5XNaYEWnRjLV7/IFXSll7flBjfjzpiKCNjzHKxKwB8ElHKzYuHMLKohayseUmDIQFeFxtKZ4aEHcNFlL8yFzPe+9uEALH6BCMWoguqyn8A==~3486018~4272432");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(`https://api.kroger.com/v1/products?filter.term=${item}&filter.locationId=02400752&filter.start=1&filter.limit=10`, requestOptions)
      .then(response =>  response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
}

module.exports = {
    searchProducts
}