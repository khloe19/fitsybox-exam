var assert = require('assert');
var sinon = require('sinon');
const orderModule = require('../src/modules/orders/orders');

describe('postOrder', () => {
  it('If post order - should return total order amount', async () => {
    sinon.stub(orderModule, 'postOrder').returns(orderPostedMockData);

    const result = await orderModule.postOrder(orderMockData);
    assert.deepEqual(result.totalAmountOrder, 2);
  });

  it('If post order with product id does not exists - should return zero to total product amount', async () => {
    sinon.stub(orderModule, 'postOrder').returns(orderWithNoProductPostedMockData);

    const result = await orderModule.postOrder(orderNoProductMockData);
    assert.deepEqual(result.request_order[0].totalAmountProduct, 0);
  })
});

const orderMockData = [{"product_id":"id-01",
                        "quantity": 2
                        }];

const orderNoProductMockData = [{"product_id":"id-99",
                        "quantity": 2
                        }];


const orderWithNoProductPostedMockData = {
    "request_order": [{
            "product_id": "id-99",
            "quantity": 2,
            "totalAmountProduct": 0
        }],
        "totalAmountOrder": 0
}

const orderPostedMockData = {
    "request_order": [{
            "product_id": "id-01",
            "quantity": 2,
            "totalAmountProduct": 2
        }],
        "totalAmountOrder": 2
}

beforeEach(function () {
    sinon.restore();
})

