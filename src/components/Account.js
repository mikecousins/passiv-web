import React from 'react';
import { connect } from 'react-redux';
import {
  selectBrokerages,
  selectAuthorizations,
  selectGroupsRaw,
} from '../selectors';
import { loadAccounts } from '../actions';
import { putData } from '../api';

import PortfolioGroupPicker from './PortfolioGroupPicker';
import { InputNonFormik } from '../styled/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Table, H3, P, Edit } from '../styled/GlobalElements';
import { Button } from '../styled/Button';
import styled from '@emotion/styled';

const InputContainer = styled.div`
  padding-bottom: 20px;
  font-size: 18px;
`;

const Brokerage = styled.div`
  min-width: 15%;
`;

const Name = styled.div`
  min-width: 20%;
`;

const Number = styled.div`
  min-width: 10%;
  text-align: center;
`;

const Type = styled.div`
  min-width: 10%;
  text-align: center;
`;

const PortfolioGroup = styled.div`
  min-width: 30%;
  text-align: center;
`;

const AccountContainer = styled.div`
  border-top: 1px solid #eee;
  margin-top: 10px;
  padding-top: 10px;
  &:first-of-type {
    border: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

class Account extends React.Component {
  state = {
    nameEditting: false,
    account_name: this.props.account.name,
    portfolioGroupEdit: false,
  };

  onChange = e => this.setState({ account_name: e.target.value });

  onEnter = e => {
    if (e.key === 'Enter') {
      this.finishEditing();
    }
  };

  finishEditing() {
    if (this.state.account_name !== this.props.account.name) {
      let account = Object.assign({}, this.props.account);
      account.name = this.state.account_name;
      putData(`/api/v1/accounts/${account.id}`, account)
        .then(response => {
          this.props.refreshAccounts();
        })
        .catch(error => {
          this.props.refreshAccounts();
        });
    }
    this.setState({ nameEditting: false });
  }

  render() {
    const { account, authorizations, brokerages } = this.props;
    const groups = this.props.groups.data;
    const { nameEditting, account_name, portfolioGroupEdit } = this.state;

    const authorization = authorizations.filter(
      authorization => authorization.id === account.brokerage_authorization,
    )[0];
    const brokerage = brokerages.filter(
      brokerage => brokerage.id === authorization.brokerage.id,
    )[0];

    const formatAccountType = (account, brokerage) => {
      let accountType = '';

      if (brokerage.name === 'Questrade') {
        accountType =
          account.meta.client_account_type + ' ' + account.meta.type;
      } else {
        accountType = account.meta.type;
      }
      return accountType;
    };

    let groupName = '----------------------';
    if (account.portfolio_group) {
      const group = groups.find(group => group.id === account.portfolio_group);
      groupName = group.name;
    }

    return (
      <React.Fragment>
        <AccountContainer>
          <Table>
            <Brokerage>
              <H3>Brokerage</H3>
              <P>{brokerage.name}</P>
            </Brokerage>
            <Name>
              <H3>Name</H3>
              {!nameEditting ? (
                <P>
                  {' '}
                  {account.name}
                  <Edit onClick={() => this.setState({ nameEditting: true })}>
                    <FontAwesomeIcon icon={faPen} />
                    Edit
                  </Edit>
                </P>
              ) : (
                <InputContainer>
                  <InputNonFormik
                    value={account_name}
                    onChange={this.onChange}
                    onKeyPress={this.onEnter}
                  />
                  <Edit onClick={() => this.finishEditing()}>
                    <FontAwesomeIcon icon={faCheck} />
                    Done
                  </Edit>
                </InputContainer>
              )}
            </Name>
            <Number>
              <H3>Number</H3>
              <P> {account.number} </P>
            </Number>
            <Type>
              <H3>Type</H3>
              <P> {formatAccountType(account, brokerage)} </P>
            </Type>
            <PortfolioGroup>
              <H3>Portfolio Group</H3>
              {!portfolioGroupEdit ? (
                <P>
                  {groupName}
                  <Edit
                    onClick={() => this.setState({ portfolioGroupEdit: true })}
                  >
                    <FontAwesomeIcon icon={faPen} />
                    Edit
                  </Edit>
                </P>
              ) : (
                <PortfolioGroupPicker account={account} />
              )}
            </PortfolioGroup>
          </Table>
          {portfolioGroupEdit ? (
            <React.Fragment>
              <H3>
                {' '}
                You're about to change the portfolio group your account is
                linked to. Do you want to continue?{' '}
              </H3>
              <Button>Update</Button>
              <Button
                onClick={() => this.setState({ portfolioGroupEdit: false })}
              >
                Cancel
              </Button>
            </React.Fragment>
          ) : null}
        </AccountContainer>
      </React.Fragment>
    );
  }
}

const select = state => ({
  brokerages: selectBrokerages(state),
  authorizations: selectAuthorizations(state),
  groups: selectGroupsRaw(state),
});

const actions = {
  refreshAccounts: loadAccounts,
};

export default connect(
  select,
  actions,
)(Account);
