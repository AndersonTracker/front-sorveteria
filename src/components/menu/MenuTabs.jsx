import React, { Component } from 'react';
import CustomTab from './CustomTab';
import Login from './../login/Login';
import LogadoComo from './../login/LogadoComo';
import Logout from './../login/Logout';

export default class MenuTabs extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <LogadoComo/>
                <Login/>
                <Logout/>
                <ul className="nav nav-tabs menu-tabs">
                    <CustomTab isActive={this.props.activePage=='home'} tabTitle="Inicio" clickFunc={this.props.activePageHome}/>
                    <CustomTab isActive={this.props.activePage=='stores'} tabTitle='Lojas' clickFunc={this.props.activePageStores}/>
                    <CustomTab isActive={this.props.activePage=='employees'} tabTitle='Funcionarios' clickFunc={this.props.activePageEmployees}/>
                    <CustomTab isActive={this.props.activePage=='orders'} tabTitle='Pedidos' clickFunc={this.props.activePageOrders}/>
                    <CustomTab isActive={this.props.activePage=='ordersDetails'} tabTitle='Pedidos fechados' clickFunc={this.props.activePageOrdersDetails}/>
                    <CustomTab isActive={this.props.activePage=='clients'} tabTitle='Clientes' clickFunc={this.props.activePageClients}/>
                    <CustomTab isActive={this.props.activePage=='products'} tabTitle='Produtos' clickFunc={this.props.activePageProducts}/>
                    <CustomTab isActive={this.props.activePage=='logs'} tabTitle='Historico' clickFunc={this.props.activePageLogs}/>
                    <CustomTab isActive={this.props.activePage=='profits'} tabTitle='Lucro' clickFunc={this.props.activePageProfits}/>
                    
                </ul>
            </>
        );
    }
}