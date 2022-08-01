import React, { useState, useContext, useEffect} from 'react';
import Context from '../../context/Context'; 
import {useHistory} from 'react-router-dom';
    
    const CreateUser = () => {
    const [values, setValues] = useState(initialState);
    const History = useHistory();

    function initialState(){
        return {user: '',
            password: ''}
    }

    function onChange(event) {
        localStorage.setItem('user', JSON.stringify({name: event.target.value}));
        const {value, name} = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    }

    function onChangePassword(event) {  
        const {value, name} = event.target;
        setValues({
            ...values,
            [name]: value,
        });  
    }

    function onSubmit(event){
        event.preventDefault();
        onSave(values);
    }
   
    function onSave(user, password){
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
                  });
    }

    function Cancelar(){
        return History.push('/LoginPage');
    }
    
    useEffect(() => { 
    }, [])

        return (
            <>  
            <div className="div-login">
                        <h1 className="titleLogin">cadastrar novo usuario</h1>

                        <form onSubmit={onSubmit} autoComplete="nope">
                                <div className="labelLogin2">
                                    <label className="label1" htmlFor="email">Usuario</label>
                                    <input className="inputLogin" id="email" type="text" name="user" autoComplete="off" onChange={onChange} value={values.user} required/>
                                    <span>{}</span>
                                </div>
                                <div className="labelLogin2">
                                    <label className="label2" htmlFor="password">Senha</label>
                                    <input className="inputLogin" id="password" type="password" name="password" onChange={onChangePassword} value={values.password} required/>
                                    <span>{}</span>
                                </div>
                            <div className="labelLoginGroup">
                                <div className="labelLogin1">
                                    <label className="label1" htmlFor="email">Usuario</label>
                                    <input className="inputLogin" id="email" type="text" name="user" autoComplete="off" onChange={onChange} value={values.user} required/>
                                    <span>{}</span>
                                </div>
                                <div className="labelLogin2">
                                    <label className="label2" htmlFor="password">Senha</label>
                                    <input className="inputLogin" id="password" type="password" name="password" onChange={onChangePassword} value={values.password} required/>
                                    <span>{}</span>
                                </div>
                                <input className="btnEnviar" type="submit" value="Login"/>
                                <p></p>
                                <input className="btnEnviarCreateUser" onClick={Cancelar} type="submit" value="Cancelar"/>
                            </div>
                            
                        </form>
                        </div>
            </>
        );
}
export default CreateUser;
