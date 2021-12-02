import React, { Component } from 'react';
import StoreForm from './StoreForm';
import StoreRow from './StoreRow';
import AddBtn from '../btns/AddBtn';

export default class StoreListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      openModal: false,
      modalMode: '',
      modalStore: {}
    }
  }

  componentDidMount() {
    this.updateStoreList();
  }

  toggleModal = () => {
    this.setState({
      openModal: !this.state.openModal
    });
    this.updateStoreList();
  }

  setModalModeToCreate = () => {
    this.setState({
      openModal: true,
      modalMode: 'create',
      modalStore: {}
    });
  }

  setModalModeToEdit = (store) => {
    this.setState({
      openModal: true,
      modalMode: 'edit',
      modalStore: store
    });
  }

  setModalModeToDelete = (store) => {
    this.setState({
      openModal: true,
      modalMode: 'delete',
      modalStore: store
    });
  }

  updateStoreList = () => {
    fetch("http://localhost:8080/webapp/rest/stores").then(response => response.json()).then(
      data => {
        this.setState({
          stores: data
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
              <th scope="col">Nome</th>
              <th scope="col">Endereço</th>
              <th scope="col">Telefone</th>
              <th scope="col" className="acoes">Ações</th>
            </tr>
          </thead>
          <tbody>
            {this.state.stores.map(store => {
              return <StoreRow key={store.id} store={store} actionEdit={this.setModalModeToEdit} actionDelete={this.setModalModeToDelete}/>;
            })}
          </tbody>
        </table>
        <AddBtn onClick={this.setModalModeToCreate} />
        <StoreForm mode={this.state.modalMode} show={this.state.openModal} store={this.state.modalStore} toggleModal={this.toggleModal} />
      </>
    )
  }
}

