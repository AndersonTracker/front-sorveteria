import React, { Component } from 'react';
import DeleteBtn from '../btns/DeleteBtn';
import EditBtn from '../btns/EditBtn';
import PrductAdd from '../btns/PrductAdd';

export default class ProductRow extends Component {

    render() {
        return (
            <tr>
                <th scope="row">{this.props.product.id}</th>
                <td>{this.props.product.name}</td>
                <td>{this.props.product.desc}</td>
                <td>{this.props.product.price}</td>
                <td>{this.props.product.quantity}</td>
                <td>
                    <EditBtn onClick={()=>this.props.actionEdit(this.props.product)}/>
                    <DeleteBtn onClick={()=>this.props.actionDelete(this.props.product)}/>
                    <PrductAdd onClick={()=>this.props.actionProductAddEstoque(this.props.product)}/>
                </td>
            </tr>
        );
    }
}
