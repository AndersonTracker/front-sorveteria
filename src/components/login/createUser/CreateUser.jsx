import React, { useState, useContext, useEffect} from 'react';
import { IMaskInput } from "react-imask";
import {useHistory} from 'react-router-dom';
import { FiAlertTriangle } from "react-icons/fi";
    
    const CreateUser = () => {
    const [user, setValueUser] = useState('');
    const [password, setValuePassword] = useState('');
    const [telefone, setTelefone] = useState('');
    const [autorizado, setAutoriza] = useState(true);
    const [valuesSuperPassword, setValuesSuperPassword] = useState('');
    const [valuesSuperUser, setValuesSuperUser] = useState('');
    const History = useHistory();

    function initialState(){
        return {user: '',
            password: '',
            telefone: ''}
    }

    function handleInputChangePassword(event){
        let target = event.target;
        let value = target.value;
        setValuePassword(value);
    }

    function handleInputChangeUser(event){
        let target = event.target;
        let value = target.value;
        setValueUser(value);
    }

    function handleInputChangeTelefone(event){
        let target = event.target;
        let value = target.value;
        setTelefone(value);
    }

    function handleInputChangeSuperUser(event){
        let target = event.target;
        let value = target.value;
        setValuesSuperUser(value);
    }

    function handleInputChangeSuperPassword(event) {
        let target = event.target;
        let value = target.value;
        setValuesSuperPassword(value);
    }

    function isSuperUser(event){
        event.preventDefault();
        if(valuesSuperUser == "SuperAdmin" && valuesSuperPassword == "admin123"){
            setAutoriza(false);
            setValuesSuperPassword('');
            setValuesSuperUser('');
        }else{
            setAutoriza(true);
            setValuesSuperPassword('');
        }
    }

    function cadastrar(event){
        event.preventDefault();
        fetch("http://localhost:8080/webapp/rest/createUser",
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({user, password, telefone})
                }).then((response) => {
                    if(response.status == 204){
                        return History.push('/LoginPage');
                    }else{
                        throw new Error();
                    }
                }).catch((error) => {
                    document.getElementById("isSuperAdminTrue").textContent="* Usuario ja existente";
                    document.getElementById("isSuperAdminTrue").style.color = "red";
                });
    }

    function Cancelar(){
        return History.push('/LoginPage');
    }
    
    useEffect(() => { 
    }, [])

        return (
            <>  
            <div className="div-login1">
                        <h1 className="titleLogin">cadastrar novo usuario</h1>
                        <h2 className="titleLogin2"> <FiAlertTriangle/> para proseguir, é necessario a aprovação do SuperAdmin.</h2>

                        <form onSubmit={isSuperUser} autoComplete="nope">
                        <div className="labelLogin2">
                                    <label className="label1" htmlFor="email"> Super Usuario</label>
                                    <input className="inputLoginSuper" id="email" type="text" name="user" autoComplete="off" onChange={handleInputChangeSuperUser} value={valuesSuperUser} required/>
                                </div>
                                <div className="PasswordSuper">
                                    <label className="LabelPasswordSuper" htmlFor="password">Senha</label>
                                    <input className="inputLoginSuper" id="password" type="password" name="password" onChange={handleInputChangeSuperPassword} value={valuesSuperPassword} required/>
                                </div>
                                <input className="btnEnviar1" type="submit" value="Verificar"/>
                        </form>
    
                        <form onSubmit={cadastrar} autoComplete="nope">
                            <div className="labelLoginGroup1">
                            {autorizado == false ? (<span id ="isSuperAdminTrue" className='isSuperAdminTrue' > cadastro autorizado.</span>): <spam className="isSuperAdmin">cadastro não autorizado</spam>}
                                <div className="labelLogin1">
                                    <label className="labelCadastro" htmlFor="email">Usuario</label>
                                    <input className="inputLoginCadastro" id="email" type="text" name="user" autoComplete="off" onChange={handleInputChangeUser} value={user} disabled={autorizado} required/>
                                    <span>{}</span>
                                </div>
                                <div className="">
                                    <label className="labelCadastroPassword" htmlFor="password">Senha</label>
                                    <input className="inputLoginCadastro" id="password" type="password" name="password" onChange={handleInputChangePassword} value={password} disabled={autorizado} required/>
                                    <span>{}</span>
                                </div>
                                <div className="">
                                    <label className="labelCadastroTelefone" htmlFor="email">Telefone</label>
                                    <IMaskInput mask="(00)00000-0000" className="inputLoginCadastro" id="telefone" type="text" name="telefone" autoComplete="off" onChange={handleInputChangeTelefone} value={telefone} disabled={autorizado} required/>
                                    <span>{}</span>
                                </div>
                                <input className="btnEnviarCadastrar" type="submit" value="Cadastrar" disabled={autorizado}/>
                                
                                <input className="btnEnviarCreateUser" onClick={Cancelar} type="submit" value="Cancelar"/>
                            </div>
                            
                        </form>
            </div>
            </>
        );
}
export default CreateUser;
