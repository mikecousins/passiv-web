import React from 'react';
import { connect } from 'react-redux';
import { selectBrokerages, selectAuthorizations } from '../selectors';
import { selectUserPermissions } from '../selectors/subscription';
import { initialLoad, loadBrokerages } from '../actions';
import AuthorizationPicker from '../components/AuthorizationPicker';
import Connections from './Connections';
import { Button } from '../styled/Button';
import { push } from 'connected-react-router';

import ShadowBox from '../styled/ShadowBox';
import { H2 } from '../styled/GlobalElements';

export class ConnectionsManager extends React.Component {
  state = {
    creatingNewConnection: false,
  };

  startCreatingNewConnection() {
    this.setState({ creatingNewConnection: true });
  }

  cancelCreatingNewConnection() {
    this.setState({ creatingNewConnection: false });
  }

  canAddMultipleConnections = () => {
    let permissions = this.props.userPermissions;
    let filtered_permissions = permissions.filter(
      permission => permission === 'can_add_multiple_connections',
    );

    if (filtered_permissions.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    return (
      <ShadowBox>
        <H2>Connections</H2>
        <Connections />

        {this.state.creatingNewConnection ? (
          <div>
            <Button
              onClick={() => {
                this.cancelCreatingNewConnection();
              }}
            >
              Cancel
            </Button>
            {!this.canAddMultipleConnections() &&
            this.props.authorizations &&
            this.props.authorizations.length > 0 ? (
              <React.Fragment>
                Connecting multiple accounts is only available to Elite
                subscribers. Upgrade your account to continue!
              </React.Fragment>
            ) : (
              <AuthorizationPicker />
            )}
          </div>
        ) : (
          <div>
            <Button
              onClick={() => {
                this.startCreatingNewConnection();
              }}
            >
              {this.props.authorizations && this.props.authorizations.length > 0
                ? 'Add Another Connection'
                : 'Add a Connection'}
            </Button>
          </div>
        )}
      </ShadowBox>
    );
  }
}

const select = state => ({
  brokerages: selectBrokerages(state),
  authorizations: selectAuthorizations(state),
  userPermissions: selectUserPermissions(state),
});
const actions = {
  reloadAllState: initialLoad,
  reloadBrokerages: loadBrokerages,
  push: push,
};

export default connect(
  select,
  actions,
)(ConnectionsManager);
