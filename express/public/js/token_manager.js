require("dotenv").config();
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const buffer = require("buffer");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const oauth2BaseUrl = process.env.OAUTH2_BASE_URL;

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

// async function get(body) {
//     const encoded = buffer.Buffer.from(`${clientId}:${clientSecret}`, 'ascii');
//     const authorization = "Basic " + encoded.toString("base64");
//     const tokenUrl = `${baseUrl}/v1/connect/oauth2/token`;

//     console.log("clientId:", clientId);
//     console.log("clientSecret:", clientSecret ? "set" : "not set");

//     const tokenResponse = await fetch(tokenUrl, {
//         method: "POST",
//         headers: {
//             "Authorization": authorization,
//             "Content-Type": "application/x-www-form-urlencoded"
//         },
//         body: body
//     });

//     if (tokenResponse.status >= 400) {
//         console.log(`tokenResponse error: ${tokenResponse.status}`);
//         throw new Error(`tokenResponse failed with status ${tokenResponse.status}`);
//     }

//     return await tokenResponse.json();
// }

// async function getByAuth(code) {
//     const body = `grant_type=authorization_code&code=${encodeURIComponent(code)}`;
//     return await get(body);
// }

// async function getByRefresh(refreshToken) {
//     const body = `grant_type=refresh_token&refresh_token=${encodeURIComponent(refreshToken)}`;
//     return await get(body);
// }

module.exports = {
    getByAuth,
    fetchToken
};
