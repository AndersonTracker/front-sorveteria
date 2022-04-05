import React, { Component } from 'react';

export default class PrductAdd extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button type="button" onClick={this.props.onClick} className="btn btn-outline-success">
                Atualizar estoque
            </button>
        );
    }
}