import React, { Component } from 'react';

export default class OrderDetailRow extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <tr>
                <td>{this.props.orderDetail.employee_name}</td>
                <td>{this.props.orderDetail.client_name}</td>
                <td>{this.props.orderDetail.ice_cream_name}</td>
                <td>{this.props.orderDetail.item_quantity}</td>
                <td>{this.props.orderDetail.unity_amount}</td>
                <td>{this.props.orderDetail.total_amount}</td>
            </tr>
        );
    }
}
