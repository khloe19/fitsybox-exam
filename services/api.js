const express = require('express');
const Router = express.Router();
const productModule = require('./src/modules/products/products');
const orderModule = require('./src/modules/orders/orders');

Router.route('/products')
.get((req, res) => {    
    productModule.getProducts(req)
    .then(data => res.json(data));
})
.post((req, res) => {
    productModule.postProduct(req.body)
    .then(data => res.json(data))
})

Router.route('/orders')
.post((req, res) => {
    orderModule.postOrder(req.body)
    .then(data => res.json(data))
})

module.exports = Router;