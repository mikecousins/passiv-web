import { createSelector } from 'reselect';
import ms from 'milliseconds';
import { selectIsEditMode } from './router';
import shouldUpdate from '../reactors/should-update';
import { AppState } from '../store';
import { createMatchSelector, RouterState } from 'connected-react-router';
import { PastValue, Contributions } from '../types/performance';
import { selectState } from '.';

export const selectTotalEquityTimeframe1Y = (state: AppState) =>
  state.totalEquityTimeframe1Y.data;

export const selectTotalEquityTimeframeYTD = (state: AppState) =>
  state.totalEquityTimeframeYTD.data;

export const selectTotalEquityTimeframe30D = (state: AppState) =>
  state.totalEquityTimeframe30D.data;

export const selectContributionTimeframe1Y = (state: AppState) =>
  state.contributionTimeframe1Y.data;

export const selectContributionTimeframeYTD = (state: AppState) =>
  state.contributionTimeframeYTD.data;

export const selectContributionTimeframe30D = (state: AppState) =>
  state.contributionTimeframe30D.data;

export const selectContributions1Y = (state: AppState) =>
  state.contributions1Y.data;

export const selectContributionsYTD = (state: AppState) =>
  state.contributionsYTD.data;

export const selectContributions30D = (state: AppState) =>
  state.contributions30D.data;

export const selectSelectedTimeframe = (state: AppState) =>
  state.selectedTimeframe;

export const selectTotalEquityTimeframe = createSelector<
  AppState,
  AppState,
  string,
  PastValue[] | null
>(selectState, selectSelectedTimeframe, (state, timeframe) => {
  if (timeframe === '1Y') {
    return state.totalEquityTimeframe1Y.data;
  } else if (timeframe === 'YTD') {
    return state.totalEquityTimeframeYTD.data;
  } else if (timeframe === '30D') {
    return state.totalEquityTimeframe30D.data;
  } else {
    return state.totalEquityTimeframe1Y.data;
  }
});

export const selectContributionTimeframe = createSelector<
  AppState,
  AppState,
  string,
  PastValue[] | null
>(selectState, selectSelectedTimeframe, (state, timeframe) => {
  if (timeframe === '1Y') {
    return state.contributionTimeframe1Y.data;
  } else if (timeframe === 'YTD') {
    return state.contributionTimeframeYTD.data;
  } else if (timeframe === '30D') {
    return state.contributionTimeframe30D.data;
  } else {
    return state.contributionTimeframe1Y.data;
  }
});

export const selectContributions = createSelector<
  AppState,
  AppState,
  string,
  Contributions | null
>(selectState, selectSelectedTimeframe, (state, timeframe) => {
  if (timeframe === '1Y') {
    return state.contributions1Y.data;
  } else if (timeframe === 'YTD') {
    return state.contributionsYTD.data;
  } else if (timeframe === '30D') {
    return state.contributions30D.data;
  } else {
    return state.contributions1Y.data;
  }
});
