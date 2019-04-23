import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';
import {
  selectBrokerages,
  selectAuthorizations,
  selectGroups,
} from '../selectors';
import { loadAccounts } from '../actions';
import { putData } from '../api';
import PortfolioGroupPicker from './PortfolioGroupPicker';
import { InputNonFormik } from '../styled/Form';
import { Table, H3, P, Edit } from '../styled/GlobalElements';
import { Button } from '../styled/Button';

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

const Account = ({
  account,
  authorizations,
  brokerages,
  groups,
  refreshAccounts,
}) => {
  const [nameEditing, setNameEditing] = useState(false);
  const [groupEditing, setGroupEditing] = useState(false);
  const [name, setName] = useState(account.name);
  const [group, setGroup] = useState(
    groups.find(group => group.id === account.portfolio_group),
  );
  const [newGroupId, setNewGroupId] = useState(group.id);

  const onEnter = e => {
    if (e.key === 'Enter') {
      setAccountName();
    }
  };

  const setAccountName = () => {
    if (name !== account.name) {
      const newAccount = {
        ...account,
        name,
      };
      putData(`/api/v1/accounts/${account.id}`, newAccount)
        .then(response => {
          refreshAccounts();
        })
        .catch(error => {
          refreshAccounts();
        });
    }
    setNameEditing(false);
  };

  const setPortfolioGroup = () => {
    const newAccount = {
      ...account,
      portfolio_group: newGroupId,
    };
    putData(`/api/v1/account/${account.id}`, newAccount)
      .then(response => {
        refreshAccounts();
      })
      .catch(error => {
        refreshAccounts();
      });
    setGroupEditing(false);
  };

  const authorization = authorizations.find(
    authorization => authorization.id === account.brokerage_authorization,
  );
  const brokerage = brokerages.find(
    brokerage => brokerage.id === authorization.brokerage.id,
  );

  const formatAccountType = (account, brokerage) => {
    let accountType = '';

    if (brokerage.name === 'Questrade') {
      accountType = account.meta.client_account_type + ' ' + account.meta.type;
    } else {
      accountType = account.meta.type;
    }
    return accountType;
  };

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
            {!nameEditing ? (
              <P>
                {' '}
                {account.name}
                <Edit onClick={() => setNameEditing(true)}>
                  <FontAwesomeIcon icon={faPen} />
                  Edit
                </Edit>
              </P>
            ) : (
              <InputContainer>
                <InputNonFormik
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onKeyPress={onEnter}
                />
                <Edit onClick={() => setAccountName()}>
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
            {!groupEditing ? (
              <P>
                {group.name}
                <Edit onClick={() => setGroupEditing(true)}>
                  <FontAwesomeIcon icon={faPen} />
                  Edit
                </Edit>
              </P>
            ) : (
              <PortfolioGroupPicker
                account={account}
                group={newGroupId}
                onChange={e => setNewGroupId(e.target.value)}
              />
            )}
          </PortfolioGroup>
        </Table>
        {groupEditing ? (
          <React.Fragment>
            <H3>
              {' '}
              You're about to change the portfolio group your account is linked
              to. Do you want to continue?{' '}
            </H3>
            <Button onClick={() => setPortfolioGroup()}>Update</Button>
            <Button onClick={() => setGroupEditing(false)}>Cancel</Button>
          </React.Fragment>
        ) : null}
      </AccountContainer>
    </React.Fragment>
  );
};

const select = state => ({
  brokerages: selectBrokerages(state),
  authorizations: selectAuthorizations(state),
  groups: selectGroups(state),
});

const actions = {
  refreshAccounts: loadAccounts,
};

export default connect(
  select,
  actions,
)(Account);
