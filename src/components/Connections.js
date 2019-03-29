import React from 'react';
import { connect } from 'react-redux';
import { selectAuthorizations } from '../selectors';
import ConnectionsAuthorization from './ConnectionsAuthorization';

export const Connections = ({ authorizations }) => {
  if (!authorizations || authorizations.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      {authorizations.map(authorization => (
        <ConnectionsAuthorization
          key={authorization.id}
          authorization={authorization}
        />
      ))}
    </React.Fragment>
  );
};

const select = state => ({
  authorizations: selectAuthorizations(state),
});

export default connect(select)(Connections);
