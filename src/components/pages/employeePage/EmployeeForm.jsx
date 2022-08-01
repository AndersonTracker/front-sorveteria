import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import CancelBtn from '../btns/CancelBtn';
import SaveBtn from '../btns/SaveBtn';
import DeleteBtn from '../btns/DeleteBtn';
import { IMaskInput } from "react-imask";

export default class EmployeeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            document: "",
            storeId: "",
            kickiback: "",
            showCommission: ""
        };
    }
   
    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.employee.id,
            name: nextProps.employee.name,
            document: nextProps.employee.document,
            storeId: nextProps.employee.storeId,
            kickiback: nextProps.employee.kickiback,
            showCommission: nextProps.employee.showCommission
        });
    }
    onSave = () => {
        document.getElementById("spanIdErrorDocument").textContent="";
        document.getElementById("spanIdErrorName").textContent="";
        document.getElementById("spanIdErrorLoja").textContent="";
        if(this.state.document == null || this.state.document.length !== 14){
            document.getElementById("spanIdErrorDocument").textContent="* Documento invalido";
        }else if(this.state.name == null || this.state.name.length < 3){   
            document.getElementById("spanIdErrorName").textContent="* Nome invalido";
        }else if(this.state.storeId == null || this.state.storeId <= 0){
            document.getElementById("spanIdErrorLoja").textContent="* Id invalido";
        }else{
            if (this.props.mode === 'edit') {
                fetch("http://localhost:8080/webapp/rest/employees/" + this.state.id,
                    {
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(this.state)
                    }).then((response) => {
                        if(response.status == 204){
                            this.clearState();
                            this.props.toggleModal();
                        }else{
                            throw new Error();
                        }
                    }).catch((error) => {
                        document.getElementById("spanIdErrorLoja").textContent="id não existente";
                    });
            } else {
                fetch("http://localhost:8080/webapp/rest/employees",
                    {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(this.state)
                    }).then((response) => {
                        if(response.status == 204){
                            this.clearState();
                            this.props.toggleModal();
                        }else{
                            throw new Error();
                        }
                    }).catch((error) => {
                        document.getElementById("spanIdErrorLoja").textContent="id não existente";
                    });
            }
        }
    }

    onDelete = () => {
        fetch("http://localhost:8080/webapp/rest/employees/" + this.state.id,
            {
                method: "DELETE"
            }).then(() => {
                this.clearState();
                this.props.toggleModal();
            });
    }

    onCancel = () => {
        this.clearState()
        this.props.toggleModal();
    }

    clearState = () => {
        this.setState(this.state = {
            name: "",
            document: "",
            storeId: "",
            kickiback: "",
            showCommission: ""
        });
    }

    handleInputChange = (event) => {
        let target = event.target;
        let value = target.value;
        let name = target.name;
        this.setState({
            [name]: value
        });
    }

    render() {
        if (this.props.mode === 'delete') {
            return (
                <Modal show={this.props.show} onHide={this.onCancel}>
                    <Modal.Header>
                        <Modal.Title>Deletar Funcionario</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form id="employee-form">
                            <label htmlFor="employee-id">ID</label>
                            <input id="employee-id" name="id" type="text" className="form-control" value={this.state.id} placeholder="#" onChange={this.handleInputChange} disabled />

                            <label htmlFor="employee-name">Nome</label>
                            <input id="employee-name" name="name" type="text" className="form-control" value={this.state.name} placeholder="Aderson Tracker" onChange={this.handleInputChange} required disabled />

                            <label htmlFor="employee-document">CPF</label>
                            <input id="employee-document" name="document" type="text" className="form-control" value={this.state.document} placeholder="000.000.000-00" onChange={this.handleInputChange} required disabled />

                            <label htmlFor="employee-storeId">ID da Loja</label>
                            <input id="employee-storeId" name="storeId" type="number" className="form-control" value={this.state.storeId} placeholder="1"  required onChange={this.handleInputChange} disabled />

                            <label htmlFor="employee-kickiback">Comissão</label>
                            <input id="employee-kickiback" name="kickiback" type="number" step="0.01" className="form-control" value={this.state.kickiback} placeholder="20.00" required onChange={this.handleInputChange} disabled />
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <CancelBtn onClick={this.onCancel} />
                        <DeleteBtn onClick={this.onDelete} />
                    </Modal.Footer>
                </Modal>
            );
        } else if (this.props.mode === 'edit') {
            return (
                <Modal show={this.props.show} onHide={this.onCancel}>
                    <Modal.Header>
                        <Modal.Title>Alterar Funcionario</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form id="employee-form">
                            <label htmlFor="employee-id">ID</label>
                            <input id="employee-id" name="id" type="text" className="form-control" value={this.state.id} placeholder="#" onChange={this.handleInputChange} disabled />
                            
                            <label htmlFor="employee-name">Nome <span id="spanIdErrorName"></span></label>
                            <input id="employee-name" name="name" type="text" className="form-control" value={this.state.name} placeholder="Tracker Pereira" onChange={this.handleInputChange} required />

                            <label htmlFor="employee-document">CPF <span id="spanIdErrorDocument"> </span></label>
                            <IMaskInput mask="000.000.000-00" id="employee-document" name="document" type="text" className="form-control" value={this.state.document} placeholder="000.000.000-00" onChange={this.handleInputChange} maxLength="14" required/>

                            <label htmlFor="employee-storeId">ID da Loja <span id="spanIdErrorLoja"></span></label>
                            <input id="employee-storeId" name="storeId" type="number" className="form-control" value={this.state.storeId} placeholder="1" onChange={this.handleInputChange} required />

                            <label htmlFor="employee-kickiback">Comissão</label>
                            <input id="employee-kickiback" name="kickiback" type="number" step="0.01" className="form-control" value={this.state.kickiback} placeholder="20.00" onChange={this.handleInputChange} required />
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <CancelBtn onClick={this.onCancel} />
                        <SaveBtn onClick={this.onSave} />
                    </Modal.Footer>
                </Modal>
            );
        } else {
            return (
                <Modal show={this.props.show} onHide={this.onCancel}>
                    <Modal.Header>
                        <Modal.Title>Novo Funcionario </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form id="employee-form">

                            <label htmlFor="employee-name">Nome <span id="spanIdErrorName"></span></label>
                            <input id="employee-name" name="name" type="text" className="form-control" value={this.state.name} placeholder="Tracker Pereira" onChange={this.handleInputChange} required />

                            <label htmlFor="employee-document">CPF <span id="spanIdErrorDocument"> </span></label>
                            <IMaskInput mask="000.000.000-00" id="employee-document" name="document" type="text" className="form-control" value={this.state.document} placeholder="000.000.000-00" onChange={this.handleInputChange} maxLength="14" required />

                            <label htmlFor="employee-storeId">ID da Loja <span id="spanIdErrorLoja"></span></label>
                            <input id="employee-storeId" name="storeId" type="number" className="form-control" value={this.state.storeId} placeholder="1"
                            onChange={this.handleInputChange}required />

                            <label htmlFor="employee-kickiback">Comissão </label>
                            <input id="employee-kickiback" name="kickiback" type="number" step="0.01" className="form-control" value={this.state.kickiback} placeholder="20.00" onChange={this.handleInputChange} required/>
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <CancelBtn onClick={this.onCancel} />
                        <SaveBtn onClick={this.onSave} />
                    </Modal.Footer>
                </Modal>
            );
        }
    }
}