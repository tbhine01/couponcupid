const buffer = require("buffer");





const clientId = process.env.KROGER_CLIENT_ID;
const clientSecret = process.env.KROGER_CLIENT_SECRET;
const oauth2BaseUrl = process.env.KROGER_OAUTH2_BASE_URL || 'https://api.kroger.com/v1/connect/oauth2';


async function fetchToken(formBody) {
    const encoded = buffer.Buffer.from(`${clientId}:${clientSecret}`, 'ascii');
    const authorization = "Basic " + encoded.toString("base64");
    const tokenUrl = `${oauth2BaseUrl}/token`;
    
    console.log("authorization:", authorization);
    console.log("clientId:", clientId);
    console.log("clientSecret:", clientSecret ? "set" : "not set");
    console.log("tokenUrl:", tokenUrl);

    const tokenResponse = await fetch(tokenUrl, {
        method: "POST",
        headers: {
            "Authorization": authorization,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formBody
    });

    if (tokenResponse.status >= 400) {
        console.log(`tokenResponse error: ${tokenResponse.status}`);
        throw new Error(`tokenResponse failed with status ${tokenResponse.status}`);
    }

    return await tokenResponse.json();
}

async function getByAuth() {
    const formBody = new URLSearchParams({
        grant_type: "client_credentials",
        scope: "product.compact"
    });

    return await fetchToken(formBody);
}

module.exports = {
    getByAuth,
    fetchToken
};
