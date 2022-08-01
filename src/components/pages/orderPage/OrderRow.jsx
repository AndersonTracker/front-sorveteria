import React, { Component } from 'react';
import DeleteBtn from '../btns/DeleteBtn';
import EditBtn from '../btns/EditBtn';

export default class OrderRow extends Component {
    
    render() {
        return (
            <tr>
                <th scope="row">{this.props.order.id}</th>
                <td>{this.props.order.employeeId}</td>
                <td>{this.props.order.clientName}</td>
                <td>{this.props.order.iceCreamId}</td>
                <td>{this.props.order.itemQuantity}</td>
                <td>{this.props.order.unityAmount}</td>
                <td>{this.props.order.totalAmount}</td>
                <td>
                    <EditBtn onClick={()=>this.props.actionEdit(this.props.order)}/>
                    <DeleteBtn onClick={()=>this.props.actionDelete(this.props.order)}/>
                </td>
            </tr>
        );
    }
}
