import { createSelector } from 'reselect';
import { AppState } from '../store';
import { selectLoggedIn, selectAppTime } from './index';
import { SimpleState } from '../types/common';
import shouldUpdate from '../reactors/should-update';
import ms from 'milliseconds';
import { Goal } from '../types/goals';

export const selectGoals = (state: AppState) => state.goals;

export const selectGoalsNeedData = createSelector<
  AppState,
  boolean,
  SimpleState<Goal[]>,
  number,
  boolean
>(selectLoggedIn, selectGoals, selectAppTime, (loggedIn, goals, time) => {
  if (!loggedIn) {
    return false;
  }
  return shouldUpdate(goals, {
    staleTime: ms.days(1),
    now: time,
  });
});
