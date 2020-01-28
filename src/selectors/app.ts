import { createSelector } from 'reselect';
import { selectLoggedIn, selectIsAuthorized } from '.';
import { selectGroups, selectGroupsRaw } from './groups';

export const selectShowInsecureApp = createSelector(
  selectLoggedIn,
  loggedIn => {
    return loggedIn === false;
  },
);

export const selectShowSpinner = createSelector(
  selectShowInsecureApp,
  selectGroupsRaw,
  (showInsecureApp, groupsRaw) => {
    if (showInsecureApp) {
      return false;
    }
    // if (!groupsRaw || groupsRaw.loading) {
    //   return true;
    // }
    return false;
  },
);

export const selectShowOnboardingApp = createSelector(
  selectShowInsecureApp,
  selectShowSpinner,
  selectIsAuthorized,
  selectGroups,
  (showInsecureApp, showSpinner, isAuthorized, groups) => {
    if (showInsecureApp || showSpinner) {
      return false;
    }
    if (!isAuthorized) {
      return true;
    }
    // if (
    //   groups &&
    //   groups.some(
    //     group => group.setupComplete === false && group.accounts.length > 0,
    //   )
    // ) {
    //   return true;
    // }
    return false;
  },
);

export const selectShowSecureApp = createSelector(
  selectShowInsecureApp,
  selectShowSpinner,
  selectShowOnboardingApp,
  (showInsecureApp, showSpinner, showOnboardingApp) => {
    if (showInsecureApp || showSpinner || showOnboardingApp) {
      return false;
    }
    return true;
  },
);

export const selectOnboardingPage = createSelector(
  selectIsAuthorized,
  selectGroups,
  (isAuthorized, groups) => {
    if (!isAuthorized) {
      return '/welcome';
    }
    if (
      groups &&
      groups.some(
        group => group.setupComplete === false && group.accounts.length > 0,
      )
    ) {
      return '/initial-targets';
    }
    return '/welcome';
  },
);
