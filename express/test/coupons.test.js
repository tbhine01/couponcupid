require('dotenv').config();
const { getCoupons } = require('../public/js/queries');

describe('Coupon API Fetching', () => {
  test('should successfully retrieve coupons for a product', async () => {
    const productId = '0004470001990';
    const coupons = await getCoupons(productId);

    expect(coupons).toBeDefined();
    expect(Array.isArray(coupons)).toBe(true);
    expect(coupons.length).toBeGreaterThan(0);

    if (coupons.length > 0) {
      const firstCoupon = coupons[0];
      expect(firstCoupon).toHaveProperty('id');
      expect(firstCoupon).toHaveProperty('productId');
      expect(firstCoupon).toHaveProperty('description');
      expect(firstCoupon).toHaveProperty('discount_value');
      expect(firstCoupon).toHaveProperty('expiration_date');
      expect(firstCoupon).toHaveProperty('store');
    }
  });

  test('should retrieve only coupons for the specified product ID', async () => {
    // This test will fail if the getCoupons function does not correctly filter by productId
    const targetProductId = '0024096150000';
    const coupons = await getCoupons(targetProductId);

    expect(coupons).toBeDefined();
    expect(Array.isArray(coupons)).toBe(true);
    expect(coupons.length).toBeGreaterThan(0);

    // Ensure all returned coupons match the targetProductId
    const allMatch = coupons.every(coupon => coupon.productId === targetProductId);
    expect(allMatch).toBe(true);
  });
});