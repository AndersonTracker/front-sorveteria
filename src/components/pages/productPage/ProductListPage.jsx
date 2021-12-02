import React, { Component } from 'react';
import ProductRow from './ProductRow';
import ProductForm from './ProductForm';
import AddBtn from '../btns/AddBtn';

export default class ProductListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      openModal: false,
      modalMode: '',
      modalProduct: {}
    }
  }

  componentDidMount() {
    this.updateProductList();
  }

  toggleModal = () => {
    this.setState({
      openModal: !this.state.openModal
    });
    this.updateProductList();
  }

  setModalModeToCreate = () => {
    this.setState({
      openModal: true,
      modalMode: 'create',
      modalProduct: {}
    });
  }

  setModalModeToEdit = (product) => {
    this.setState({
      openModal: true,
      modalMode: 'edit',
      modalProduct: product
    });
  }

  setModalModeToDelete = (product) => {
    this.setState({
      openModal: true,
      modalMode: 'delete',
      modalProduct: product
    });
  }

  updateProductList = () =>{
    fetch("http://localhost:8080/webapp/rest/ice-cream").then(response => response.json()).then(
      data => {
        this.setState({
          products: data
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
              <th scope="col">Descrição</th>
              <th scope="col">preço</th>
              <th scope="col">quantidade</th>
              <th scope="col" className="acoes">Ações</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map(product => {
              return <ProductRow key={product.id} product={product} actionEdit={this.setModalModeToEdit} actionDelete={this.setModalModeToDelete} />;
            })}
          </tbody>
        </table>
        <AddBtn onClick={this.setModalModeToCreate} />
        <ProductForm mode={this.state.modalMode} show={this.state.openModal} product={this.state.modalProduct} toggleModal={this.toggleModal} />
      </>
    )
  }
}
