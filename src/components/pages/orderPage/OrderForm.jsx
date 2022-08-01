import React, { Component, useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import CancelBtn from '../btns/CancelBtn';
import SaveBtn from '../btns/SaveBtn';
import DeleteBtn from '../btns/DeleteBtn';

var quantidadePositiva = 0;

export default class OrderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            employeeId: "",
            clientName: "",
            iceCreamId: "",
            itemQuantity: "",
            unityAmount: "",
            totalAmount: ""
        };
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.order.id,
            employeeId: nextProps.order.employeeId,
            clientName: nextProps.order.clientName,
            iceCreamId: nextProps.order.iceCreamId,
            itemQuantity: nextProps.order.itemQuantity,
            unityAmount: nextProps.order.unityAmount,
            totalAmount: nextProps.order.totalAmount
        });
    }
    
    onSave = () => {
        document.getElementById("spanIdErrorQuantity").textContent="";
        document.getElementById("spanIdErrorEmployee").textContent="";
        document.getElementById("spanIdErrorClient").textContent="";
        document.getElementById("spanIdErrorIceCream").textContent="";
        if(this.state.itemQuantity == null || this.state.itemQuantity.length <= 0){
            document.getElementById("spanIdErrorQuantity").textContent="* quantidade invalida";
        }else if(this.state.employeeId == null || this.state.employeeId == ""){
            document.getElementById("spanIdErrorEmployee").textContent="* campo invalido";
        }else if(this.state.clientName == null || this.state.clientName == ""){
            document.getElementById("spanIdErrorClient").textContent="* campo invalido";
        }else if(this.state.iceCreamId == null || this.state.iceCreamId == ""){

            document.getElementById("spanIdErrorIceCream").textContent="* campo invalido";
        }else{
            if(this.state.itemQuantity <= quantidadePositiva){
                if (this.props.mode == 'edit') {
                    fetch("http://localhost:8080/webapp/rest/orders/" + this.state.id,
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
                            document.getElementById("spanIdErrorClient").textContent="cliente não existente";
                        });
                }else{
                    fetch("http://localhost:8080/webapp/rest/orders",
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
                            document.getElementById("spanIdErrorClient").textContent="cliente não existente";
                        });
                }
            }else{
                document.getElementById("spanIdErrorQuantity").textContent="* quantidade excedida !! quantidade em estoque: " + quantidadePositiva;  
            }           
        }
    }
    
    onDelete = () => {
        fetch("http://localhost:8080/webapp/rest/orders/" + this.state.id,
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
            employeeId: "",
            clientName: "",
            iceCreamId: "",
            itemQuantity: "",
            unityAmount: "",
            totalAmount: ""
        });
    }

    handleInputChange = (event) => {
        if(this.state.itemQuantity != null || this.state.itemQuantity == ""){
            fetch("http://localhost:8080/webapp/rest/ice-cream/addEstoque/" + this.state.iceCreamId)
            .then(function(response){
                return response.json();
            }).then(function(data){
                quantidadePositiva = data.quantity;
                alert(quantidadePositiva); 
            });
        }
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
                        <Modal.Title>Deletar pedido</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form id="order-form">
                            <label htmlFor="order-id">ID</label>
                            <input id="order-id" name="id" type="text" className="form-control" value={this.state.id} placeholder="#" onChange={this.handleInputChange} disabled />

                            <label htmlFor="order-employeeId">ID do Funcionario</label>
                            <input id="order-employeeId" name="employeeId" type="text" className="form-control" value={this.state.employeeId} placeholder="001" onChange={this.handleInputChange} required disabled />

                            <label htmlFor="order-clientName">Nome do Cliente</label>
                            <input id="order-clientName" name="clientName" type="text" className="form-control" value={this.state.clientName} placeholder="001" onChange={this.handleInputChange} required disabled />

                            <label htmlFor="order-iceCreamId">ID do Produto</label>
                            <input id="order-iceCreamId" name="iceCreamId" type="text" className="form-control" value={this.state.iceCreamId} placeholder="1" onChange={this.handleInputChange} required disabled />

                            <label htmlFor="order-itemQuantity">Quantidade comprada</label>
                            <input id="order-itemQuantity" name="itemQuantity" type="number" step="1" className="form-control" value={this.state.itemQuantity} placeholder="1" onChange={this.handleInputChange} required disabled />
                            
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
                        <Modal.Title>Alterar Pedido</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form id="order-form">
                            <label htmlFor="order-id">ID</label>
                            <input id="order-id" name="id" type="text" className="form-control" value={this.state.id} placeholder="#" onChange={this.handleInputChange} disabled />

                            <label htmlFor="order-c">ID do Funcionario <span id="spanIdErrorEmployee"></span></label>
                            <input id="order-employeeId" name="employeeId" type="text" className="form-control" value={this.state.employeeId} placeholder="001" onChange={this.handleInputChange} required />

                            <label htmlFor="order-clientName">Nome do Cliente <span id="spanIdErrorClient"></span></label>
                            <input id="order-clientName" name="clientName" type="text" className="form-control" value={this.state.clientName} placeholder="001" onChange={this.handleInputChange} required />
                        
                            <label htmlFor="order-iceCreamId">ID do Produto <span id="spanIdErrorIceCream"></span></label>
                            <input id="order-iceCreamId" name="iceCreamId" type="text" className="form-control" value={this.state.iceCreamId} placeholder="1" onChange={this.handleInputChange} required/>

                            <label htmlFor="order-itemQuantity">Quantidade comprada <span id="spanIdErrorQuantity"> </span></label>
                            <input id="order-itemQuantity" name="itemQuantity" type="number" step="1" className="form-control" value={this.state.itemQuantity} placeholder="1" onChange={this.handleInputChange} required/>

                            <label htmlFor="order-unityAmount">valor por unidade</label>
                            <input id="order-unityAmount" name="unityAmount" type="number" step="0.01" className="form-control" value={this.state.unityAmount} placeholder="1" onChange={this.handleInputChange} disabled/> 
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <CancelBtn onClick={this.onCancel} />
                        <SaveBtn onClick={this.onSave} />
                    </Modal.Footer>
                </Modal>
            );
        }else {
            return (
                <Modal show={this.props.show} onHide={this.onCancel}>
                    <Modal.Header>
                        <Modal.Title>Novo Pedido</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form id="order-form">
                            <label htmlFor="order-employeeId">ID do Funcionario <span id="spanIdErrorEmployee"></span></label>
                            <input id="order-employeeId" name="employeeId" type="text" className="form-control" value={this.state.employeeId} placeholder="001" onChange={this.handleInputChange} required />

                            <label htmlFor="order-clientName">Nome do Cliente <span id="spanIdErrorClient"></span></label>
                            <input id="order-clientName" name="clientName" type="text" className="form-control" value={this.state.clientName} placeholder="jOÃO" onChange={this.handleInputChange} required />
                        
                            <label htmlFor="order-iceCreamId">ID do Produto <span id="spanIdErrorIceCream"></span></label>
                            <input id="order-iceCreamId" name="iceCreamId" type="text" className="form-control" value={this.state.iceCreamId} placeholder="1" onChange={this.handleInputChange} required/>

                            <label htmlFor="order-itemQuantity">Quantidade comprada <span id="spanIdErrorQuantity"> </span></label>
                            <input id="order-itemQuantity" name="itemQuantity" type="number" step="1" className="form-control" value={this.state.itemQuantity} placeholder="1" onChange={this.handleInputChange} required/>

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