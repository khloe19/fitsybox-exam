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
          totalAmountOrder:0
       }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInputQty = this.handleInputQty.bind(this);
      this.handleAddToOrder = this.handleAddToOrder.bind(this);
    }

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

    handleInputQty(value) {
       this.setState({quantity: value})
    }

    handleAddToOrder(value) {
       this.setState({orders: value})
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
      }).then((data) => {console.log(data);
         this.setState({totalAmountOrder: data.totalAmountOrder})
      })
   }

    render() {
       return (
          <div>
             <Header/>
             <table>
                <tbody>
                   {this.state.products.map((product, i) => <TableRow key = {i} 
                      data = {product} onInputQuantity={this.handleInputQty} onHandleToOrder={this.handleAddToOrder}/>)}
                </tbody>
             </table>
             <button onClick={this.handleSubmit}>Create Order</button>
             {this.state.orderAdded && <p>Your order make my day! Your total amount order is {this.state.totalAmountOrder}. Thank you. :)</p>} 
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
       this.handleAddToOrder = this.handleAddToOrder.bind(this);       
    }

    handleInputChange(event){
        this.setState({quantity: event.target.value})        
        this.props.onInputQuantity(event.target.value)
        this.setState({ amount: event.target.value * this.props.data.price })        
    }

    handleAddToOrder(){
      orders.push({
         product_id:this.props.data.id,
         quantity:this.state.quantity
      });     
      this.props.onHandleToOrder({orders})
    }

    render() {
       return (
          <tr>
             <td>{this.props.data.id}</td>
             <td>{this.props.data.name}</td>
             <td>{this.props.data.price}</td>
             <td><input type="number" onChange={this.handleInputChange}></input></td>
             <td>{this.state.amount}</td>
             <td><button onClick={this.handleAddToOrder}>Add to Order</button></td>
          </tr>
       );
    }
 }
 
export default App;