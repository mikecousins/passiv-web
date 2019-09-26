import React from 'react';
import { useSelector } from 'react-redux';
import { selectAuthorizations } from '../selectors';
import ConnectionsAuthorization from './ConnectionsAuthorization';

export const Connections = () => {
  const authorizations = useSelector(selectAuthorizations);
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

export default Connections;
