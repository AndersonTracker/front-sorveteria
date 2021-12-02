import React, { Component } from 'react';

export default class LogRow extends Component {

    render() {
        return (
            <tr>
                <th scope="row">{this.props.log.id}</th>
                <td>{this.props.log.desc}</td>
                <td>{this.props.log.date}</td>
            </tr>
        );
    }
}