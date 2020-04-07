import { createSelector } from 'reselect';
import ms from 'milliseconds';
import shouldUpdate from '../reactors/should-update';
import { selectLoggedIn, selectAppTime } from './index';
import { AppState } from '../store';
import { Balance } from '../types/groupInfo';
import { SimpleListState } from '../reducers/simpleList';
import { selectPathname } from './router';
import { Position } from '../types/account';

export const selectAccountsRaw = (state: AppState) => state.accounts;

export const selectAccounts = createSelector(
  selectAccountsRaw,
  (rawAccounts) => {
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

export const selectCurrentAccountId = createSelector<
  AppState,
  string,
  string | null
>(selectPathname, (pathname) => {
  let accountId = null;
  if (pathname && pathname.split('/').length >= 6) {
    accountId = pathname.split('/')[5];
  }
  return accountId;
});

export const selectCurrentAccountBalances = createSelector<
  AppState,
  string | null,
  SimpleListState<Balance[]>,
  Balance[] | null
>(selectCurrentAccountId, selectAccountBalances, (accountId, allBalances) => {
  let balances = null;
  if (
    accountId &&
    allBalances &&
    allBalances[accountId] &&
    allBalances[accountId].data
  ) {
    balances = allBalances[accountId].data;
  }
  return balances;
});

export const selectAccountPositions = (state: AppState) =>
  state.accountPositions;

export const selectCurrentAccountPositions = createSelector<
  AppState,
  string | null,
  SimpleListState<Position[]>,
  Position[] | null
>(selectCurrentAccountId, selectAccountPositions, (accountId, allPositions) => {
  let positions = null;
  if (
    accountId &&
    allPositions &&
    allPositions[accountId] &&
    allPositions[accountId].data
  ) {
    positions = allPositions[accountId].data;
  }
  return positions;
});

export const selectCurrentAccountPositionsError = createSelector<
  AppState,
  string | null,
  SimpleListState<Position[]>,
  boolean
>(selectCurrentAccountId, selectAccountPositions, (accountId, allPositions) => {
  let error = false;
  if (
    accountId &&
    allPositions &&
    allPositions[accountId] &&
    allPositions[accountId].lastError
  ) {
    error = true;
  }
  return error;
});
