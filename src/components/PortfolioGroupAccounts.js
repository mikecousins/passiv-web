import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { H2, H3, ErrorMessage, P } from '../styled/GlobalElements';
import { Button } from '../styled/Button';
import styled from '@emotion/styled';
import ShadowBox from '../styled/ShadowBox';
import AccountHoldings from './AccountHoldings';
import AccountPicker from './AccountPicker';
import { putData } from '../api';
import { selectAccounts } from '../selectors/accounts';
import { selectCanCrossAccountBalance } from '../selectors/subscription';
import { loadAccounts, loadGroups } from '../actions';
import { push } from 'connected-react-router';

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

export const PortfolioGroupAccounts = ({
  group,
  accounts,
  allAccounts,
  canCrossAccountBalance,
  loading,
  error,
  refreshAccounts,
  refreshGroups,
  push,
}) => {
  const [addAccount, setAddAccount] = useState(false);
  const [newAccountId, setNewAccountId] = useState();

  const availableAccounts = [];
  allAccounts.forEach(account => {
    if (!accounts.some(a => a.id === account.id)) {
      availableAccounts.push(account);
    }
  });

  const setPortfolioGroup = () => {
    const account = allAccounts.find(a => a.id === newAccountId);
    if (!account) {
      return;
    }
    const newAccount = {
      ...account,
      portfolio_group: group.id,
    };
    putData(`/api/v1/accounts/${newAccountId}`, newAccount)
      .then(() => {
        refreshAccounts();
        refreshGroups();
      })
      .catch(() => {
        refreshAccounts();
        refreshGroups();
      });
    setAddAccount(false);
  };

  // show an error message if we get an error
  if (error && accounts.length > 0) {
    return (
      <ShadowBox>
        <H2>Managed Accounts</H2>
        <ErrorMessage>
          <H3>Could not load accounts.</H3>
        </ErrorMessage>
      </ShadowBox>
    );
  }

  // show a spinner if we're loading still
  if (!accounts || !allAccounts) {
    return (
      <ShadowBox>
        <H2>Managed Accounts</H2>
        <FontAwesomeIcon icon={faSpinner} spin />
      </ShadowBox>
    );
  }

  let content = accounts.map(account => (
    <AccountHoldings account={account} key={account.number} error={error} />
  ));
  let picker = null;

  // no accounts in this portfolio
  if (accounts.length === 0) {
    content = (
      <ErrorMessage>
        <H3>You do not have any accounts in this portfolio.</H3>
      </ErrorMessage>
    );
  }

  if (availableAccounts.length === 0) {
    picker = <P>All of your accounts are already managed by this portfolio!</P>;
  } else {
    if (addAccount) {
      if (canCrossAccountBalance) {
        // select the first item if it's unselected currently
        if (!newAccountId) {
          setNewAccountId(availableAccounts[0].id);
        }
        picker = (
          <React.Fragment>
            <P>Select an account to add to this portfolio:</P>
            <AccountPicker
              accounts={availableAccounts}
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
            <Button onClick={() => setAddAccount(false)}>Cancel</Button>
            <Button onClick={() => push('/app/settings')}>Upgrade</Button>
            <React.Fragment>
              Modifying portfolio groups is only available to Elite subscribers.
              Upgrade your account to continue!
            </React.Fragment>
          </React.Fragment>
        );
      }
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
    <ShadowBox>
      <H2>
        Managed Accounts {loading && <FontAwesomeIcon icon={faSpinner} spin />}
      </H2>
      {content}
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
  push: push,
};

export default connect(
  select,
  actions,
)(PortfolioGroupAccounts);
