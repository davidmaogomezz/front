import React from 'react';

import axios from 'axios';

export default class Orders extends React.Component {
  state = {
    orders: []
  }

  async componentDidMount() {
    const response = await axios.get(`http://127.0.0.1:3000/api/v1/orders`)
    const orders = response.data.orders;
    this.setState({ orders });
  }

  render() {
    return (
      <ul>
        { this.state.orders.map(order => <li>{order.id}</li>)}
      </ul>
    )
  }
}
