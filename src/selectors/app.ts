import { createSelector } from 'reselect';
import { selectLoggedIn, selectIsAuthorized } from '.';
import { selectGroups } from './groups';

export const selectShowInsecureApp = createSelector(
  selectLoggedIn,
  loggedIn => {
    return loggedIn === false;
  },
);

export const selectShowOnboardingApp = createSelector(
  selectShowInsecureApp,
  selectIsAuthorized,
  selectGroups,
  (showInsecureApp, isAuthorized, groups) => {
    if (showInsecureApp) {
      return false;
    }
    if (!isAuthorized) {
      return true;
    }
    if (!groups) {
      return true;
    }
    if (groups && groups.find(group => !group.setupComplete)) {
      return true;
    }
    return false;
  },
);

export const selectShowSecureApp = createSelector(
  selectShowInsecureApp,
  selectShowOnboardingApp,
  (showInsecureApp, showOnboardingApp) => {
    if (showInsecureApp || showOnboardingApp) {
      return false;
    }
    return true;
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
