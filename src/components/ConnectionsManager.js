import React from 'react';
import { connect } from 'react-redux';
import { selectBrokerages, selectAuthorizations, selectAccounts } from '../selectors';
import { baseUrl, initialLoad, loadBrokerages } from '../actions';
import { deleteData } from '../api';
import AuthorizationPicker from '../components/AuthorizationPicker';
import { Button } from '../styled/Button';

import ShadowBox from '../styled/ShadowBox';

export class ConnectionsManager extends React.Component {
  state = {
    creatingNewConnection: false,
    deletingConnection: false,
    targetConnectionId: null,
  }

  startCreatingNewConnection() {
    this.setState({creatingNewConnection: true});
  }

  cancelCreatingNewConnection() {
    this.setState({creatingNewConnection: false});
  }

  startDeletingConnection(connectionId) {
    this.setState({deletingConnection: true, targetConnectionId: connectionId});
  }

  cancelDeletingConnection() {
    this.setState({deletingConnection: false, targetConnectionId: null});
  }

  confirmDeleteConnection() {
    deleteData(`${baseUrl}/api/v1/authorizations/${this.state.targetConnectionId}`)
      .then(response => {
        console.log('success', response);
        this.setState({deletingConnection: false, targetConnectionId: null});
        this.props.reloadBrokerages();
        this.props.reloadAllState();
      })
      .catch(error => {
        console.log('error', error);
        this.setState({deletingConnection: false, targetConnectionId: null});
        this.props.reloadBrokerages();
        this.props.reloadAllState();
      });
  }

  selectAccountsByAuthorizationId(authorizationId) {
    let accounts = []
    this.props.accounts.map(account => {
      if (account.brokerage_authorization === authorizationId) {
        accounts.push(account);
      }
      return null;
    })
    return accounts
  }

  render() {
    let authorizations = null;
    if (this.props.authorizations) {
      authorizations = this.props.authorizations.map(a =>
        <div key={a.id}>
          {this.state.deletingConnection && this.state.targetConnectionId === a.id ? (
              <div>
                <span>{a.brokerage.name}</span>
                <div>
                  This connection contains the following accounts:
                </div>
                <div>
                  {this.selectAccountsByAuthorizationId(a.id).map(account => (
                    <div key={account.id}>
                      {account.name} ({account.number})
                    </div>
                  ))}
                </div>
                <div>
                  Are you sure you want to delete this connection and all of its accounts?
                  <Button onClick={() => {this.cancelDeletingConnection()}}>
                    Cancel
                  </Button>
                  <Button onClick={() => {this.confirmDeleteConnection()}}>
                    Delete
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <span>{a.brokerage.name}</span>
                <Button onClick={() => {this.startDeletingConnection(a.id)}}>
                  Delete
                </Button>
              </div>
            )
          }

        </div>
      )
    }
    return (
      <ShadowBox>
        <h2>Connections</h2>
        {authorizations}
        {
          this.state.creatingNewConnection ?
            (
              <div>
                <Button onClick={() => {this.cancelCreatingNewConnection()}}>
                  Cancel
                </Button>
                <AuthorizationPicker />
              </div>
            ) : (
              <div>
                <Button onClick={() => {this.startCreatingNewConnection()}}>
                  New Connection
                </Button>
              </div>
            )
        }
      </ShadowBox>
    )
  }
}

const select = state => ({
  brokerages: selectBrokerages(state),
  authorizations: selectAuthorizations(state),
  accounts: selectAccounts(state),
});
const actions = { reloadAllState: initialLoad, reloadBrokerages: loadBrokerages};

export default connect(select, actions)(ConnectionsManager);
