import { createSelector } from 'reselect';
import differenceInHours from 'date-fns/difference_in_hours'
import {
  initialLoad,
  loadAccounts,
  loadGroups,
  loadSymbols,
  loadBrokerages,
  loadAccount
} from '../actions';

const isNeeded = (entity) => {
  // if we don't have the entity at all we need it
  if (!entity) {
    return true;
  }

  // if the entity request is in progress don't need it
  if (entity.loading) {
    return false;
  }

  // if we don't have data we need it
  if (!entity.data) {
    return true;
  }

  // if we haven't fetched yet we need it
  if (!entity.lastFetch) {
    return true;
  }

  // if the data is old we need it
  if (differenceInHours(entity.lastFetch, Date.now) > 1) {
    return true;
  }

  return false;
}

export const loadData = createSelector(
  [state => state.auth.token,
  state => state.currencies,
  state => state.accounts,
  state => state.groups, 
  state => state.brokerages,
  state => state.symbols],
  (token, currencies, accounts, groups, brokerages, symbols) => {
    // ignore if we aren't logged in
    if (!token) {
      return;
    }

    // if we need currencies we need everything, perform a full load
    if (isNeeded(currencies)) {
      return initialLoad(token);
    }

    if (isNeeded(symbols)) {
      return loadSymbols(token);
    }

    if (isNeeded(brokerages)) {
      return loadBrokerages(token);
    }

    if (isNeeded(groups)) {
      return loadGroups(token);
    }

    if (isNeeded(accounts)) {
      return loadAccounts(token);
    }
  }
);

export const loadAccountDetails = createSelector(
  [state => state.accounts,
  state => state.accountDetails,
  state => state.auth.token],
  (accounts, accountDetails, token) => {
    if (!!token && accounts && accounts.data && accounts.data.length > 0) {
      const ids = Array.from(accounts.data, account => account.id);
      if (isNeeded(accountDetails))
      return loadAccount({ ids, token });
    }
  }
);
