import React, { Component } from 'react';
import OrderForm from './OrderForm';
import OrderRow from './OrderRow';
import AddBtn from '../btns/AddBtn';

export default class OrderListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      openModal: false,
      modalMode: '',
      modalOrder: {}
    }
  }

  componentDidMount() {
    this.updateOrderList();
  }

  toggleModal = () => {
    this.setState({
      openModal: !this.state.openModal
    });
    this.updateOrderList();
  }

  setModalModeToCreate = () => {
    this.setState({
      openModal: true,
      modalMode: 'create',
      modalOrder: {}
    });
  }

  setModalModeToEdit = (order) => {
    this.setState({
      openModal: true,
      modalMode: 'edit',
      modalOrder: order
    });
  }

  setModalModeToDelete = (order) => {
    this.setState({
      openModal: true,
      modalMode: 'delete',
      modalOrder: order
    });
  }

  updateOrderList = () => {
    fetch("http://localhost:8080/webapp/rest/orders").then(response => response.json()).then(
      data => {
        this.setState({
          orders: data
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
              <th scope="col">#</th>
              <th scope="col">ID do Funcionario</th>
              <th scope="col">ID do Cliente</th>
              <th scope="col">ID do Produto</th>
              <th scope="col">quantidade comprada</th>
              <th scope="col">preço por unidade</th>
              <th scope="col">total a pagar</th>
              <th scope="col" className="acoes">Ações</th>
            </tr>
          </thead>
          <tbody>
            {this.state.orders.map(order => {
              return <OrderRow key={order.id} order={order} actionEdit={this.setModalModeToEdit} actionDelete={this.setModalModeToDelete} />;
            })}
          </tbody>
        </table>
        <AddBtn onClick={this.setModalModeToCreate} />
        <OrderForm mode={this.state.modalMode} show={this.state.openModal} order={this.state.modalOrder} toggleModal={this.toggleModal} />
      </>
    )
  }
}

