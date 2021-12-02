import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';

import MenuTabs from './MenuTabs';
import PageContainer from './../PageContainer';

export default class MenuMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
          activePage: "home"
        }
      }
      
  render() {
    return (
      <>
              <MenuTabs
                activePage={this.state.activePage}
                activePageHome={this.activePageHome}
                activePageStores={this.activePageStores}
                activePageEmployees={this.activePageEmployees}
                activePageOrders={this.activePageOrders}
                activePageOrdersDetails={this.activePageOrdersDetails}
                activePageClients={this.activePageClients}
                activePageProducts={this.activePageProducts}
                activePageLogs={this.activePageLogs}
                activePageProfits={this.activePageProfits}
              />
              <br/>
              <PageContainer pageToRender={this.state.activePage} />   
      </>
    );
  }

  activePageLogin = () => {
    this.setActivePage("login");
  }
  activePageHome = () => {
    this.setActivePage("home");
  }
  activePageStores = () => {
    this.setActivePage("stores");
  }
  activePageEmployees = () => {
    this.setActivePage("employees");
  }
  activePageOrders = () => {
    this.setActivePage("orders");
  }
  activePageClients = () => {
    this.setActivePage("clients");
  }
  activePageOrdersDetails = () => {
    this.setActivePage("ordersDetails");
  }
  activePageProducts = () => {
    this.setActivePage("products");
  }
  activePageLogs = () => {
    this.setActivePage("logs");
  }
  activePageProfits = () => {
    this.setActivePage("profits");
  }

  setActivePage = (page) => {
    this.setState({ activePage: page });
  }
}