const path = require('path');

process.env.KROGER_CLIENT_ID = "couponcupid-bbc5xsgl";
process.env.KROGER_CLIENT_SECRET = "AnVszBIJyFVEopMzge3J4s6UUh6fFwM244YmsOaf";
process.env.REFRESH_TOKEN = "";
process.env.ACCESS_TOKEN = "eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLWNlLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoidnl6bG52Y3dSUUZyRzZkWDBzU1pEQT09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJjb3Vwb25jdXBpZC1iYmM1eHNnbCIsImV4cCI6MTc0Nzk2OTk1NCwiaWF0IjoxNzQ3OTY4MTQ5LCJpc3MiOiJhcGktY2Uua3JvZ2VyLmNvbSIsInN1YiI6IjFiYTFiMGUyLTlkODEtNTUwOS04MmY4LTQ1MzA3OWMwMzYwNSIsInNjb3BlIjoiIiwiYXV0aEF0IjoxNzQ3OTY4MTU0NzYyOTY1OTMyLCJhenAiOiJjb3Vwb25jdXBpZC1iYmM1eHNnbCJ9.s3EZEgW0hcMYP5z7AJtYJe7fLpUMrE7ZYEqy8soK5gb0NqzpwWH_YggOqRi40Nq6lk6vQiscjg0b2GH-s_hJh6Ry6w_c5NhfXv1XUch8tk-HJKh2dkWDY6gTdd2semICQ-n88Cr0WYEgx08mQeYqxwNjbqJ41jWeegAPyu0KJE2t7Oe_SfYbJGXI_L8us8bnOjM-nqfBXrzuEyOyFghQq3NFhhN1_aY2f6Vxro5Q1iyNMy5byXolHt8g_9Dj6YmQOh3dsYTjlwOxDP2Y9iKc8n_nRbxvRz6YVN9tx0UzqqmX1dVtHF7Uv9hP-3TBv11siBZYhOmNqjvrnxOtU4I06Q";
process.env.KROGER_OAUTH2_BASE_URL = "https://api-ce.kroger.com/v1/connect/oauth2";
process.env.API_BASE_URL = "https://api-ce.kroger.com";
process.env.REDIRECT_URL = "http://localhost:5173/";

const { getProducts, getAccessToken } = require('../public/js/queries');
const fetch = require('node-fetch'); // Import the mocked fetch
const tokenManager = require('../public/js/token_manager');

jest.mock('../public/js/token_manager', () => ({
  __esModule: true,
  ...jest.requireActual('../public/js/token_manager'),
  getByAuth: jest.fn(),
  fetchToken: jest.fn(), // Also mock fetchToken if it's called directly by `getAccessToken`
}));

describe('Kroger API Product Fetching', () => {
  beforeEach(() => {
    tokenManager.getByAuth.mockResolvedValue({ access_token: 'mock_access_token', expires_in: 3600, token_type: 'Bearer' });
    tokenManager.fetchToken.mockResolvedValue({ access_token: 'mock_access_token', expires_in: 3600, token_type: 'Bearer' });
  });
  afterEach(() => {
    jest.clearAllMocks(); // Clear all mock calls and reset mock implementations
  });

  test('should successfully fetch and format products from Kroger API', async () => {
    const mockProductResponse = {
      json: () => Promise.resolve({
        data: [
          {
            productId: '123',
            description: 'Milk',
            items: [{
              price: {
                "price": 3.00
              }
            }],
            brand: 'DairyCo',
            images: [
              {
                perspective: 'front',
                sizes: [{ size: 'small', url: 'http://example.com/milk.jpg' }]
              }
            ]
          }
        ]
      }),
      status: 200,
    };

    fetch.mockImplementationOnce(() => Promise.resolve(mockProductResponse)); // Only mock product fetch

    // This test assumes a successful call to Kroger API and proper data formatting.
    const items = ['milk', 'bread'];
    const products = await getProducts(items, null, 0, 10);

    expect(products).toBeDefined();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
    
    // Check structure of a single product item
    if (products.length > 0 && products[0].items.length > 0) {
        const firstProduct = products[0].items[0];
        expect(firstProduct).toHaveProperty('productId');
        expect(firstProduct).toHaveProperty('description');
        expect(firstProduct).toHaveProperty('price');
        expect(firstProduct).toHaveProperty('brand');
        expect(firstProduct).toHaveProperty('image');
    }
  });

  test('should handle 401 Unauthorized error by refreshing token and retrying', async () => {
    // For this test, we need to mock fetch for productSearch's 401 and retry
    const mockProduct401 = {
      json: () => Promise.resolve({ error: 'Unauthorized' }),
      status: 401,
    };

    const mockProductSuccess = {
      json: () => Promise.resolve({
        data: [
          {
            productId: '456',
            description: 'Bread',
            items: [{ price: { price: 2.50 } }],
            brand: 'Bakery',
            images: [{ perspective: 'front', sizes: [{ size: 'small', url: 'http://example.com/bread.jpg' }] }]
          }
        ]
      }),
      status: 200,
    };

    fetch
      .mockImplementationOnce(() => Promise.resolve(mockProduct401))    // Call 1: first product fetch (401)
      .mockImplementationOnce(() => Promise.resolve(mockProductSuccess)); // Call 2: retried product fetch (success)

    const items = ['bread'];
    const products = await getProducts(items, null, 0, 10);

    expect(products).toBeDefined();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
    expect(products[0].items[0].description).toBe('Bread');

    // Expect fetch to have been called 2 times for productSearch (excluding tokenManager.getByAuth calls)
    expect(fetch).toHaveBeenCalledTimes(2); 
  });

  test('should fetch products filtered by term', async () => {
    const mockProductSearchTerm = {
      json: () => Promise.resolve({
        data: [
          {
            productId: '123',
            description: 'Organic Milk',
            items: [{ price: { price: 4.00 } }],
            brand: 'Organic Valley',
            images: [{ perspective: 'front', sizes: [{ size: 'small', url: 'http://example.com/milk.jpg' }] }]
          }
        ]
      }),
      status: 200,
    };

    fetch.mockImplementationOnce(() => Promise.resolve(mockProductSearchTerm)); // Only mock product fetch

    const items = ['Organic Milk'];
    const products = await getProducts(items, 'Organic Milk', 0, 10);

    expect(products).toBeDefined();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
    expect(products[0].items[0].description).toContain('Organic Milk');
  });

  test('should fetch products with pagination', async () => {
    const mockProductPagination = {
      json: () => Promise.resolve({
        data: [
          {
            productId: '789',
            description: 'Yogurt',
            items: [{ price: { price: 1.50 } }],
            brand: 'Chobani',
            images: [{ perspective: 'front', sizes: [{ size: 'small', url: 'http://example.com/yogurt.jpg' }] }]
          }
        ]
      }),
      status: 200,
    };

    fetch.mockImplementationOnce(() => Promise.resolve(mockProductPagination)); // Only mock product fetch

    const items = ['yogurt'];
    const products = await getProducts(items, null, 5, 5);

    expect(products).toBeDefined();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
    expect(products[0].items[0].description).toContain('Yogurt');
  });
});