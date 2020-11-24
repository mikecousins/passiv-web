import { createSelector } from 'reselect';
import ms from 'milliseconds';
import shouldUpdate from '../reactors/should-update';
import { selectLoggedIn, selectAppTime } from './index';
import { AppState } from '../store';

export const selectModelPortfoliosRaw = (state: AppState) => {
  return state.modelPortfolios;
};

export const selectModelPortfolios = createSelector(
  selectModelPortfoliosRaw,
  (rawModelPortfolios) => {
    if (rawModelPortfolios.data) {
      return rawModelPortfolios.data;
    }
    return [];
  },
);

export const selectModelPortfoliosNeedData = createSelector(
  selectLoggedIn,
  selectModelPortfoliosRaw,
  selectAppTime,
  (loggedIn, rawModelPortfolios, time) => {
    if (!loggedIn) {
      return false;
    }
    return shouldUpdate(rawModelPortfolios, {
      staleTime: ms.minutes(10),
      now: time,
    });
  },
);
