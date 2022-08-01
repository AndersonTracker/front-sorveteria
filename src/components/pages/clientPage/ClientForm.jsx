import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import CancelBtn from '../btns/CancelBtn';
import SaveBtn from '../btns/SaveBtn';
import DeleteBtn from '../btns/DeleteBtn';
import { IMaskInput } from "react-imask";

export default class ClientForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            document: "",
            phone: "",
            birth_date: "",
            age: ""
        };
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.client.id,
            name: nextProps.client.name,
            document: nextProps.client.document,
            phone: nextProps.client.phone,
            birth_date: nextProps.client.birth_date,
            age: nextProps.client.age
        });
    }
    onSave = () => {
        document.getElementById("spanIdError").textContent="";
        document.getElementById("spanIdErrorDocument").textContent="";
        document.getElementById("spanIdErrorName").textContent="";
        document.getElementById("spanIdErrorDate").textContent="";
        if(this.state.document == null || this.state.document.length !== 14){
            document.getElementById("spanIdErrorDocument").textContent="* Documento invalido";
        }else if(this.state.name == null || this.state.name.length < 3){   
            document.getElementById("spanIdErrorName").textContent="* Nome invalido";
        }else if(this.state.birth_date == null || this.state.birth_date < 10){
            document.getElementById("spanIdErrorDate").textContent="* Data invalida";
        }else if(this.state.phone == null || this.state.phone.length < 10){
            document.getElementById("spanIdError").textContent="* numero invalido";
        }else{
            if (this.props.mode === 'edit') {
                fetch("http://localhost:8080/webapp/rest/clients/" + this.state.id,
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
                fetch("http://localhost:8080/webapp/rest/clients",
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
    }

    onDelete = () => {
        fetch("http://localhost:8080/webapp/rest/clients/" + this.state.id,
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
            phone: "",
            birth_date: "",
            age: ""
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
                        <Modal.Title>Deletar Cliente</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form id="client-form">
                            <label htmlFor="client-id">ID</label>
                            <input id="client-id" name="id" type="text" className="form-control" value={this.state.id} placeholder="#" onChange={this.handleInputChange} disabled />

                            <label htmlFor="client-document">document</label>
                            <input id="client-document" name="document" type="text" className="form-control" value={this.state.document} placeholder="Rua das Palmeiras, 123, Bairro X" onChange={this.handleInputChange} required disabled />
            
                            <label htmlFor="client-name">Nome</label>
                            <input id="client-name" name="name" type="text" className="form-control" value={this.state.name} placeholder="Anderson Silva" onChange={this.handleInputChange} required disabled />

                            <label htmlFor="client-phone">Telefone</label>
                            <input id="client-phone" name="phone" type="text" className="form-control" value={this.state.phone} placeholder="(54) 9 9100-0000" maxLength="16" required onChange={this.handleInputChange} disabled />

                            <label htmlFor="client-birth_date">data nascimento</label>
                            <input id="client-birth_date" name="birth_date" type="text" className="form-control" value={this.state.birth_date} placeholder="06/06/1999" maxLength="16" required onChange={this.handleInputChange} disabled />

                            <label htmlFor="client-age">idade</label>
                            <input id="client-age" name="age" type="text" className="form-control" value={this.state.age} placeholder="00" maxLength="16" required onChange={this.handleInputChange} disabled />
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
                        <Modal.Title>Alterar Cliente</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form id="client-form">
                        <label htmlFor="client-id">ID</label>
                            <input id="client-id" name="id" type="text" className="form-control" value={this.state.id} placeholder="#" onChange={this.handleInputChange} disabled />
            
                            <label htmlFor="client-name">Nome <span id="spanIdErrorName"></span></label>
                            <input id="client-name" name="name" type="text" className="form-control" value={this.state.name} placeholder="Anderson Pereira da Silva" onChange={this.handleInputChange} required/>

                            <label htmlFor="client-document">document <span id="spanIdErrorDocument"></span></label>
                            <IMaskInput mask="000.000.000-00" id="client-document" name="document" type="text" className="form-control" value={this.state.document} placeholder="000.000.000-00" maxLength="14" onChange={this.handleInputChange} required/>
                            
                            <label htmlFor="client-phone">Telefone <span id="spanIdError"></span></label>
                            <IMaskInput mask="(00) 0000-0000" id="client-phone" name="phone" type="text" className="form-control" value={this.state.phone} placeholder="(54) 9 0000-0000" maxLength="16" required onChange={this.handleInputChange}/>

                            <label htmlFor="client-birth_date">data nascimento <span id="spanIdErrorDate"></span></label>
                            <IMaskInput mask="00/00/0000" id="client-birth_date" name="birth_date" type="text" className="form-control" value={this.state.birth_date} placeholder="dd/mm/aaaa" maxLength="10" required onChange={this.handleInputChange}/>

                            <label htmlFor="client-age">idade</label>
                            <input id="client-age" name="age" type="text" className="form-control" value={this.state.age} placeholder="00" maxLength="3" required disabled />
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
                        <Modal.Title>Novo Cliente</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form id="client-form">
    
                            <label htmlFor="client-name">Nome <span id="spanIdErrorName"></span></label>
                            <input id="client-name" name="name" type="text" className="form-control" value={this.state.name} placeholder="Anderson Pereira da Silva" onChange={this.handleInputChange} required/>

                            <label htmlFor="client-document">CPF <span id="spanIdErrorDocument"></span></label>
                            <IMaskInput mask="000.000.000-00" id="client-document" name="document" type="text" className="form-control" value={this.state.document} placeholder="000.000.000-00" maxLength="14" required onChange={this.handleInputChange}/>

                            <label htmlFor="client-phone">Telefone <span id="spanIdError"></span></label>
                            <IMaskInput mask="(00) 0000-0000" id="client-phone" name="phone" type="text" className="form-control" value={this.state.phone} placeholder="(54) 9 9100-0000" maxLength="16" required onChange={this.handleInputChange}/>

                            <label htmlFor="client-birth_date">data nascimento <span id="spanIdErrorDate"></span></label>
                            <IMaskInput mask="00/00/0000" id="client-birth_date" name="birth_date" type="text" className="form-control" value={this.state.birth_date} placeholder="dd/mm/aaaa" maxLength="10" required onChange={this.handleInputChange}/>

                            <label htmlFor="client-age">idade</label>
                            <input id="client-age" name="age" type="text" className="form-control" value={this.state.age} placeholder="00" maxLength="3" disabled />

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