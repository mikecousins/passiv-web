import { createSelector } from 'reselect';
import { selectLoggedIn, selectIsAuthorized } from '.';

export const selectShowInsecureApp = createSelector(
  selectLoggedIn,
  loggedIn => {
    return loggedIn === false;
  },
);

export const selectShowOnboardingApp = createSelector(
  selectShowInsecureApp,
  selectIsAuthorized,
  (showInsecureApp, isAuthorized) => {
    if (showInsecureApp) {
      return false;
    }
    return !isAuthorized;
  },
);

export const selectShowSecureApp = createSelector(
  selectShowInsecureApp,
  selectShowOnboardingApp,
  (showInsecureApp, showOnboardingApp) => {
    if (showInsecureApp || showOnboardingApp) {
      return false;
    }
    return false;
  },
);

export const selectOnboardingPage = createSelector(
  selectShowOnboardingApp,
  selectIsAuthorized,
  (showOnboardingApp, isAuthorized) => {
    if (!showOnboardingApp) {
      return undefined;
    }
    if (!isAuthorized) {
      return 'authorization';
    }
    return 'other';
  },
);
