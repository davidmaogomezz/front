import React from 'react';

import axios from 'axios';

export default class Orders extends React.Component {
  constructor(props) {
    super(props);

    this.renderItems = this.renderItems.bind(this);
    this.renderCustomerName = this.renderCustomerName.bind(this);
    this.renderCustomerAddress = this.renderCustomerAddress.bind(this);
  }

  state = {
    orders: []
  }

  async componentDidMount() {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'access-token': localStorage.getItem('accessToken'),
      'client': localStorage.getItem('client'),
      'uid': localStorage.getItem('uid')
    }
    const response = await axios.get(`http://127.0.0.1:3000/api/v1/orders`,  { headers: headers } ) 
    const orders = response.data;
    this.setState({ orders });
  }

  renderItems(items) {
    const elements = items.map( (item) => 
      <li key={item.id}>{item.name} (Cantidad {item.quantity})</li>
    )
    return (
      elements
    )
  }

  renderCustomerName(customer) {
    let customerName;
    if (customer != null) {
      customerName = <p>{customer.first_name} {customer.last_name}</p>
    } else {
      customerName = <p>N / A</p>
    } 
    return (
      customerName
    )   
  }

  renderCustomerAddress(customer) {
    let address;
    if (customer != null) {
      address = <p> {customer.default_address.city} ({customer.default_address.province}, {customer.default_address.country}) {customer.default_address.address1}, {customer.default_address.address2}</p>
    } else {
      address = <p>N / A</p>
    } 
    return (
      address
    )   
  }

  render() {
    return (
    <table>
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Dirección</th>
          <th>Productos</th>
          <th>Pago estado</th>
        </tr>        
      </thead>
      <tbody>
        {this.state.orders.map(order => 
          <tr key={order.id}>
            <td>
              {this.renderCustomerName(order.data.customer)}              
            </td>
            <td>
              {this.renderCustomerAddress(order.data.customer)}
            </td>            
            <td>
              <ul>
                {this.renderItems(order.data.line_items)}
              </ul>
            </td>
            <td>
              {order.data.financial_status}
            </td>                        
          </tr>
        )}
      </tbody>
    </table>
    )
  }
}
