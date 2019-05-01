import { createSelector } from 'reselect';
import ms from 'milliseconds';
import shouldUpdate from '../reactors/should-update';
import { selectLoggedIn, selectAppTime } from './index';

export const selectAccountsRaw = state => state.accounts;

export const selectAccounts = createSelector(
  selectAccountsRaw,
  rawAccounts => {
    if (rawAccounts.data) {
      return rawAccounts.data;
    }
  },
);

export const selectAccountsNeedData = createSelector(
  selectLoggedIn,
  selectAccountsRaw,
  selectAppTime,
  (loggedIn, rawAccounts, time) => {
    if (!loggedIn) {
      return false;
    }
    return shouldUpdate(rawAccounts, {
      staleTime: ms.minutes(10),
      now: time,
    });
  },
);

export const selectAccountBalances = state => state.accountBalances;

export const selectAccountPositions = state => state.accountPositions;
