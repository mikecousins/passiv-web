import { createSelector } from 'reselect';
import { AppState } from '../store';
import {
  PastValue,
  Contributions,
  PerformanceData,
  AdjustedCostBasis,
  Dividends,
} from '../types/performance';
import { selectState } from '.';
import {
  selectPerformancePageFeature,
  selectAdjustedCostBasisFeature,
} from './features';
import { selectLoggedIn, selectAppTime } from './index';
import { SimpleState } from '../types/common';
import shouldUpdate from '../reactors/should-update';
import ms from 'milliseconds';

export const selectSelectedTimeframe = (state: AppState) =>
  state.selectedTimeframe;

export const selectPerformanceAll = (state: AppState) => state.performanceAll;

export const selectAdjustedCostBasis = (state: AppState) =>
  state.performanceACB;

export const selectBadTickers = (state: AppState) =>
  state.performanceAll?.data?.badTickers;

export const selectPerformanceNeedData = createSelector<
  AppState,
  boolean,
  SimpleState<PerformanceData>,
  boolean,
  number,
  boolean
>(
  selectLoggedIn,
  selectPerformanceAll,
  selectPerformancePageFeature,
  selectAppTime,
  (loggedIn, performanceAll, performanceFeature, time) => {
    if (!loggedIn || !performanceFeature) {
      return false;
    }
    return shouldUpdate(performanceAll, {
      staleTime: ms.days(1),
      now: time,
    });
  },
);

export const selectACBNeedData = createSelector<
  AppState,
  boolean,
  SimpleState<AdjustedCostBasis[]>,
  boolean,
  number,
  boolean
>(
  selectLoggedIn,
  selectAdjustedCostBasis,
  selectAdjustedCostBasisFeature,
  selectAppTime,
  (loggedIn, performanceAcb, adjustedCostBasisFeature, time) => {
    if (!loggedIn || !adjustedCostBasisFeature) {
      return false;
    }
    return shouldUpdate(performanceAcb, {
      staleTime: ms.days(1),
      now: time,
    });
  },
);

export const selectDividends = createSelector<
  AppState,
  AppState,
  string,
  Dividends[] | undefined
>(selectState, selectSelectedTimeframe, (state, timeframe) => {
  if (timeframe === '1Y') {
    return state.performanceAll?.data?.dividends1Y;
  } else if (timeframe === 'YTD') {
    return state.performanceAll?.data?.dividendsYTD;
  } else if (timeframe === 'ALL') {
    return state.performanceAll?.data?.dividendsALL;
  } else {
    return state.performanceAll?.data?.dividends1Y;
  }
});

export const selectDividendIncome = createSelector<
  AppState,
  AppState,
  string,
  number | undefined
>(selectState, selectSelectedTimeframe, (state, timeframe) => {
  if (timeframe === '1Y') {
    return state.performanceAll?.data?.dividendIncome1Y;
  } else if (timeframe === 'YTD') {
    return state.performanceAll?.data?.dividendIncomeYTD;
  } else if (timeframe === 'ALL') {
    return state.performanceAll?.data?.dividendIncomeALL;
  } else {
    return state.performanceAll?.data?.dividendIncome1Y;
  }
});

export const selectTotalEquityTimeframe = createSelector<
  AppState,
  AppState,
  string,
  PastValue[] | undefined
>(selectState, selectSelectedTimeframe, (state, timeframe) => {
  if (timeframe === '1Y') {
    return state.performanceAll?.data?.totalEquityTimeframe1Y;
  } else if (timeframe === 'YTD') {
    return state.performanceAll?.data?.totalEquityTimeframeYTD;
  } else if (timeframe === 'ALL') {
    return state.performanceAll?.data?.totalEquityTimeframeALL;
  } else {
    return state.performanceAll?.data?.totalEquityTimeframe1Y;
  }
});

export const selectContributionTimeframe = createSelector<
  AppState,
  AppState,
  string,
  PastValue[] | undefined
