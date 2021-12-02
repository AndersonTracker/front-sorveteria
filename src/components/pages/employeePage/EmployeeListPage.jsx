import React, { Component } from 'react';
import EmployeeForm from './EmployeeForm';
import EmployeeRow from './EmployeeRow';
import AddBtn from '../btns/AddBtn';

export default class EmployeeListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      openModal: false,
      modalMode: '',
      modalEmployee: {}
    }
  }

  componentDidMount() {
    this.updateEmployeeList();
  }

  toggleModal = () => {
    this.setState({
      openModal: !this.state.openModal
    });
    this.updateEmployeeList();
  }

  setModalModeToCreate = () => {
    this.setState({
      openModal: true,
      modalMode: 'create',
      modalEmployee: {}
    });
  }

  setModalModeToEdit = (employee) => {
    this.setState({
      openModal: true,
      modalMode: 'edit',
      modalEmployee: employee
    });
  }

  setModalModeToDelete = (employee) => {
    this.setState({
      openModal: true,
      modalMode: 'delete',
      modalEmployee: employee
    });
  }

  updateEmployeeList = () => {
    fetch("http://localhost:8080/webapp/rest/employees").then(response => response.json()).then(
      data => {
        this.setState({
          employees: data
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
              <th scope="col">Name</th>
              <th scope="col">CPF</th>
              <th scope="col">ID da Loja</th>
              <th scope="col">Comissão</th>
              <th scope="col">Ganhos de Comissão</th>
              <th scope="col" className="acoes">Ações</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employees.map(employee => {
              return <EmployeeRow key={employee.id} employee={employee} actionEdit={this.setModalModeToEdit} actionDelete={this.setModalModeToDelete}/>;
            })}
          </tbody>
        </table>
        <AddBtn onClick={this.setModalModeToCreate} />
        <EmployeeForm mode={this.state.modalMode} show={this.state.openModal} employee={this.state.modalEmployee} toggleModal={this.toggleModal} />
      </>
    )
  }
}

