import { createSelector } from 'reselect';
import ms from 'milliseconds';
import { selectAppTime } from './index';

export const selectIsOnline = (state: any) => state.online.isOnline;

export const selectIsOffline = (state: any) => !state.online.isOnline;

export const selectOnlineRaw = (state: any) => state.online;

export const selectShouldCheckIfOnline = createSelector(
  selectAppTime,
  selectOnlineRaw,
  (time, onlineRaw) => {
    return !onlineRaw.checking && time - onlineRaw.lastChecked > ms.seconds(10);
  },
);
