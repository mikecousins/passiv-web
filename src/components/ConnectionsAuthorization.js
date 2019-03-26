import React from 'react';
import { connect } from 'react-redux';
import { selectAuthorizations } from '../selectors';
import { loadAuthorizations } from '../actions';
import { putData } from '../api';

import { Table, H3, P, Edit } from '../styled/GlobalElements';
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

const Brokerage = styled.div`
  min-width: 22%;
`;

const Name = styled.div`
  min-width: 36%;
`;

const Read = styled.div`
  min-width: 14%;
  text-align: center;
`;

const Trade = styled.div`
  min-width: 14%;
  text-align: center;
`;

const EditToggle = styled.div`
  min-width: 14%;
  text-align: center;
`;

const Connection = styled.div`
  border-top: 1px solid #eee;
  margin-top: 10px;
  padding-top: 10px;
  &:first-of-type {
    border: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const ConnectionActions = styled.div`
  margin: 20px 0 20px;
  background: #deeaff;
  padding: 20px;
  border-radius: 4px;
  h3 {
    line-height: 1.2;
    margin-bottom: 15px;
  }
  div div {
    min-width: 33%;
  }
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
        <Connection>
          <Table>
            <Brokerage>
              <H3>Brokerage</H3>
              <P>{authorization.brokerage.name}</P>
            </Brokerage>
            <Name>
              <H3>Name</H3>
              {!nameEditting? (
                  <P>
                    {authorization_name}
                    <Edit onClick={() => this.setState({nameEditting:true})}>
                      <FontAwesomeIcon icon={faPen}/>Edit
                    </Edit>
                  </P>
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
            </Name>
            <Read>
              <H3>Read</H3>
              <P> {authorization.type==="read"||authorization.type==="trade"?
                    <FontAwesomeIcon icon={faCheck} />:
                    <FontAwesomeIcon icon={faTimes} />}
              </P>
            </Read>
            <Trade>
              <H3>Trade</H3>
              <P> {authorization.type==="trade"?
                  <FontAwesomeIcon icon={faCheck} />:
                  <FontAwesomeIcon icon={faTimes} />}
              </P>
            </Trade>
            <EditToggle>
              <H3>Edit</H3>
              <FontAwesomeIcon icon={this.state.showMore ? faSortUp : faSortDown}
              onClick={() => this.setState({showMore: !this.state.showMore})}/>
            </EditToggle>
          </Table>
        </Connection>

        {showMore ? (
          <ConnectionActions>
            <Table>
              <ConnectionAccounts authorizationId={authorization.id}/>
              <ConnectionUpdate authorization={authorization}/>
              <ConnectionDelete authorization={authorization}/>
            </Table>
          </ConnectionActions>
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
