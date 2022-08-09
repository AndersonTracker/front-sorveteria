import React, { useState, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IMaskInput } from "react-imask";
import {useHistory} from 'react-router-dom';

    const ResetSenha = () => {
    const [user, setValueUser] = useState('');
    const [codAleatorio, setCodAleatorio] = useState('');
    const [codRecebido, setCodRecebido] = useState('');
    const [senha, setSenha] = useState('');
    const [repetirSenha, setRepetirSenha] = useState('');
    const [liberaAlter, setLiberaAlter] = useState(false);
    const [liberaConfirmaçãoCod, setLiberaConfirmaçãoCod] = useState(false);
    const [liberaEdit, setLiberaEdit] = useState(true);
    const [telefone, setTelefone] = useState('');
    const History = useHistory();

    // Load the AWS SDK for Node.js
    const AWS = require('aws-sdk');
    const credentials = {
        id: 'AKIA4J233NBVDMQ6MQMX',
        secret: '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'
    }
    // Set region
    AWS.config.update({
        region: 'us-east-1',
        accessKeyId: credentials.id,
        secretAccessKey: credentials.secret
    });
    // Create publish parameters
    let params = {
        Message: 'seu codigo de verificação é ', /* required */
        PhoneNumber: '+55',
    };
    // Create promise and SNS service object
    function sendSMS(params) {
        var publishTextPromise = new AWS.SNS().publish(params).promise();
        // Handle promise's fulfilled/rejected states
        publishTextPromise.then(function (data) {
            console.log("MessageID is " + data.MessageId);
        }).catch(function (err) {
            console.error(err, err.stack);
        });
    }

    function handleInputChangeUser(event){
        let target = event.target;
        let value = target.value;
        setValueUser(value);
    }

    function handleNovaSenha(event){
        let target = event.target;
        let value = target.value;
        if(value.length > 6){
            setSenha(value);
            setLiberaEdit(true);
            document.getElementById("alterarSenhaInputPrimeira").textContent=" a senha esta nos conformes";
            document.getElementById("alterarSenhaInputPrimeira").style.color = "green"; 
            document.getElementById("alterarSenhaInputPrimeira1").textContent='';
        }else{
            setLiberaEdit(true);
            document.getElementById("alterarSenhaInputPrimeira").textContent=" senha muito curta, a senha deve haver mais que 6 caracteres.";
            document.getElementById("alterarSenhaInputPrimeira1").textContent='';
            document.getElementById("alterarSenhaInputPrimeira").style.color = "red"; 
        }
    }

    function handleRepetirNovaSenha(event){
        let target = event.target;
        let value = target.value;
        if(senha == value){
            setLiberaEdit(false);
            document.getElementById("alterarSenhaInputPrimeira1").textContent=" senha compativel";
            document.getElementById("alterarSenhaInputPrimeira1").style.color = "green"; 
            setRepetirSenha(value);
        }else{
            setLiberaEdit(true);
            document.getElementById("alterarSenhaInputPrimeira1").textContent=" senha incompativel";
            document.getElementById("alterarSenhaInputPrimeira1").style.color = "red"; 
        }
    }

    function handleCod(event){
        let target = event.target;
        let value = target.value;
        if(value.length == 5){
            setCodRecebido(value);
            validaCod(value);
        }
    }
    
    function validaCod(codReceb){
        console.log(codAleatorio);
        if(codAleatorio == codReceb){
            setLiberaAlter(true);
            setLiberaConfirmaçãoCod(false); 
        }else{
            setLiberaAlter(false); 
            document.getElementById("emailHelp1").textContent=" Codigo invalido!";
            document.getElementById("emailHelp1").style.color = "red"; 
        }

    }

    function updateSenha(event){
        event.preventDefault();
        console.log(user + " " + senha);
        fetch("http://localhost:8080/webapp/rest/createUser",
        {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"user": user, "password": senha})
        }).then((response) => {
            if(response.status == 204){
                return History.push('/LoginPage');
            }else{
                throw new Error();
            }
        }).catch((error) => {
            console.log(error);
        });  
    }

    function verificarCelular(event){
        event.preventDefault();
        
        fetch("http://localhost:8080/webapp/rest/login",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"user": user})
            }).then(response => {
                return response.json()
            }).then(r => {
                if(r.telefone !== undefined){
                    var numero = Math.floor(Math.random() * 65536);
                    setCodAleatorio(numero);
                    setTelefone(r.telefone);
                    verificarTelefone(r.telefone, numero);
                    document.getElementById("alertUsuarioInexistente").textContent="* Usuario encontrado";
                    document.getElementById("alertUsuarioInexistente").style.color = "green";
                }else{
                    document.getElementById("alertUsuarioInexistente").textContent="* Usuario não encontrado";
                    document.getElementById("alertUsuarioInexistente").style.color = "red";
                    setLiberaAlter(false);
                    setLiberaConfirmaçãoCod(false);
                }
            });   
    }

    function verificarTelefone(tele, num){
        if(tele !== ''){
            setLiberaConfirmaçãoCod(true); 
            var resultado = tele.replace("(", "");
            var resultado1 = resultado.replace(" ", "");
            var resultado2 = resultado1.replace("-", "");
            var resultado3 = resultado2.replace(")", "");
            console.log(resultado3);
            params.Message = 'seu codigo de verificação é ' + num;
            params.PhoneNumber = '+55' + resultado3;
            sendSMS(params);
        }else{
            document.getElementById("alertUsuarioInexistente").textContent="* Usuario não encontrado";
            document.getElementById("alertUsuarioInexistente").style.color = "red";
        }
    }

    return (
      <>
        <div className="resetSenhaForm">
            <div class="alert alert-primary" role="alert">
                <p class="font-italic">Preencha o formulario com seu usuario para receber o codigo via SMS. Apos isso, resete sua senha para uma senha forte</p>
            </div>
            <form autoComplete="off">  
                <div class="form-group col-md-6">
                    <label for="exampleInputEmail1">Usuario <spam id="alertUsuarioInexistente"></spam></label>
                    <input autoComplete="off" type="text" class="form-control" id="exampleInputEmail1" placeholder="ex: admin" onChange={handleInputChangeUser} value={user} disabled={liberaConfirmaçãoCod || liberaAlter} required/>
                    <small id="emailHelp" class="form-text text-muted">Seus dados estaram seguros.</small>
                </div>
                <button type="submit" onClick={verificarCelular} class="btn btn-primary" disabled={liberaConfirmaçãoCod || liberaAlter}>enviar confirmação de usuario</button>
            </form>
        </div>
        {liberaConfirmaçãoCod === true ? (
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Confirmação de autenticidade.</h5>
                    <h6 class="card-subtitle mb-2 text-muted">enviamos um codigo para seu numero. insira o codigo para liberação da troca de senha.</h6>
                    <IMaskInput mask="00000" className="inputLoginCadastro" id="cod" type="text" name="cod" autoComplete="off" onChange={handleCod} required/><small id="emailHelp1" class="form-text"></small>
                </div>
            </div>
            ): <span></span>
        }
            {liberaAlter === true   ? (
                <div className="resetSenhaFormNovaSenha">
                    <form autoComplete="off">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Nova Senha <spam id="alterarSenhaInputPrimeira"></spam></label>
                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Nova senha" autoComplete="off" onChange={handleNovaSenha} required/>
                            <small id="emailHelp" class="form-text text-muted">Nunca vamos compartilhar seus dados, com ninguém.</small>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Repita a Senha <spam id="alterarSenhaInputPrimeira1"></spam></label>
                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Senha" autoComplete="off" onChange={handleRepetirNovaSenha} required/>
                        </div>
                        <button type="submit" class="btn btn-primary" onClick={updateSenha} disabled={liberaEdit}>Enviar</button>
                    </form>
                </div>
              ): <span></span>
            }
      </>
    );

}
export default ResetSenha;