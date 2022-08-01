import React, { Component } from 'react';
import UserNotPermit from '../userNotPermit/UserNotPermit';
import ProfitRow from './ProfitRow';

export default class ProfitListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profits: [],
      profitTotal: 0
    }
  }

  componentDidMount() {
    this.updateProfitsList();
  }

  updateProfitsList = () => {
    fetch("http://localhost:8080/webapp/rest/profits").then(response => response.json()).then(
      data => {
            let total = 0;
            data.map(profit => { 
                total += profit.amountTotalProfit;
            });
                
            this.setState({
            profits: data,
            profitTotal: total 
        });
      }
    )
  }

  render() {
    var valorUser = document.getElementById('locadoComoEu').innerHTML;
    if(valorUser == "SuperAdmin"){
      return (
        <>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">id do pedido</th>
                <th scope="col">lucro total</th>
                <th scope="col">data da venda</th>
              </tr>
            </thead>
            <tbody>
              {this.state.profits.map(profit => {
                  return <ProfitRow key={profit.idOrders} profit={profit} actionEdit={this.setModalModeToEdit} actionDelete={this.setModalModeToDelete}/>;

              })}
            </tbody>
          </table>
                <p>valor total = <span scope="col" id="valorTotal" >{this.state.profitTotal.toFixed(2)}</span></p>
        </>
      )
    }else{
      return (
        <UserNotPermit/>
      )
    }
  }
}

