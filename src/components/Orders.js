import React from 'react';

import axios from 'axios';

export default class Orders extends React.Component {
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
    const orders = response.data.orders;
    this.setState({ orders });
  }

  render() {
    return (
      <ul>
        { this.state.orders.map(order => <li key={order.id}>{order.id}</li>)}
      </ul>
    )
  }
}
