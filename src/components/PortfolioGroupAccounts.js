import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { H2, H3, ErrorMessage, P } from '../styled/GlobalElements';
import { Button } from '../styled/Button';
import styled from '@emotion/styled';
import ShadowBox from '../styled/ShadowBox';
import AccountHoldings from '../components/AccountHoldings';
import AccountPicker from '../components/AccountPicker';
import { putData } from '../api';
import { selectAccounts } from '../selectors/accounts';
import { selectCanCrossAccountBalance } from '../selectors/subscription';
import { loadAccounts, loadGroups } from '../actions';

export const HoldingsTable = styled.table`
  width: 100%;
  text-align: center;
  margin: 20px 0;
  th {
    text-align: center;
  }
  tr th:first-of-type,
  tr td:first-of-type {
    text-align: left;
  }
  tr th:last-of-type,
  tr td:last-of-type {
    text-align: right;
  }
  td {
    padding: 7px 0;
  }
`;

const ComponentTitle = 'Managed Accounts';

export const PortfolioGroupAccounts = ({
  group,
  accounts,
  allAccounts,
  loading,
  error,
  refreshAccounts,
  refreshGroups,
  canCrossAccountBalance,
}) => {
  const [addAccount, setAddAccount] = useState(false);

  const availableAccounts = () => {
    let results = [];
    allAccounts.map(account => {
      if (accounts.filter(a => a.id === account.id).length === 0) {
        results.push(account);
      }
      return null;
    });
    return results;
  };

  const [newAccountId, setNewAccountId] = useState(availableAccounts()[0].id);

  const setPortfolioGroup = () => {
    let account = allAccounts.find(a => a.id === newAccountId);
    const newAccount = {
      ...account,
      portfolio_group: group.id,
    };
    putData(`/api/v1/accounts/${newAccountId}`, newAccount)
      .then(response => {
        refreshAccounts();
        refreshGroups();
      })
      .catch(error => {
        refreshAccounts();
        refreshGroups();
      });
    setAddAccount(false);
  };

  if (error !== null && accounts.length > 0) {
    return (
      <ShadowBox>
        <H2>{ComponentTitle}</H2>
        <ErrorMessage>
          <H3>Could not load accounts.</H3>
        </ErrorMessage>
      </ShadowBox>
    );
  }

  if (accounts === null) {
    return (
      <React.Fragment>
        <H2>{ComponentTitle}</H2>
        <FontAwesomeIcon icon={faSpinner} spin />
      </React.Fragment>
    );
  }

  let picker = null;

  if (accounts.length === 0) {
    console.log(newAccountId);
    if (addAccount && canCrossAccountBalance) {
      picker = (
        <React.Fragment>
          <P>Select an account to add to this portfolio:</P>
          <AccountPicker
            accounts={availableAccounts()}
            account={newAccountId}
            onChange={e => setNewAccountId(e.target.value)}
          />
          <Button onClick={() => setPortfolioGroup()}>Confirm</Button>
          <Button onClick={() => setAddAccount(false)}>Cancel</Button>
        </React.Fragment>
      );
    } else if (canCrossAccountBalance) {
      picker = (
        <React.Fragment>
          <Button onClick={() => setAddAccount(true)}>
            Add Another Account
          </Button>
        </React.Fragment>
      );
    } else {
      picker = null;
    }

    return (
      <ShadowBox>
        <H2>{ComponentTitle}</H2>
        <ErrorMessage>
          <H3>You do not have any accounts in this portfolio.</H3>
        </ErrorMessage>
        {picker}
      </ShadowBox>
    );
  }

  if (availableAccounts().length === 0) {
    picker = <P>All of your accounts are already managed by this portfolio!</P>;
  } else {
    if (addAccount) {
      picker = (
        <React.Fragment>
          <P>Select an account to add to this portfolio:</P>
          <AccountPicker
            accounts={availableAccounts()}
            account={newAccountId}
            onChange={e => setNewAccountId(e.target.value)}
          />
          <Button onClick={() => setPortfolioGroup()}>Confirm</Button>
          <Button onClick={() => setAddAccount(false)}>Cancel</Button>
        </React.Fragment>
      );
    } else {
      picker = (
        <React.Fragment>
          <Button onClick={() => setAddAccount(true)}>
            Add Another Account
          </Button>
        </React.Fragment>
      );
    }
  }

  return (
    <ShadowBox id="managed-accounts">
      <H2>
        {ComponentTitle} {loading && <FontAwesomeIcon icon={faSpinner} spin />}
      </H2>
      {accounts &&
        accounts.map(account => (
          <AccountHoldings
            account={account}
            key={account.number}
            error={error}
          />
        ))}
      {picker}
    </ShadowBox>
  );
};

const select = state => ({
  allAccounts: selectAccounts(state),
  canCrossAccountBalance: selectCanCrossAccountBalance(state),
});

const actions = {
  refreshAccounts: loadAccounts,
  refreshGroups: loadGroups,
};

export default connect(
  select,
  actions,
)(PortfolioGroupAccounts);
