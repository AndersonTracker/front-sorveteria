import React, { Component } from 'react';

export default class AddBtn extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button type="button" className="btn btn-outline-success"
            onClick={this.props.onClick}>
                Criar
            </button>
        );
    }
}