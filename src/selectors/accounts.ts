import { createSelector } from 'reselect';
import ms from 'milliseconds';
import shouldUpdate from '../reactors/should-update';
import { selectLoggedIn, selectAppTime } from './index';
import { AppState } from '../store';

export const selectAccountsRaw = (state: AppState) => state.accounts;

export const selectAccounts = createSelector(
  selectAccountsRaw,
  rawAccounts => {
    if (rawAccounts.data) {
      return rawAccounts.data;
    }
    return [];
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

export const selectAccountBalances = (state: AppState) => state.accountBalances;

export const selectAccountPositions = (state: AppState) =>
  state.accountPositions;
