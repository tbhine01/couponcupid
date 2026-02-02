require('dotenv').config();
const { getProducts } = require('../public/js/queries');

describe('Kroger API Product Fetching', () => {
  test('should successfully fetch and format products from Kroger API', async () => {
    // This test assumes a successful call to Kroger API and proper data formatting.
    // It will likely fail in the Red phase as the implementation is not yet complete.
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
});