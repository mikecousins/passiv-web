import { createSelector } from 'reselect';
import ms from 'milliseconds';
import shouldUpdate from '../reactors/should-update';
import { AppState } from '../store';

export const selectPhoneNumber = createSelector(selectSettings, (settings) => {
  if (settings) {
    return settings.referral_code;
  }
});
