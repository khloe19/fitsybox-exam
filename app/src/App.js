import React from 'react';

var values;

class App extends React.Component {

  constructor(props) {
      super(props)
      this.state = { products: [],
                     id: '',
                     price: 0,
                     totalAmout: 0,
                     quantity: 0,
                     orderAdded: false}  

      this.handleProductChange = this.handleProductChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
    };

    componentDidMount(){
      // Retrieve products
      this.fetchOptions()
    }

    fetchOptions(){
      const apiUrl = 'http://localhost:3001/api/products'
      fetch(apiUrl, {
          method: "GET",
          headers: { 'Content-Type': ' application/json' }
         })
         .then((response) => { return response.json() })
         .then((data) => {values = data;
                         this.setState({ products: values });
         })
    }

    // Product selection
    handleProductChange(event) {
      const selectedProduct = JSON.parse(event.target.value)
      this.setState({          
        id: selectedProduct.id,
        price: selectedProduct.price,
        totalAmout: this.state.quantity * selectedProduct.price 
      })
    }

    // Quantity input
    handleInputChange(event) {
      let quantity = event.target.value 
      this.setState({
        quantity: quantity,
        totalAmout: quantity * this.state.price
      })
    }

    // Create order
    handleSubmit() {
      const data = [{product_id: this.state.id, 
                    quantity: this.state.quantity}];

      fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
      }).then(response => {
        if (response.status === 200) {
            this.setState({ orderAdded: true })
            return response;
        } else {
         console.log('Something went wrong');
        }
      }).catch(err => err);
    }

    render() {
      const { products } = this.state;

      return (
        <div>
          <h1>FitsyBox Store</h1>
          <div className="container">
            <div className="dropdown">
                <span>Choose a product: </span>
                <select
                    onChange={this.handleProductChange}>
                    {products.map(product => <option key={product.id} value={JSON.stringify(product)}>{product.id}-{product.name}</option>)}
                </select>              
            </div>
            <div className="quantity-text">
                <span>Enter quantity: </span>
                <input type="number" style={{paddingLeft: "5px"}} onChange={this.handleInputChange}/>
            </div>
            <div className="amountContainer">
                <span>Total amount: </span>
                <span className="amount">{this.state.totalAmout}</span>
            </div>          
            <button className="createOrder-btn" type="button" disabled={this.state.totalAmout === 0} onClick={this.handleSubmit}>
                Create order
            </button>
            {this.state.orderAdded && <p>Your order make my day! Thank you. :)</p>}
          </div>
        </div>
      )}
};

export default App;