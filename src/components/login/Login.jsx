import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export class Login extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
                <div className='login'>
                <Link to="/LoginPage"><button type="button" className='btnLogin'>faça login</button></Link>
                </div>
            </>
        );
    }
}   
    export default Login;