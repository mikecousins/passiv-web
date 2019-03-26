import React from 'react';
import { connect } from 'react-redux';
import { selectAuthorizations } from '../selectors';

import ConnectionsAuthorization from './ConnectionsAuthorization';

class Connections extends React.Component {

  render() {

    const { authorizations } = this.props

    if (authorizations){
      if (authorizations.length > 0){
        return(
          <React.Fragment>

          {authorizations.map(authorization => (
            <ConnectionsAuthorization key={authorization.id} authorization={authorization}/>
          ))}
          </React.Fragment>
        )} else {
          return(null)
        }
    }else {
      return(null)
    }
  }
}

const select = state => ({
  authorizations: selectAuthorizations(state),
});
const actions = {};

export default connect(select, actions)(Connections);
