import { createSelector } from 'reselect';
import { loadInitialData } from '../actions';

export const loadData = createSelector([state => state.auth.token],
(token) => {
  if (!!token) {
    return loadInitialData(token);
  }
})
