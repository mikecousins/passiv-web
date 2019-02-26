import { createSelector } from 'reselect';
import differenceInHours from 'date-fns/difference_in_hours'
import {
  loadAuthorizations,
  loadAccounts,
  loadCurrencies,
  loadCurrencyRates,
  loadGroups,
  loadBrokerages,
  loadSettings,
  loadSubscriptions,
  loadGroup,
} from '../actions';
import {
  selectLoggedIn,
  selectCurrenciesNeedData,
  selectBrokeragesNeedData,
  selectSubscriptionsNeedData,
  selectAuthorizationsNeedData,
  selectCurrencyRatesNeedData,
  selectAccountsNeedData,
  selectSettingsNeedData,
  selectGroupsNeedData,
} from '../selectors';

const isNeeded = (entity) => {
  // if we don't have the entity at all we need it
  if (!entity) {
    return true;
  }

  // if the entity request is in progress don't need it
  if (entity.loading) {
    return false;
  }

  // if we don't have data we need it
  if (!entity.data) {
    return true;
  }

  // if we haven't fetched yet we need it
  if (!entity.lastFetch) {
    return true;
  }

  // if the data is old we need it
  if (differenceInHours(entity.lastFetch, Date.now) > 1) {
    return true;
  }

  return false;
}

export const checkCurrencies = createSelector(
  selectCurrenciesNeedData,
  (needCurrencies) => {
    if (needCurrencies) {
      return loadCurrencies();
    }
  }
);

export const checkBrokerages = createSelector(
  selectBrokeragesNeedData,
  (needBrokerages) => {
    if (needBrokerages) {
      return loadBrokerages();
    }
  }
);

export const checkSubscriptions = createSelector(
  selectSubscriptionsNeedData,
  (needSubscriptions) => {
    if (needSubscriptions) {
      return loadSubscriptions();
    }
  }
);

export const checkAuthorizations = createSelector(
  selectAuthorizationsNeedData,
  (needAuthorizations) => {
    if (needAuthorizations) {
      return loadAuthorizations();
    }
  }
);

export const checkCurrencyRates = createSelector(
  selectCurrencyRatesNeedData,
  (needCurrencyRates) => {
    if (needCurrencyRates) {
      return loadCurrencyRates();
    }
  }
);

export const checkAccounts = createSelector(
  selectAccountsNeedData,
  (needAccounts) => {
    if (needAccounts) {
      return loadAccounts();
    }
  }
);

export const checkSettings = createSelector(
  selectSettingsNeedData,
  (needSettings) => {
    if (needSettings) {
      return loadSettings();
    }
  }
);

export const checkGroups = createSelector(
  selectGroupsNeedData,
  (needGroups) => {
    if (needGroups) {
      return loadGroups();
    }
  }
);

export const loadGroupDetails = createSelector(
  [state => state.groups,
  state => state.groupInfo,
  selectLoggedIn],
  (groups, groupInfo, loggedIn) => {
    if (loggedIn && groups && groups.data && groups.data.length > 0) {
      const allIds = Array.from(groups.data, group => group.id);
      const neededIds = allIds.filter(id => groupInfo && isNeeded(groupInfo[id]));
      if (neededIds.length > 0) {
        return loadGroup({ ids: neededIds });
      }
    }
  }
);
