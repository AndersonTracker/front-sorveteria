import React, { Component } from 'react';

export default class AddBtn extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button type="button" onClick={this.props.onClick} className="btn btn-outline-success">
                Salvar
            </button>
        );
    }
}