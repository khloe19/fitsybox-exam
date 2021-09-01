import React from 'react';

var values;
var orders=[];

class App extends React.Component {
    constructor() {
       super();
       this.state = {
          products: [],
          amount:0,
          quantity: 0,
          id:'',
          orders: [],
          orderTotalAmount:0
       }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.updateQuantity = this.updateQuantity.bind(this);
      this.addToOrder = this.addToOrder.bind(this);
    }

    componentDidMount(){
      this.retrieveProducts()
    }

    retrieveProducts(){
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

    updateQuantity(value) {
       this.setState({quantity: value})
    }

    addToOrder(value) {
       this.setState({orders: value})
       let calculatedAmount = 0;
       value.orders.forEach(order => {
          calculatedAmount += order.itemTotalAmount
       });
       this.setState({orderTotalAmount: calculatedAmount})
    }
    
    // Create order
    handleSubmit() {
      const data = this.state.orders.orders
      fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
      }).then(response => {    
        if (response.status === 200) {
            this.setState({ orderAdded: true })
            return response.json();
        } else {
         console.log('Something went wrong');
        }
      })
   }

    render() {
       return (
          <div>
             <Header/>
             <table id='orders'>
                <tbody>
                   <tr>
                      <th>Id</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                  </tr>
                   {this.state.products.map((product, i) => <TableRow key = {i} 
                      data = {product} 
                      onInputQuantity={this.updateQuantity} 
                      onHandleToOrder={this.addToOrder}/>)}
                </tbody>
             </table>
             <div id='container'>
                <p>Total amount: ${this.state.orderTotalAmount}</p>
            </div>
             <div id='container'>
               <button onClick={this.handleSubmit}>Create Order</button>
               <button onClick={() => window.location.reload(false)}>Reset Order</button>
             </div>
             {this.state.orderAdded && <p>Awesome, order placed. Thank you!</p>} 
          </div>
       );
    }
 }
 class Header extends React.Component {
    render() {
       return (
          <div>
             <h1>Fitsy Box</h1>
          </div>
       );
    }
 }
 class TableRow extends React.Component {

    constructor(props) {
       super(props);
       this.state = { amount: 0, quantity: 0, orders: []}       
       this.handleInputChange = this.handleInputChange.bind(this);       
       this.addToOrder = this.addToOrder.bind(this);       
    }

    handleInputChange(event){
        this.setState({quantity: event.target.value})        
        this.props.onInputQuantity(event.target.value)
        this.setState({ amount: event.target.value * this.props.data.price })     
    }

    addToOrder(){
      const productOrder = orders.find(order => order.product_id === this.props.data.id)
      if (productOrder) {
         productOrder.quantity = this.state.quantity;
         productOrder.itemTotalAmount = this.state.amount;    
      } else { 
         orders.push({
            product_id: this.props.data.id,
            quantity: this.state.quantity,
            itemTotalAmount: this.state.amount
         })
      };   
      this.props.onHandleToOrder({orders})
    }

    render() {
       return (
          <tr>
             <td>{this.props.data.id}</td>
             <td>{this.props.data.name}</td>
             <td>${this.props.data.price}</td>
             <td><input type="number" 
               onChange={this.handleInputChange} 
               onBlur={this.addToOrder}>
            </input></td>
             <td>${this.state.amount}</td>
          </tr>
       );
    }
 }
 
export default App;
