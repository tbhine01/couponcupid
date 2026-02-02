require('dotenv').config();
const { getProducts, getAccessToken } = require('../public/js/queries');
const fetch = require('node-fetch'); // Import the mocked fetch
const tokenManager = require('../public/js/token_manager');

describe('Kroger API Product Fetching', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear all mock calls and reset mock implementations
  });

  test('should successfully fetch and format products from Kroger API', async () => {
    // This test assumes a successful call to Kroger API and proper data formatting.
    const items = ['milk', 'bread'];
    const products = await getProducts(items);

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
    // Mock the fetch calls for the entire sequence:
    // 1. Initial getAccessToken call (to /token) -> success
    // 2. productSearch call (to /products) -> 401 unauthorized
    // 3. getAccessToken call (to /token) -> success (new token)
    // 4. productSearch retry call (to /products) -> success
    
    const mockTokenSuccess = {
      json: () => Promise.resolve({ access_token: 'new_access_token', expires_in: 3600, token_type: 'Bearer' }),
      status: 200,
    };

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

    // Jest's `mockImplementationOnce` applies in sequence to *all* calls to `fetch`
    fetch
      .mockImplementationOnce(() => Promise.resolve(mockTokenSuccess))   // Call 1: initial token fetch
      .mockImplementationOnce(() => Promise.resolve(mockProduct401))    // Call 2: first product fetch (401)
      .mockImplementationOnce(() => Promise.resolve(mockTokenSuccess))   // Call 3: token refresh fetch
      .mockImplementationOnce(() => Promise.resolve(mockProductSuccess)); // Call 4: retried product fetch (success)

    const items = ['bread'];
    const products = await getProducts(items);

    expect(products).toBeDefined();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
    expect(products[0].items[0].description).toBe('Bread');

    // Expect fetch to have been called 4 times for this scenario
    expect(fetch).toHaveBeenCalledTimes(4); 
  });
});