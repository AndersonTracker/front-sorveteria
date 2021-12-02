import React, { Component } from 'react';
import DeleteBtn from '../btns/DeleteBtn';
import EditBtn from '../btns/EditBtn';

export default class EmployeeRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <th scope="row">{this.props.employee.id}</th>
                <td>{this.props.employee.name}</td>
                <td>{this.props.employee.document}</td>
                <td>{this.props.employee.storeId}</td>
                <td>{this.props.employee.kickiback}</td>
                <td>{this.props.employee.showCommission}</td>
                <td>
                <EditBtn onClick={()=>this.props.actionEdit(this.props.employee)}/>
                    <DeleteBtn onClick={()=>this.props.actionDelete(this.props.employee)}/>
                </td>
            </tr>
        );
    }
}