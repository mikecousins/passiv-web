import { createSelector } from 'reselect';
import { AppState } from '../store';
import { selectSettings } from './index';

export const selectReferralCode = createSelector(selectSettings, settings => {
  if (settings) {
    return settings.referral_code;
  }
});
