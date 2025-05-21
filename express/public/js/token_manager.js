require("dotenv").config();

const buffer = require("buffer");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUrl = process.env.REDIRECT_URL;
const baseUrl = process.env.OAUTH2_BASE_URL; // usually https://api.kroger.com

async function get(body) {
    const encoded = buffer.Buffer.from(`${clientId}:${clientSecret}`, 'ascii');
    const authorization = "Basic " + encoded.toString("base64");
    const tokenUrl = `${baseUrl}/v1/token`;

    const tokenResponse = await fetch(tokenUrl, {
        method: "POST",
        headers: {
            "Authorization": authorization,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: body
    });

    if (tokenResponse.status >= 400) {
        console.log(`tokenResponse error: ${tokenResponse.status}`);
        throw new Error(`tokenResponse failed with status ${tokenResponse.status}`);
    }

    return await tokenResponse.json();
}

async function getByAuth(code) {
    const body = `grant_type=authorization_code&code=${encodeURIComponent(code)}&redirect_uri=${encodeURIComponent(redirectUrl)}`;
    return await get(body);
}

async function getByRefresh(refreshToken) {
    const body = `grant_type=refresh_token&refresh_token=${encodeURIComponent(refreshToken)}`;
    return await get(body);
}

module.exports = {
    getByAuth,
    getByRefresh,
    get
};
