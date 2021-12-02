import React, { Component } from 'react';
import DeleteBtn from '../btns/DeleteBtn';
import EditBtn from '../btns/EditBtn';

export default class ClientRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <th scope="row">{this.props.client.id}</th>
                <td>{this.props.client.name}</td>
                <td>{this.props.client.document}</td>
                <td>{this.props.client.phone}</td>
                <td>{this.props.client.birth_date}</td>
                <td>{this.props.client.age}</td>
                <td>
                    <EditBtn onClick={() => this.props.actionEdit(this.props.client)} />
                    <DeleteBtn onClick={() => this.props.actionDelete(this.props.client)} />
                </td>
            </tr>
        );
    }
}