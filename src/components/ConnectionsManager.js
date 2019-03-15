import React from 'react';
import { connect } from 'react-redux';
import { selectBrokerages, selectAuthorizations, selectAccounts } from '../selectors';
import { initialLoad, loadBrokerages } from '../actions';
import { deleteData } from '../api';
import AuthorizationPicker from '../components/AuthorizationPicker';
import Connections from './Connections'
import { Button } from '../styled/Button';

import ShadowBox from '../styled/ShadowBox';
import { H2 } from '../styled/GlobalElements';

export class ConnectionsManager extends React.Component {
  state = {
    creatingNewConnection: false,
  }

  startCreatingNewConnection() {
    this.setState({creatingNewConnection: true});
  }

  cancelCreatingNewConnection() {
    this.setState({creatingNewConnection: false});
  }

  render() {

    return (
      <ShadowBox>
        <H2>Connections</H2>
        <Connections/>

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
