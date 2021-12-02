import React, { Component } from 'react';
import DeleteBtn from '../btns/DeleteBtn';
import EditBtn from '../btns/EditBtn';

export default class StoreRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <th scope="row">{this.props.store.id}</th>
                <td>{this.props.store.name}</td>
                <td>{this.props.store.address}</td>
                <td>{this.props.store.phone}</td>
                <td>
                    <EditBtn onClick={() => this.props.actionEdit(this.props.store)} />
                    <DeleteBtn onClick={() => this.props.actionDelete(this.props.store)} />
                </td>
            </tr>
        );
    }
}