const products = [
    {"id": '1', "name": 'Cookies', "price": 2.99},
    {"id": '2', "name": 'Bread', "price": 2.00},
    {"id": '3', "name": 'Orange Juice', "price": 5.00},
]

exports.getProducts = async function() {
    const data = products;
    return data;
}

exports.postProduct = async function(product) {
    const data = products;
    try {
        data.push({
            id: product.id,
            name: product.name,
            price: product.price
        })

        return data;
    }
    catch (error) {
        console.log(error);
    }
}