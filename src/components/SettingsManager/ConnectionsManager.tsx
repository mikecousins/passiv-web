import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { selectAuthorizations, selectIsDemo } from '../../selectors';
import { selectUserPermissions } from '../../selectors/subscription';
import AuthorizationPicker from './../AuthorizationPicker';
import Connections from './../Connections';
import { Button } from '../../styled/Button';
import ShadowBox from '../../styled/ShadowBox';
import { H2 } from '../../styled/GlobalElements';

const ConnectionsManager = () => {
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
    if (!userPermissions) {
      return false;
    }
    return userPermissions.some(
      (permission) => permission === 'can_add_multiple_connections',
    );
  };

  return (
    <ShadowBox className="tour-edit-connections">
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
              if (
                !authorizations ||
                authorizations.length === 0 ||
                canAddMultipleConnections()
              ) {
                dispatch(push('/app/settings/connect'));
              } else {
                startCreatingNewConnection();
              }
            }}
            disabled={isDemo}
            className="tour-add-more-connections"
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

export default ConnectionsManager;
