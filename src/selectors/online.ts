import { createSelector } from 'reselect';
import ms from 'milliseconds';
import { selectAppTime } from './index';
import { AppState } from '../store';

export const selectIsOnline = (state: AppState) => state.online.isOnline;

export const selectIsOffline = (state: AppState) => !state.online.isOnline;

export const selectOnlineRaw = (state: AppState) => state.online;

export const selectShouldCheckIfOnline = createSelector(
  selectAppTime,
  selectOnlineRaw,
  (time, onlineRaw) => {
    return !onlineRaw.checking && time - onlineRaw.lastChecked > ms.seconds(10);
  },
);
