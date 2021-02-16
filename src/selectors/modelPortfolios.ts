import { createSelector } from 'reselect';
import ms from 'milliseconds';
import shouldUpdate from '../reactors/should-update';
import { selectLoggedIn, selectAppTime, selectRouter } from './index';
import { AppState } from '../store';
import { RouterState } from 'connected-react-router';
import { ModelPortfolioDetailsType } from '../types/modelPortfolio';
import { selectGroupedAccounts } from './groups';

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
    router.location.pathname.split('/')[2] === 'model-portfolio' &&
    router.location.pathname.split('/').length >= 4
  ) {
    mdlPortfolioId = router.location.pathname.split('/')[3];
  }
  return mdlPortfolioId;
});

export const selectCurrentModelPortfolio = createSelector(
  selectCurrentModelPortfolioId,
  selectModelPortfoliosRaw,
  (modelId, models) => {
    let currentModelPortfolio = null;
    if (modelId && models.data) {
      models.data?.map((mdl: ModelPortfolioDetailsType) => {
        if (mdl.model_portfolio.id === modelId) {
          currentModelPortfolio = mdl;
        }
      });
    }
    return currentModelPortfolio;
  },
);

export const selectGroupInfoForModelPortfolio = createSelector(
  selectRouter,
  selectGroupedAccounts,
  (router, groups) => {
    let groupInfo = null;
    const pathName = router.location.pathname.split('/');
    if (
      router &&
      router.location &&
      pathName &&
      (pathName[2] === 'models' || pathName[2] === 'model-portfolio') &&
      (pathName[3] === 'group' || pathName[4] === 'group')
    ) {
      let groupId: any;
      if (pathName[3] === 'group') {
        groupId = pathName[4];
      } else if (pathName[4] === 'group') {
        groupId = pathName[5];
      }
      groupInfo = groups?.find((gp) => gp.groupId === groupId);
    }
    //@ts-ignore
    return { groupInfo, edit: router.location.query.edit };
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
