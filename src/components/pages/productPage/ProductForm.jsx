import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import CancelBtn from '../btns/CancelBtn';
import SaveBtn from '../btns/SaveBtn';
import DeleteBtn from '../btns/DeleteBtn';

export default class ProductForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            desc: "",
            price: "",
            quantity: "",
            quantityComprada: ""
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.product.id,
            name: nextProps.product.name,
            desc: nextProps.product.desc,
            price: nextProps.product.price,
            quantity: nextProps.product.quantity,
            quantityComprada: nextProps.product.quantityComprada,
        });
    }
    onSave = () => {
        if (this.props.mode == 'edit') {
            fetch("http://localhost:8080/webapp/rest/ice-cream/" + this.state.id,
                {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.state)
                }).then(() => {
                    this.clearState();
                    this.props.toggleModal();
                });
            }else if (this.props.mode == 'AddEstoque') {
                    fetch("http://localhost:8080/webapp/rest/ice-cream/addEstoque/" + this.state.id,
                        {
                            method: "PUT",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(this.state)
                        }).then(() => {
                            this.clearState();
                            this.props.toggleModal();
                        });
            } else {
            fetch("http://localhost:8080/webapp/rest/ice-cream",
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.state)
                }).then(() => {
                    this.clearState();
                    this.props.toggleModal();
                });
        }
    }

    onDelete = () => {
        fetch("http://localhost:8080/webapp/rest/ice-cream/" + this.state.id,
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
            id: "",
            name: "",
            desc: "",
            price: "",
            quantity: "",
            quantityComprada: ""
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
                        <Modal.Title>Deletar Produto</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form id="product-form">
                            <label htmlFor="product-id">ID</label>
                            <input id="product-id" name="id" type="text" className="form-control" value={this.state.id} placeholder="#" onChange={this.handleInputChange} disabled />

                            <label htmlFor="product-name">name</label>
                            <input id="product-name" name="name" type="text" className="form-control" value={this.state.name} placeholder="name" onChange={this.handleInputChange} disabled />

                            <label htmlFor="product-desc">Descrição</label>
                            <input id="product-desc" name="desc" type="text" className="form-control" value={this.state.desc} placeholder="Sorvete de limão" onChange={this.handleInputChange} required disabled />

                            <label htmlFor="product-price">preço</label>
                            <input id="product-price" name="price" type="number" step="0.01" className="form-control" value={this.state.price} placeholder="19.99" onChange={this.handleInputChange} required disabled />

                            <label htmlFor="product-quantity">quantidade</label>
                            <input id="product-quantity" name="quantity" type="number" className="form-control" value={this.state.quantity} placeholder="1" onChange={this.handleInputChange} required disabled />

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
                        <Modal.Title>Alterar Produto</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form id="product-form">
                            <label htmlFor="product-id">ID</label>
                            <input id="product-id" name="id" type="text" className="form-control" value={this.state.id} placeholder="#" onChange={this.handleInputChange} disabled />

                            <label htmlFor="product-name">name</label>
                            <input id="product-name" name="name" type="text" className="form-control" value={this.state.name} placeholder="name" onChange={this.handleInputChange} required />

                            <label htmlFor="product-desc">Descrição</label>
                            <input id="product-desc" name="desc" type="text" className="form-control" value={this.state.desc} placeholder="Sorvete de Limão" onChange={this.handleInputChange} required />

                            <label htmlFor="product-price">preço</label>
                            <input id="product-price" name="price" type="number" step="0.01" className="form-control" value={this.state.price} placeholder="19.99" onChange={this.handleInputChange} required />

                            <label htmlFor="product-quantity">quantidade</label>
                            <input id="product-quantity" name="quantity" type="number" className="form-control" value={this.state.quantity} placeholder="1" onChange={this.handleInputChange} required />
        
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <CancelBtn onClick={this.onCancel} />
                        <SaveBtn onClick={this.onSave} />
                    </Modal.Footer>
                </Modal>
            );
        }else if(this.props.mode === 'AddEstoque') {
            return (
                <Modal show={this.props.show} onHide={this.onCancel}>
                    <Modal.Header>
                        <Modal.Title>Adicionando Estoque</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form id="product-form">

                        <label htmlFor="product-name">name</label>
                            <input id="product-name" name="name" type="text" className="form-control" value={this.state.name} placeholder="Sorvete" onChange={this.handleInputChange} required disabled/>

                            <label htmlFor="product-desc">Descrição</label>
                            <input id="product-desc" name="desc" type="text" className="form-control" value={this.state.desc} placeholder="Sorvete de Limão" onChange={this.handleInputChange} required disabled/>

                            <label htmlFor="product-price">preço</label>
                            <input id="product-price" name="price" type="number" step="0.01" className="form-control" value={this.state.price} placeholder="19.99" onChange={this.handleInputChange} required disabled/>

                            <label htmlFor="product-quantity">quantidade</label>
                            <input id="product-quantity" name="quantity" type="number" className="form-control" value={this.state.quantity} placeholder="1" onChange={this.handleInputChange} required disabled/>

                            <label htmlFor="product-quantityComprada">quantidade comprada</label>
                            <input id="product-quantityComprada" name="quantityComprada" type="number" className="form-control" value={this.state.quantityComprada} placeholder="1" onChange={this.handleInputChange} required />

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
                        <Modal.Title>Novo Produto</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form id="product-form">

                        <label htmlFor="product-name">name</label>
                            <input id="product-name" name="name" type="text" className="form-control" value={this.state.name} placeholder="Sorvete" onChange={this.handleInputChange} required />

                            <label htmlFor="product-desc">Descrição</label>
                            <input id="product-desc" name="desc" type="text" className="form-control" value={this.state.desc} placeholder="Sorvete de Limão" onChange={this.handleInputChange} required />

                            <label htmlFor="product-price">preço</label>
                            <input id="product-price" name="price" type="number" step="0.01" className="form-control" value={this.state.price} placeholder="19.99" onChange={this.handleInputChange} required />

                            <label htmlFor="product-quantity">quantidade</label>
                            <input id="product-quantity" name="quantity" type="number" className="form-control" value={this.state.quantity} placeholder="1" onChange={this.handleInputChange} required />

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