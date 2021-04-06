import { createSelector } from 'reselect';
import ms from 'milliseconds';
import { AppState } from '../store';
import { selectLoggedIn, selectAppTime } from '.';
import shouldUpdate from '../reactors/should-update';

export const selectCurrenciesRaw = (state: AppState) => state.currencies;

export const selectCurrencies = createSelector(
  selectCurrenciesRaw,
  (rawCurrencies) => {
    if (rawCurrencies.data) {
      return rawCurrencies.data;
    }
    return null;
  },
);

export const selectCurrenciesNeedData = createSelector(
  selectLoggedIn,
  selectCurrenciesRaw,
  selectAppTime,
  (loggedIn, rawCurrencies, time) => {
    if (!loggedIn) {
      return false;
    }
    return shouldUpdate(rawCurrencies, {
      staleTime: ms.days(1),
      now: time,
    });
  },
);
