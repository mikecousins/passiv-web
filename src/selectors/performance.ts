import { createSelector } from 'reselect';
import { AppState } from '../store';
import { PastValue, Contributions } from '../types/performance';
import { selectState } from '.';

export const selectSelectedTimeframe = (state: AppState) =>
  state.selectedTimeframe;

export const selectPerformanceAll = (state: AppState) =>
  state.performanceAll.data;

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
  } else if (timeframe === '30D') {
    return state.performanceAll?.data?.totalEquityTimeframe30D;
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
  } else if (timeframe === '30D') {
    return state.performanceAll?.data?.contributionTimeframe30D;
  } else {
    return state.performanceAll?.data?.contributionTimeframe1Y;
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
  } else if (timeframe === '30D') {
    return state.performanceAll?.data?.contributions30D;
  } else {
    return state.performanceAll?.data?.contributions1Y;
  }
});
