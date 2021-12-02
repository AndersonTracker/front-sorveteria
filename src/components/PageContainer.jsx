import React, { Component } from 'react';
import Login from './login/LoginPage';
import HomePage from './pages/homePage/HomePage';
import StoreListPage from './pages/storePage/StoreListPage';
import EmployeeListPage from './pages/employeePage/EmployeeListPage';
import OrderListPage from './pages/orderPage/OrderListPage';
import ClientListPage from './pages/clientPage/ClientListPage';
import ProductListPage from './pages/productPage/ProductListPage';
import LogListPage from './pages/LogPage/LogListPage';
import ProfitListPage from './pages/ProfitPage/ProfitListPage';
import OrderDetailListPage from './pages/OrderDetailPage/OrderDetailListPage';

export default class PageContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.pageToRender === "login") {
            return (
                <Login/>
            );
        }else if (this.props.pageToRender === "home") {
            return (
                <HomePage/>
            );
        } else if (this.props.pageToRender === "stores") {
            return (
                <StoreListPage/>
            );
        } else if (this.props.pageToRender === "employees") {
            return (
                <EmployeeListPage/>
            );
        } else if (this.props.pageToRender === "logs") {
            return (
                <LogListPage/>
            );
        } else if (this.props.pageToRender === "profits") {
            return (
                <ProfitListPage/>
            );
        } else if (this.props.pageToRender === "orders") {
            return (
                <OrderListPage/>
            );
        } else if (this.props.pageToRender === "ordersDetails") {
            return (
                <OrderDetailListPage/>
            );
        } else if (this.props.pageToRender === "clients") {
            return (
                <ClientListPage/>
            );
        } else if (this.props.pageToRender === "products") {
            return (
                <ProductListPage/>
            );
        } 
    }
}
