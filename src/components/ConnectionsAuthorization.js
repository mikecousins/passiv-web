import React from 'react';
import { connect } from 'react-redux';
import { selectAuthorizations } from '../selectors';
import { Table, H3 } from '../styled/GlobalElements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faSortDown } from '@fortawesome/free-solid-svg-icons';

import ConnectionAccounts from './ConnectionAccounts';
import ConnectionUpdate from './ConnectionUpdate';
import ConnectionDelete from './ConnectionDelete';

class ConnectionsAuthorization extends React.Component {
  state = {
    isEditting : false,
  }

  render () {

    const { authorization } = this.props
    const {isEditting} = this.state

    return (
      <React.Fragment>
        <Table>
            <H3>{authorization.brokerage.name}</H3>
            <H3> {authorization.name} </H3>
            <H3> {authorization.type==="read"||authorization.type==="trade"?
                  <FontAwesomeIcon icon={faCheck} />:
                  <FontAwesomeIcon icon={faTimes} />}
            </H3>
            <H3> {authorization.type==="trade"?
                <FontAwesomeIcon icon={faCheck} />:
                <FontAwesomeIcon icon={faTimes} />}
            </H3>
              <FontAwesomeIcon icon={faSortDown}
              onClick={() => this.setState({isEditting: !this.state.isEditting})}/>

        </Table>

        {isEditting ? (
          <Table>
            <ConnectionAccounts authorizationId={authorization.id}/>
            <ConnectionUpdate authorization={authorization}/>
            <ConnectionDelete authorization={authorization}/>
          </Table>
        ): null}
      </React.Fragment>
    )
  }
}

const select = state => ({
  authorizations: selectAuthorizations(state),
});
const actions = {};

export default connect(select, actions)(ConnectionsAuthorization);
