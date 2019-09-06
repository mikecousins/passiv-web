import { createSelector } from 'reselect';
import ms from 'milliseconds';
import shouldUpdate from '../reactors/should-update';
import {
  selectLoggedIn,
  selectAppTime,
  selectCurrencies,
  selectCurrencyRates,
} from './index';
import { AppState } from '../store';
import { Balance } from '../types/groupInfo';
import { SimpleListState } from '../reducers/simpleList';
import { selectPathname } from './router';
import { Currency } from '../types/currency';
import { CurrencyRate } from '../types/currencyRate';
import { Position } from '../types/account';

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

export const selectCurrentAccountId = createSelector<
  AppState,
  string,
  string | null
>(
  selectPathname,
  pathname => {
    let accountId = null;
    if (pathname && pathname.split('/').length >= 6) {
      accountId = pathname.split('/')[5];
    }
    return accountId;
  },
);

export const selectCurrentAccountBalances = createSelector<
  AppState,
  string | null,
  SimpleListState<Balance[]>,
  Balance[] | null
>(
  selectCurrentAccountId,
  selectAccountBalances,
  (accountId, allBalances) => {
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
  },
);

export const selectAccountPositions = (state: AppState) =>
  state.accountPositions;

export const selectCurrentAccountPositions = createSelector<
  AppState,
  string | null,
  SimpleListState<Position[]>,
  Position[] | null
>(
  selectCurrentAccountId,
  selectAccountPositions,
  (accountId, allPositions) => {
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
  },
);

export const selectCurrentAccountBalancedEquity = createSelector(
  selectCurrentAccountPositions,
  selectCurrencies,
  selectCurrencyRates,
  (positions, currencies, rates) => {
    if (!positions || !currencies || !rates) {
      return null;
    }
    let total = 0;
    positions.forEach(position => {
      // convert to CAD for now
      const preferredCurrency = currencies.find(
        currency => currency.code === 'CAD',
      );
      if (!preferredCurrency) {
        return;
      }
      if (position.symbol.symbol.currency === preferredCurrency.id) {
        total += position.units * position.price;
      } else {
        const conversionRate = rates.find(
          rate =>
            rate.src.id === position.symbol.symbol.currency &&
            rate.dst.id === preferredCurrency.id,
        );
        if (!conversionRate) {
          return;
        }
        total += position.units * position.price * conversionRate.exchange_rate;
      }
    });
    return total;
  },
);

export const selectCurrentAccountCash = createSelector<
  AppState,
  Balance[] | null,
  Currency[] | null,
  CurrencyRate[] | null,
  number | null
>(
  selectCurrentAccountBalances,
  selectCurrencies,
  selectCurrencyRates,
  (balances, currencies, rates) => {
    if (balances && currencies) {
      let cash = 0;
      balances.forEach(balance => {
        // convert to CAD for now
        const preferredCurrency = currencies.find(
          currency => currency.code === 'CAD',
        );
        if (!preferredCurrency) {
          return;
        }
        // const preferredCurrency = groupInfo[group.id].data.preferredCurrency;
        if (balance.currency.id === preferredCurrency.id) {
          cash += balance.cash;
        } else {
          if (!rates) {
            return;
          }
          const conversionRate = rates.find(
            rate =>
              rate.src.id === balance.currency.id &&
              rate.dst.id === preferredCurrency.id,
          );
          if (!conversionRate) {
            return;
          }
          cash += balance.cash * conversionRate.exchange_rate;
        }
      });
      return cash;
    } else {
      return null;
    }
  },
);

export const selectCurrentAccountTotalEquity = createSelector(
  selectCurrentAccountCash,
  selectCurrentAccountBalancedEquity,
  (cash, balancedEquity) => {
    if (cash !== null && balancedEquity !== null) {
      return cash + balancedEquity;
    } else {
      return null;
    }
  },
);
