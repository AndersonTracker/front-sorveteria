import React, { useState, useContext, useEffect} from 'react';
import Context from '../context/Context'; 
import {useHistory} from 'react-router-dom';
    var token = '';
    localStorage.setItem('attempts', 3);
    
    const LoginPage = () => {
    const [span, setSpan] = useState('');
    const [block, setBlock] = useState('');
    const {user, setUser } = React.useContext(Context);
    const [usuario, setUsurio] = useState('');
    const [values, setValues] = useState(initialState);
    const { setToken } = useContext(Context);
    const History = useHistory();

    function login(usuario, senha, systemLocked){
        // teste
        if(localStorage.getItem('attempts') > 0){
            if(usuario !== undefined && senha !== undefined && systemLocked !== 'false'){
                token = 'true';
                setUser({name: usuario});
                localStorage.setItem('attempts', 3);
            }else{
                if(localStorage.getItem('attempts') == 1){
                    blocked();
            }
                token = 'false';
                var valor = localStorage.getItem('attempts');
                valor--;
                localStorage.setItem('attempts', valor);
                {valor === 0 ? (
                setSpan("sistema bloqueado.")
                ): setSpan("senha invalida, tentativas " + localStorage.getItem('attempts') + ".");}
            }
        }
        validation(token);
    }

    function initialState(){
        return {user: '',
            password: ''}
    }

    function onChange(event) {
        localStorage.setItem('user', JSON.stringify({name: event.target.value}));
        setUser({name: event.target.value});
        const {value, name} = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    }

    function onSubmit(event){
        event.preventDefault();
        token = 'false';
        onSave(values);
    }
    function validation(token){
        if(token === 'true'){
            setToken(token);
            setUsurio(values.user);
            return History.push('/home');
        }
        setValues(initialState);
    }
   
    function onSave(user, password){
        if(localStorage.getItem('attempts') > 0 && block == true){
            fetch("http://localhost:8080/webapp/rest/login",
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user, password)
                }).then(response => {
                    return response.json()
                }).then(r => {
                    login(r.user, r.password, r.systemLocked);
                  });
        }else{
            setSpan("sistema bloqueado.");
        }
    }

    function blocked(){
            fetch("http://localhost:8080/webapp/rest/login",
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify()
            })
    }
    
    function renderizar(){
        fetch("http://localhost:8080/webapp/rest/login",
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        }).then(response => {
            return response.json()
        }).then(r => {
            setBlock(r.systemLocked);
          });
    }
    
    useEffect(() => { 
        renderizar();
    }, [])

        return (
            <>
                <div className="div-login-body">
                    <div className="div-login">
                        <h1 className="titleLogin">Acessar o Sistema de Administração</h1>
                        {block === true ? (
                        <span className="spanStatus">sistema em funcionamento.</span>
                    ): <span className="spanStatusBlock">sistema bloqueado.</span>}
                        <form onSubmit={onSubmit} autoComplete="nope">
                            <div className="labelLoginGroup">
                                <span className="spanLogin">{span}</span>
                                <div className="labelLogin1">
                                    <label className="label1" htmlFor="email">Usuario</label>
                                    <input className="inputLogin" id="email" type="text" name="user" autoComplete="off" onChange={onChange} value={values.user} required/>
                                    <span>{}</span>
                                </div>
                                <div className="labelLogin2">
                                    <label className="label2" htmlFor="password">Senha</label>
                                    <input className="inputLogin" id="password" type="password" name="password" onChange={onChange} value={values.password} required/>
                                    <span>{}</span>
                                </div>
                                <input className="btnEnviar" type="submit" value="Login"/>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </>
        );
}
export default LoginPage;