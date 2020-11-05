var assert = require('assert');
var sinon = require('sinon');
const productModule = require('../src/modules/products/products');


describe('getProducts', () => {
  it('If get products - should return products', async () => {
    sinon.stub(productModule, 'getProducts').returns(productMockData);

    const result = await productModule.getProducts();
    assert.deepEqual(result[0].id, 'id-01');
  })
});

describe('postProduct', () => {
  it('If post product - should add product to first products and return all products', async () => {
    sinon.stub(productModule, 'postProduct').returns(productWithPostedMockData);

    const result = await productModule.postProduct(postProductMockData);
    assert.deepEqual(result[1].id, 'id-02');
  })
});

beforeEach(function () {
  sinon.restore();
});

const productMockData = [{"id": 'id-01', 
                          "name": 'product_name', 
                          "price": 1}];

const postProductMockData = {"id": 'id-02', 
                             "name": 'product_name_two', 
                             "price": 2};

const productWithPostedMockData = [{"id": 'id-01', 
                                    "name": 'product_name', 
                                    "price": 1},
                                   {"id": 'id-02', 
                                    "name": 'product_name_two', 
                                    "price": 2}];
                              