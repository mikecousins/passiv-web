import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons';
import { selectBrokerages, selectAuthorizations } from '../../selectors';
import { selectGroups } from '../../selectors/groups';
import { loadAccounts, loadGroups } from '../../actions';
import { putData } from '../../api';
import PortfolioGroupPicker from '../PortfolioGroupPicker';
import { InputNonFormik } from '../../styled/Form';
import { Table, H3, P, Edit, A } from '../../styled/GlobalElements';
import { Button } from '../../styled/Button';
import { push } from 'connected-react-router';
import { selectCanCrossAccountBalance } from '../../selectors/subscription';
import {
  AccountContainer,
  Brokerage,
  Name,
  InputContainer,
  Number,
  Type,
  PortfolioGroup,
} from './styles';

export const Account = ({
  account,
  authorizations,
  brokerages,
  groups,
  refreshAccounts,
  refreshGroups,
  canCrossAccountBalance,
  push,
}) => {
  const [nameEditing, setNameEditing] = useState(false);
  const [groupEditing, setGroupEditing] = useState(false);
  const [name, setName] = useState(account.name);
  const [newGroupId, setNewGroupId] = useState();
  let group = null;
  if (groups !== undefined && groups !== null) {
    group = groups.find(group => group.id === account.portfolio_group);
  }
  if (group && !newGroupId) {
    setNewGroupId(group.id);
  }

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
          refreshGroups();
        })
        .catch(error => {
          refreshAccounts();
          refreshGroups();
        });
    }
    setNameEditing(false);
  };

  const setPortfolioGroup = () => {
    const newAccount = {
      ...account,
      portfolio_group: newGroupId,
    };
    putData(`/api/v1/accounts/${account.id}`, newAccount)
      .then(response => {
        refreshAccounts();
        refreshGroups();
      })
      .catch(error => {
        refreshAccounts();
        refreshGroups();
      });
    setGroupEditing(false);
  };

  let brokerageName = '';
  if (authorizations && brokerages) {
    if (!authorizations) {
      return null;
    } else if (!authorizations.length === 0) {
      return null;
    }

    const authorization = authorizations.find(
      authorization => authorization.id === account.brokerage_authorization,
    );

    if (!authorization) {
      return null;
    }

    const brokerage = brokerages.find(
      brokerage => brokerage.id === authorization.brokerage.id,
    );

    if (brokerage) {
      brokerageName = brokerage.name;
    }
  }

  const formatAccountType = (account, brokerageName) => {
    let accountType = '';
    if (brokerageName === 'Questrade') {
      accountType = account.meta.client_account_type + ' ' + account.meta.type;
    } else {
      accountType = account.meta.type;
    }
    return accountType;
  };

  let editingFooter = (
    <React.Fragment>
      <H3>
        &nbsp; You're about to change the portfolio group your account is linked
        to. Do you want to continue? &nbsp;
      </H3>
      <Button onClick={() => setPortfolioGroup()}>Update</Button>
      <A onClick={() => setGroupEditing(false)}>Cancel</A>
    </React.Fragment>
  );
  if (!canCrossAccountBalance) {
    editingFooter = (
      <React.Fragment>
        <Button onClick={() => setGroupEditing(false)}>Cancel</Button>
        <React.Fragment>
          Modifying portfolio groups is only available to Elite subscribers.
          Upgrade your account to access this feature!
        </React.Fragment>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <AccountContainer>
        <Table>
          <Brokerage>
            <H3>Brokerage</H3>
            <P>{brokerageName}</P>
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
            <P> {formatAccountType(account, brokerageName)} </P>
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
                disabled={!canCrossAccountBalance}
              />
            )}
          </PortfolioGroup>
        </Table>
        {groupEditing && editingFooter}
      </AccountContainer>
    </React.Fragment>
  );
};

const select = state => ({
  brokerages: selectBrokerages(state),
  authorizations: selectAuthorizations(state),
  groups: selectGroups(state),
  canCrossAccountBalance: selectCanCrossAccountBalance(state),
});

const actions = {
  refreshAccounts: loadAccounts,
  refreshGroups: loadGroups,
  push: push,
};

export default connect(
  select,
  actions,
)(Account);
