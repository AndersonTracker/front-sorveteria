import React, { Component } from 'react';
import Login from '../../login/Login';
import {Link} from 'react-router-dom';

export default class HomePageAfterLogin extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
            <div className="texto-inicial1">
                <Link to="/LoginPage"><Login/></Link>
                <div className="texto-inicial">
                    <p>Esse é o sistema de administração da Sorveteria <strong>2.0</strong></p>
                    <p className="texto-inicial"><strong>faça login para ter acesso ao conteudo</strong></p>
                </div>
            </div>
            </>
        )
    }
}