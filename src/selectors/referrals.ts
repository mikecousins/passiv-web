import { createSelector } from 'reselect';
import { selectSettings } from './index';

export const selectReferralCode = createSelector(selectSettings, (settings) => {
  if (settings) {
    return settings.referral_code;
  }
});

export const selectReferralValue = createSelector(
  selectSettings,
  (settings) => {
    if (settings) {
      return settings.referral_value + settings.affiliate_bonus_amount;
    }
  },
);

export const selectReferralCurrency = createSelector(
  selectSettings,
  (settings) => {
    if (settings) {
      return settings.referral_currency;
    }
  },
);
