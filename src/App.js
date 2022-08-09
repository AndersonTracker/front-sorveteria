import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LoginPage from './components/login/LoginPage';
import NotFounder from './components/pages/notFounder/NotFounder';
import RoutePrivate from './components/rootsPrivates/RootsPrivate';
import Header from './components/header/Header';
import Provider from './components/context/Provider';
import Footer from './components/footer/Footer';
import HomePageAfterLogin from './components/pages/homePage/HomePageAfterLogin';
import MenuMenu from './components/menu/MenuMenu';
import CreateUser from './components/login/createUser/CreateUser';
import ResetSenha from './components/login/resetSenha/ResetSenha';

export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      activePage: "home",
    }
  }
  
  render() {
    return (
      <>
        <Router>
          <Provider>
          <Header/>
          <Switch>
            <Route exact path="/" component={HomePageAfterLogin}/>
            <Route exact path="/LoginPage" component={LoginPage}/>
            <RoutePrivate exact path="/home" component={MenuMenu}/>
            <Route exact path="/newUser" component={CreateUser}/>
            <Route exact path="/ResetSenha" component={ResetSenha}/>
            <Route path="" component={NotFounder}/>
          </Switch>
          <Footer />
          </Provider>
        </Router>
      </>
    );
  }
}