import React from 'react';

var values;

class App extends React.Component {

  constructor(props) {
      super(props)
      this.state = { products: [],
                     id: '',
                     quantity: 0}  
      this.handleProductChange = this.handleProductChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
    };

    componentDidMount(){
      this.fetchOptions()
    }

    fetchOptions(){
      const apiUrl = 'http://localhost:3001/api/products'
      fetch(apiUrl, {
          method: "GET",
          headers: { 'Content-Type': ' application/json' }
         }).then((response) => { return response.json() })
           .then((data) => {values = data;
                         this.setState({ products: values });
                      })
    }

    handleProductChange(event) {
      this.setState({
        id: event.target.value
      })
    }

    handleInputChange(event) {
      this.setState({
        quantity: event.target.value
      })
    }

    handleSubmit() {
      const data = [{id:this.state.id, quantity:this.state.quantity}];

      fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
      }).then(response => {
        if (response.status === 200) {
          console.log(response);
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
          <h1>Mels Store</h1>
          <div className="dropdown">
              <span>Choose a Product</span>
              <select
                onChange={this.handleProductChange}>
                {products.map(product => <option key={product.id}>{product.name}</option>)}
              </select>              
          </div>
          <div className="dropdown">
              <span>Enter quantity</span>
              <input type="number" onChange={this.handleInputChange}/>
          </div>
          <button type="button" onClick={this.handleSubmit}>
            Create Order
          </button>
        </div>
      )}
};

export default App;