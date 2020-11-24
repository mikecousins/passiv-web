import { createSelector } from 'reselect';
import ms from 'milliseconds';
import shouldUpdate from '../reactors/should-update';
import { selectLoggedIn, selectAppTime } from './index';
import { AppState } from '../store';

export const selectModelPortfolioRaw = (state: AppState) => {
  return state.modelPortfolio;
};

export const selectModelPortfolio = createSelector(
  selectModelPortfolioRaw,
  (rawModelPortfolio) => {
    if (rawModelPortfolio.data) {
      return rawModelPortfolio.data;
    }
    throw new Error('Unable to fetch model portfolio');
  },
);

export const selectModelPortfolioNeedData = createSelector(
  selectLoggedIn,
  selectModelPortfolioRaw,
  selectAppTime,
  (loggedIn, rawModelPortfolio, time) => {
    if (!loggedIn) {
      return false;
    }
    return shouldUpdate(rawModelPortfolio, {
      staleTime: ms.minutes(10),
      now: time,
    });
  },
);
