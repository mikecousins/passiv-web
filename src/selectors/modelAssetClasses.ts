import { createSelector } from 'reselect';
import ms from 'milliseconds';
import shouldUpdate from '../reactors/should-update';
import { selectLoggedIn, selectAppTime } from './index';
import { AppState } from '../store';

export const selectModelAssetClassesRaw = (state: AppState) => {
  return state.modelAssetClasses;
};

export const selectModelAssetClasses = createSelector(
  selectModelAssetClassesRaw,
  (rawAssetClasses) => {
    if (rawAssetClasses.data) {
      return rawAssetClasses.data;
    }
    return [];
  },
);

export const selectModelAssetClassesNeedData = createSelector(
  selectLoggedIn,
  selectModelAssetClassesRaw,
  selectAppTime,
  (loggedIn, rawAssetClasses, time) => {
    if (!loggedIn) {
      return false;
    }
    return shouldUpdate(rawAssetClasses, {
      staleTime: ms.minutes(10),
      now: time,
    });
  },
);
