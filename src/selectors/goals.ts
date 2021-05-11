import { createSelector } from 'reselect';
import { AppState } from '../store';
import { selectLoggedIn, selectAppTime, selectRouter } from './index';
import { SimpleState } from '../types/common';
import shouldUpdate from '../reactors/should-update';
import ms from 'milliseconds';
import { Goal } from '../types/goals';
import { RouterState } from 'connected-react-router';

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

export const selectCurrentGoalId = createSelector<
  AppState,
  RouterState,
  string | null
>(selectRouter, (router) => {
  let goalId = null;
  if (
    router &&
    router.location &&
    router.location.pathname &&
    router.location.pathname.split('/').length >= 4
  ) {
    goalId = router.location.pathname.split('/')[3];
  }
  return goalId;
});
