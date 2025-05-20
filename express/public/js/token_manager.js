require("dotenv").config();

// Parameters imported from .env environment variables
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

// Get token by authorization code (getByAuth)
async function getByAuth(code) {
  const body = `grant_type=authorization_code&code=${encodeURIComponent(
    code
  )}
  redirect_uri=${encodeURIComponent(redirectUrl)}`;
  return await get(body);
}

// Get access token using refresh token
async function getByRefresh(refreshToken) {
  const body =
    `grant_type=refresh_token&` +
    `refresh_token=${encodeURIComponent(refreshToken)}`;
  return await get(body);
}

async function get(body) {;


  // ClientId and ClientSecret (stored in .env file)
  const encoded = Buffer.from(`${clientId}:${clientSecret}`, `ascii`);
  // ClientId and clientSecret must be encoded
  const authorization = "Basic " + encoded.toString("base64");

  // Build token URL
  // Base URL (https://api.kroger.com)
  // Version/Endpoint (/v1/token)
  const tokenUrl = "https://api-ce.kroger.com/v1/connect/oauth2/token";

  // Token request
  let tokenResponse = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "User-Agent": "",
      Authorization: authorization,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: body
  });
  // Handle response
  if (tokenResponse.status === 401) {
    console.error(`tokenResponse error: ${tokenResponse.status}`);
    throw new Error(`tokenResponse failed with status ${tokenResponse.status}`);
  }

  console.log("response", tokenResponse)

  // Return json object
  return await tokenResponse.json();
}

module.exports = { getByRefresh, get }