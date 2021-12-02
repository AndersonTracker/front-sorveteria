import React, { Component } from 'react';

export default class CancelBtn extends Component {

    render() {
        return (
            <button type="button" onClick={this.props.onClick} className="btn btn-outline-danger">
                cancelar
            </button>
        );
    }
}