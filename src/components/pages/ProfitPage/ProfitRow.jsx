import React, { Component } from 'react';

export default class ProfitRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <th scope="row">{this.props.profit.id}</th>
                <td>{this.props.profit.idOrders}</td>
                <td>{this.props.profit.amountTotalProfit}</td>
                <td>{this.props.profit.profitDate}</td>
            </tr>
        );
    }
}