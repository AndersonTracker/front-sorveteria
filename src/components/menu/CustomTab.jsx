import React, { Component } from 'react';

export default class CustomTab extends Component {

    render() {
        return (
            <li className="nav-item">
                <button onClick={this.props.clickFunc} className={this.props.isActive?"nav-link btn btn-link active":"nav-link btn btn-link"}>{this.props.tabTitle}
                </button>
            </li>
        );
    }
}