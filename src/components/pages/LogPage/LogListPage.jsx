import React, { Component } from 'react';
import LogRow from './LogRow';

export default class LogListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: []
    }
  }

  componentDidMount() {
    this.updateLogsList();
  }

  updateLogsList = () => {
    fetch("http://localhost:8080/webapp/rest/logs").then(response => response.json()).then(
      data => {
        this.setState({
          logs: data
        });
      }
    )
  }

  render() {
    return (
      <>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">desc</th>
              <th scope="col">date</th>
            </tr>
          </thead>
          <tbody>
            {this.state.logs.map(log => {
              return <LogRow key={log.id} log={log} actionEdit={this.setModalModeToEdit} actionDelete={this.setModalModeToDelete}/>;
            })}
          </tbody>
        </table>
      </>
    )
  }
}

