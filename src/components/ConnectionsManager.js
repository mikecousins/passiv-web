import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import {
  selectBrokerages,
  selectAuthorizations,
  selectIsDemo,
} from '../selectors';
import { selectUserPermissions } from '../selectors/subscription';
import { initialLoad, loadBrokerages } from '../actions';
import AuthorizationPicker from '../components/AuthorizationPicker';
import Connections from './Connections';
import { Button } from '../styled/Button';
import ShadowBox from '../styled/ShadowBox';
import { H2 } from '../styled/GlobalElements';

const ConnectionsManager = ({ reloadAllState, reloadBrokerages }) => {
  const [creatingNewConnection, setCreatingNewConnection] = useState(false);

  const authorizations = useSelector(selectAuthorizations);
  const userPermissions = useSelector(selectUserPermissions);
  const isDemo = useSelector(selectIsDemo);
  const dispatch = useDispatch();

  const startCreatingNewConnection = () => {
    setCreatingNewConnection(true);
  };

  const cancelCreatingNewConnection = () => {
    setCreatingNewConnection(false);
  };

  const canAddMultipleConnections = () => {
    let filtered_permissions = userPermissions.filter(
      permission => permission === 'can_add_multiple_connections',
    );

    if (filtered_permissions.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <ShadowBox>
      <H2>Connections</H2>
      <Connections />

      {creatingNewConnection ? (
        <div>
          <Button
            onClick={() => {
              cancelCreatingNewConnection();
            }}
          >
            Cancel
          </Button>
          {!canAddMultipleConnections() &&
          authorizations &&
          authorizations.length > 0 ? (
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
              if (canAddMultipleConnections()) {
                dispatch(push('/app/settings/connect'));
              } else {
                startCreatingNewConnection();
              }
            }}
            disabled={isDemo}
          >
            {authorizations && authorizations.length > 0
              ? 'Add Another Connection'
              : 'Add a Connection'}
          </Button>
        </div>
      )}
    </ShadowBox>
  );
};

const select = state => ({});
const actions = {
  reloadAllState: initialLoad,
  reloadBrokerages: loadBrokerages,
};

export default connect(
  select,
  actions,
)(ConnectionsManager);
