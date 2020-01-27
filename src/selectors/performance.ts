import { createSelector } from 'reselect';
import ms from 'milliseconds';
import { selectIsEditMode } from './router';
import shouldUpdate from '../reactors/should-update';
import { AppState } from '../store';
import { createMatchSelector, RouterState } from 'connected-react-router';

export const selectTotalEquityTimeframe = (state: AppState) =>
  state.totalEquityTimeframe.data;

export const selectContributionTimeframe = (state: AppState) =>
  state.contributionTimeframe.data;

export const selectContributions = (state: AppState) =>
  state.contributions.data;

export const selectSelectedTimeframe = (state: AppState) =>
  state.selectedTimeframe;
