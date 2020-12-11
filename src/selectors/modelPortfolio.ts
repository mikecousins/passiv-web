import { createSelector } from 'reselect';
import { selectRouter } from './index';
import { RouterState } from 'connected-react-router';
import { AppState } from '../store';

export const selectModelPortfolioRaw = (state: AppState) => {
  return state.modelPortfolio;
};

export const selectCurrentModelPortfolioId = createSelector<
  AppState,
  RouterState,
  string | null
>(selectRouter, (router) => {
  let mdlPortfolioId = null;
  if (
    router &&
    router.location &&
    router.location.pathname &&
    router.location.pathname.split('/').length >= 4
  ) {
    mdlPortfolioId = router.location.pathname.split('/')[3];
  }
  return mdlPortfolioId;
});

export const selectModelPortfolio = createSelector(
  selectModelPortfolioRaw,
  (rawModelPortfolio) => {
    if (rawModelPortfolio.data) {
      return rawModelPortfolio.data;
    }
    // throw new Error('Unable to fetch model portfolio');
    return null;
  },
);
