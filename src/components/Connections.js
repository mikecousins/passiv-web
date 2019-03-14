import React from 'react';
import { connect } from 'react-redux';
import { selectAuthorizations } from '../selectors';

import { Table, H3 } from '../styled/GlobalElements';
import { Button } from '../styled/Button';

import ConnectionsAuthorization from './ConnectionsAuthorization';

class Connections extends React.Component {

  render() {

    const { authorizations } = this.props
    if (authorizations){
      return(
        <React.Fragment>
        <Table>
        <div><H3>Brokerage</H3></div>
        <div><H3>Name</H3></div>
        <div><H3>Read</H3></div>
        <div><H3>Trade</H3></div>
        <div><H3>Edit</H3></div>
        </Table>

        {authorizations.map(authorization => (
          <ConnectionsAuthorization key={authorization.id} authorization={authorization}/>
        ))}
        </React.Fragment>
      )
    }else {
      return(<div>Loading....</div>)
    }
  }
}

const select = state => ({
  authorizations: selectAuthorizations(state),
});
const actions = {};

export default connect(select, actions)(Connections);
