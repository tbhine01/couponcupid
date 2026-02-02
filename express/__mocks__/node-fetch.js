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

const fetch = jest.fn(() => Promise.resolve(mockProductResponse));

module.exports = fetch;