>(selectState, selectSelectedTimeframe, (state, timeframe) => {
  if (timeframe === '1Y') {
    return state.performanceAll?.data?.contributionTimeframe1Y;
  } else if (timeframe === 'YTD') {
    return state.performanceAll?.data?.contributionTimeframeYTD;
  } else if (timeframe === 'ALL') {
    return state.performanceAll?.data?.contributionTimeframeALL;
  } else {
    return state.performanceAll?.data?.contributionTimeframe1Y;
  }
});

export const selectContributionTimeframeCumulative = createSelector<
  AppState,
  AppState,
  string,
  PastValue[] | undefined
>(selectState, selectSelectedTimeframe, (state, timeframe) => {
  if (timeframe === '1Y') {
    return state.performanceAll?.data?.contributionTimeframeCumulative1Y;
  } else if (timeframe === 'YTD') {
    return state.performanceAll?.data?.contributionTimeframeCumulativeYTD;
  } else if (timeframe === 'ALL') {
    return state.performanceAll?.data?.contributionTimeframeCumulativeALL;
  } else {
    return state.performanceAll?.data?.contributionTimeframeCumulative1Y;
  }
});

export const selectWithdrawalTimeframe = createSelector<
  AppState,
  AppState,
  string,
  PastValue[] | undefined
>(selectState, selectSelectedTimeframe, (state, timeframe) => {
  if (timeframe === '1Y') {
    return state.performanceAll?.data?.withdrawalTimeframe1Y;
  } else if (timeframe === 'YTD') {
    return state.performanceAll?.data?.withdrawalTimeframeYTD;
  } else if (timeframe === 'ALL') {
    return state.performanceAll?.data?.withdrawalTimeframeALL;
  } else {
    return state.performanceAll?.data?.withdrawalTimeframe1Y;
  }
});

export const selectContributions = createSelector<
  AppState,
  AppState,
  string,
  Contributions | undefined
>(selectState, selectSelectedTimeframe, (state, timeframe) => {
  if (timeframe === '1Y') {
    return state.performanceAll?.data?.contributions1Y;
  } else if (timeframe === 'YTD') {
    return state.performanceAll?.data?.contributionsYTD;
  } else if (timeframe === 'ALL') {
    return state.performanceAll?.data?.contributionsALL;
  } else {
    return state.performanceAll?.data?.contributions1Y;
  }
});

export const selectContributionStreak = createSelector<
  AppState,
  AppState,
  string,
  number | undefined
>(selectState, selectSelectedTimeframe, (state, timeframe) => {
  if (timeframe === '1Y') {
    return state.performanceAll?.data?.contributionStreak1Y;
  } else if (timeframe === 'YTD') {
    return state.performanceAll?.data?.contributionStreakYTD;
  } else if (timeframe === 'ALL') {
    return state.performanceAll?.data?.contributionStreakALL;
  } else {
    return state.performanceAll?.data?.contributionStreak1Y;
  }
});

export const selectContributionMonthsContributed = createSelector<
  AppState,
  AppState,
  string,
  number | undefined
>(selectState, selectSelectedTimeframe, (state, timeframe) => {
  if (timeframe === '1Y') {
    return state.performanceAll?.data?.contributionMonthsContributed1Y;
  } else if (timeframe === 'YTD') {
    return state.performanceAll?.data?.contributionMonthsContributedYTD;
  } else if (timeframe === 'ALL') {
    return state.performanceAll?.data?.contributionMonthsContributedALL;
  } else {
    return state.performanceAll?.data?.contributionMonthsContributed1Y;
  }
});

export const selectContributionMonthsTotal = createSelector<
  AppState,
  AppState,
  string,
  number | undefined
>(selectState, selectSelectedTimeframe, (state, timeframe) => {
  if (timeframe === '1Y') {
    return state.performanceAll?.data?.contributionTotalMonths1Y;
  } else if (timeframe === 'YTD') {
    return state.performanceAll?.data?.contributionTotalMonthsYTD;
  } else if (timeframe === 'ALL') {
    return state.performanceAll?.data?.contributionTotalMonthsALL;
  } else {
    return state.performanceAll?.data?.contributionTotalMonths1Y;
  }
});
