import { createSelector } from 'reselect';
import differenceInHours from 'date-fns/difference_in_hours'
import {
  initialLoad,
  loadAuthorizations,
  loadAccounts,
  loadCurrencyRates,
  loadGroups,
  loadBrokerages,
  loadSettings,
  loadSubscriptions,
  loadGroup,
} from '../actions';
import { selectLoggedIn } from '../selectors';

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

export const loadData = createSelector(
  [
    selectLoggedIn,
    state => state.authorizations,
    state => state.currencies,
    state => state.currencyRates,
    state => state.accounts,
    state => state.groups,
    state => state.brokerages,
    state => state.settings,
    state => state.subscriptions,
  ],
  (loggedIn, authorizations, currencies, currencyRates, accounts, groups, brokerages, settings, subscriptions) => {
    // ignore if we aren't logged in
    if (!loggedIn) {
      return;
    }

    // if we need currencies we need everything, perform a full load
    if (isNeeded(currencies)) {
      return initialLoad();
    }

    if (isNeeded(authorizations)) {
      return loadAuthorizations();
    }

    if (isNeeded(currencyRates)) {
      return loadCurrencyRates();
    }

    if (isNeeded(brokerages)) {
      return loadBrokerages();
    }

    if (isNeeded(settings)) {
      return loadSettings();
    }

    if (isNeeded(groups)) {
      return loadGroups();
    }

    if (isNeeded(accounts)) {
      return loadAccounts();
    }

    if (isNeeded(subscriptions)) {
      return loadSubscriptions();
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
