import { createSelector } from 'reselect';
import { loadInitialData, loadAccount } from '../actions';

export const loadData = createSelector(
  [state => state.auth.token],
  (token) => {
    if (!!token) {
      return loadInitialData(token);
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
