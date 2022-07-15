import React, { Component } from 'react';
import OrderDetailRow from './OrderDetailRow';

export default class OrderDetailListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ordersDetails: []
    }
  }

  componentDidMount() {
    this.updateOrdersDetailsList();
  }

  updateOrdersDetailsList = () => {
    fetch("http://localhost:8080/webapp/rest/ordersDetails").then(response => response.json()).then(
      data => {
        this.setState({
          ordersDetails: data
        });
      }
    )
  }

  render() {
    return ( 
      <>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">id pedido</th>
              <th scope="col">Funcionario</th>
              <th scope="col">Cliente</th>
              <th scope="col">Produto</th>
              <th scope="col">quantidade comprada</th>
              <th scope="col">preço unitario</th>
              <th scope="col">total</th>
            </tr>
          </thead>
          <tbody>
            {this.state.ordersDetails.map(orderDetail => {
              return <OrderDetailRow key={orderDetail.order_item_id} orderDetail={orderDetail} actionEdit={this.setModalModeToEdit} actionDelete={this.setModalModeToDelete}/>;
            })}
          </tbody>
        </table>
    </>
    )
  }
}