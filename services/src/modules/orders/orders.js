const productsModule = require('../products/products');

exports.postOrder = async function(orders) {    
    const request_order = [];
    let totalAmountOrder = 0;
    try {
        const products = await productsModule.getProducts();
        orders.forEach(order => {
            const totalAmtProduct = calculateTotal(products, order);
            request_order.push({
                product_id: order.product_id,
                quantity: order.quantity,
                totalAmountProduct: totalAmtProduct
            })
            totalAmountOrder = totalAmountOrder + totalAmtProduct;
        });

        return {
            request_order,
            totalAmountOrder
        };
    }    
    catch(error) {
        console.log(error);
    }
}

function calculateTotal(products, order) {
    const selectedProduct = products.find(product => product.id === order.product_id);
    const price = selectedProduct ? selectedProduct.price : 0;
    return price * order.quantity;
}

