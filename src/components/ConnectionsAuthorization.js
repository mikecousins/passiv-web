import React from 'react';
import { connect } from 'react-redux';
import { selectAuthorizations } from '../selectors';
import { loadAuthorizations } from '../actions';
import { putData } from '../api';

import { Table, H3, Edit } from '../styled/GlobalElements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faSortDown, faSortUp, faPen } from '@fortawesome/free-solid-svg-icons';
import { InputNonFormik } from '../styled/Form';
import styled from '@emotion/styled';

import ConnectionAccounts from './ConnectionAccounts';
import ConnectionUpdate from './ConnectionUpdate';
import ConnectionDelete from './ConnectionDelete';

const InputContainer = styled.div`
  padding-bottom: 20px;
  font-size: 18px;
`;

class ConnectionsAuthorization extends React.Component {
  state = {
    showMore : false,
    nameEditting: false,
    authorization_name:this.props.authorization.name
  }

  onChange = (e) => this.setState({authorization_name:e.target.value})

  onEnter = (e) => {
    if (e.key === 'Enter') {
      this.finishEditing();
    }
  }


  finishEditing() {
    if (this.state.authorization_name !== this.props.authorization.name) {
      let authorization = Object.assign({}, this.props.authorization);
      authorization.name = this.state.authorization_name;
      putData(`/api/v1/authorizations/${authorization.id}`,authorization)
        .then(response => {
          this.props.refreshAuthorizations();
        })
        .catch(error => {
          this.props.refreshAuthorizations();
        });
    }
    this.setState({nameEditting: false});
  }

  render () {
    this.onEnter({e:{key:'Enter'}})
    const { authorization } = this.props
    const {showMore, nameEditting, authorization_name} = this.state

    return (
      <React.Fragment>
        <Table>
            <H3>{authorization.brokerage.name}</H3>
            {!nameEditting? (
                <H3>
                  {authorization_name}
                  <Edit onClick={() => this.setState({nameEditting:true})}>
                    <FontAwesomeIcon icon={faPen}/>Edit
                  </Edit>
                </H3>
            ):
            (
              <InputContainer>
                <InputNonFormik
                  value={authorization_name}
                  onChange={this.onChange}
                  onKeyPress={this.onEnter}
                />
                <Edit onClick={() => this.finishEditing()}>
                <FontAwesomeIcon icon={faCheck}/>Done
                </Edit>
              </InputContainer>
            )
            }
            <H3> {authorization.type==="read"||authorization.type==="trade"?
                  <FontAwesomeIcon icon={faCheck} />:
                  <FontAwesomeIcon icon={faTimes} />}
            </H3>
            <H3> {authorization.type==="trade"?
                <FontAwesomeIcon icon={faCheck} />:
                <FontAwesomeIcon icon={faTimes} />}
            </H3>
              <FontAwesomeIcon icon={this.state.showMore ? faSortUp : faSortDown}
              onClick={() => this.setState({showMore: !this.state.showMore})}/>

        </Table>

        {showMore ? (
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
const actions = {
  refreshAuthorizations: loadAuthorizations
};

export default connect(select, actions)(ConnectionsAuthorization);
