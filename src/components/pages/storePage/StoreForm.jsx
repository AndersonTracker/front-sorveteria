import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import CancelBtn from '../btns/CancelBtn';
import SaveBtn from '../btns/SaveBtn';
import DeleteBtn from '../btns/DeleteBtn';

export default class StoreForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            address: "",
            phone: ""
        };
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.store.id,
            name: nextProps.store.name,
            address: nextProps.store.address,
            phone: nextProps.store.phone
        });
    }
    onSave = () => {
        if(this.state.phone.length == 15){
            if (this.props.mode == 'edit') {
                fetch("http://localhost:8080/webapp/rest/stores/" + this.state.id,
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
                console.log(JSON.stringify(this.state));
                fetch("http://localhost:8080/webapp/rest/stores",
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
        }else{
            document.getElementById("spanIdError").textContent="* valor invalido";
        }
    }

    onDelete = () => {
        fetch("http://localhost:8080/webapp/rest/stores/" + this.state.id,
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
            address: "",
            phone: ""
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
                        <Modal.Title>Deletar Loja</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form id="store-form">
                            <label htmlFor="store-id">ID</label>
                            <input id="store-id" name="id" type="text" className="form-control" value={this.state.id} placeholder="#" onChange={this.handleInputChange} disabled />

                            <label htmlFor="store-name">Nome</label>
                            <input id="store-name" name="name" type="text" className="form-control" value={this.state.name} placeholder="Anderson Silva" onChange={this.handleInputChange} required disabled />

                            <label htmlFor="store-address">Endereço</label>
                            <input id="store-address" name="address" type="text" className="form-control" value={this.state.address} placeholder="Rua das Palmeiras, 123, Bairro X" onChange={this.handleInputChange} required disabled />

                            <label htmlFor="store-phone">Telefone </label>
                            <input id="store-phone" name="phone" type="text" className="form-control" value={this.state.phone} placeholder="54123456789" maxLength="15" required onChange={this.handleInputChange} disabled />
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
                        <Modal.Title>Alterar Loja</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form id="store-form">
                            <label htmlFor="store-id">ID</label>
                            <input id="store-id" name="id" type="text" className="form-control" value={this.state.id} placeholder="#" onChange={this.handleInputChange} disabled />

                            <label htmlFor="store-name">Nome</label>
                            <input id="store-name" name="name" type="text" className="form-control" value={this.state.name} placeholder="Anderson Silva" onChange={this.handleInputChange} required />

                            <label htmlFor="store-address">Endereço</label>
                            <input id="store-address" name="address" type="text" className="form-control" value={this.state.address} placeholder="Rua das Palmeiras, 123, Bairro X" onChange={this.handleInputChange} required />

                            <label htmlFor="store-phone">Telefone <span id="spanIdError"> </span></label>
                            <input id="store-phone" name="phone" type="text" className="form-control" value={this.state.phone} placeholder="54 99152-5151" maxLength="15" required onChange={this.handleInputChange} />
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
                        <Modal.Title>Nova Loja</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form id="store-form">
                            <label htmlFor="store-name">Nome</label>
                            <input id="store-name" name="name" type="text" className="form-control" value={this.state.name} placeholder="Anderson Silva" onChange={this.handleInputChange} required />

                            <label htmlFor="store-address">Endereço</label>
                            <input id="store-address" name="address" type="text" className="form-control" value={this.state.address} placeholder="Rua das Palmeiras, 123, Bairro X" onChange={this.handleInputChange} required />

                            <label htmlFor="store-phone">Telefone <span id="spanIdError"> </span></label>
                            <input id="store-phone" name="phone" type="text" className="form-control" value={this.state.phone} placeholder="(54) 9142-4343" maxLength="15" required onChange={this.handleInputChange} />
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