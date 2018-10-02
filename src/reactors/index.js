import { createSelector } from 'reselect';
import differenceInHours from 'date-fns/difference_in_hours'
import {
  loadCurrencies,
  loadAccounts,
  loadGroups,
  loadSymbols,
  loadBrokerages,
  loadAccount
} from '../actions';

const isNeeded = (entity) => {
  if (!entity) {
    return true;
  }

  if (entity.loading) {
    return false;
  }

  if (!entity.data) {
    return true;
  }

  if (!entity.lastFetch) {
    return true;
  }

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
    if (!token) {
      return;
    }
    if (isNeeded(currencies)) {
      return loadCurrencies(token);
    }
    if (isNeeded(groups)) {
      return loadGroups(token);
    }
    if (isNeeded(accounts)) {
      return loadAccounts(token);
    }
    if (isNeeded(groups)) {
      return loadGroups(token);
    }
    if (isNeeded(brokerages)) {
      return loadBrokerages(token);
    }
    if (isNeeded(symbols)) {
      return loadSymbols(token);
    }
  }
);

export const loadAccountDetails = createSelector(
  [state => state.accounts, state => state.auth.token],
  (accounts, token) => {
    if (!!token && accounts && accounts.data && accounts.data.length > 0) {
      const ids = Array.from(accounts.data, account => account.id);
      return loadAccount({ ids, token });
    }
  }
);
