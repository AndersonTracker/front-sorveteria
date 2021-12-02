import React, { Component } from 'react';
import ClientForm from './ClientForm';
import ClientRow from './ClientRow';
import AddBtn from '../btns/AddBtn';

export default class ClientListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      openModal: false,
      modalMode: '',
      modalClient: {}
    }
  }

  componentDidMount() {
    this.updateClientList();
  }

  toggleModal = () => {
    this.setState({
      openModal: !this.state.openModal
    });
    this.updateClientList();
  }

  setModalModeToCreate = () => {
    this.setState({
      openModal: true,
      modalMode: 'create',
      modalClient: {}
    });
  }

  setModalModeToEdit = (client) => {
    this.setState({
      openModal: true,
      modalMode: 'edit',
      modalClient: client
    });
  }

  setModalModeToDelete = (client) => {
    this.setState({
      openModal: true,
      modalMode: 'delete',
      modalClient: client
    });
  }

  updateClientList = () => {
    fetch("http://localhost:8080/webapp/rest/clients").then(response => response.json()).then(
      data => {
        this.setState({
          clients: data
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
              <th scope="col">CPF</th>
              <th scope="col">Telefone</th>
              <th scope="col">data de nascimento</th>
              <th scope="col">idade</th>
              <th scope="col" className="acoes">Ações</th>
            </tr>
          </thead>
          <tbody>
            {this.state.clients.map(client => {
              return <ClientRow key={client.id} client={client} actionEdit={this.setModalModeToEdit} actionDelete={this.setModalModeToDelete}/>;
            })}
          </tbody>
        </table>
        <AddBtn onClick={this.setModalModeToCreate} />
        <ClientForm mode={this.state.modalMode} show={this.state.openModal} client={this.state.modalClient} toggleModal={this.toggleModal} />
      </>
    )
  }
}

