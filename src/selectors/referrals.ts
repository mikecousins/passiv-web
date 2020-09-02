import { createSelector } from 'reselect';
import { AppState } from '../store';

export const selectSettingsRaw = (state: AppState) => state.settings;

export const selectSettings = createSelector(
  selectSettingsRaw,
  (rawSettings) => {
    if (rawSettings.data) {
      return rawSettings.data;
    }
  },
);

export const selectReferralCode = createSelector(selectSettings, (settings) => {
  if (settings) {
    return settings.referral_code;
  }
});
