import { createSelector } from 'reselect';
import differenceInHours from 'date-fns/difference_in_hours'
import {
  initialLoad,
  loadAccounts,
  loadGroups,
  loadBrokerages,
  loadSettings,
  // loadAccount,
  loadGroup,
} from '../actions';

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
    state => state.auth.token,
    state => state.currencies,
    state => state.accounts,
    state => state.groups,
    state => state.brokerages,
    state => state.settings,
  ],
  (token, currencies, accounts, groups, brokerages, settings) => {
    // ignore if we aren't logged in
    if (!token) {
      return;
    }

    // if we need currencies we need everything, perform a full load
    if (isNeeded(currencies)) {
      return initialLoad(token);
    }

    if (isNeeded(brokerages)) {
      return loadBrokerages(token);
    }

    if (isNeeded(settings)) {
      return loadSettings(token);
    }

    if (isNeeded(groups)) {
      return loadGroups(token);
    }

    if (isNeeded(accounts)) {
      return loadAccounts(token);
    }
  }
);

// export const loadAccountDetails = createSelector(
//   [state => state.accounts,
//   state => state.accountDetails,
//   state => state.auth.token],
//   (accounts, accountDetails, token) => {
//     if (!!token && accounts && accounts.data && accounts.data.length > 0) {
//       const allIds = Array.from(accounts.data, account => account.id);
//       const neededIds = allIds.filter(id => accountDetails && isNeeded(accountDetails[id]));
//       if (neededIds.length > 0) {
//         return loadAccount({ ids: neededIds, token });
//       }
//     }
//   }
// );

export const loadGroupDetails = createSelector(
  [state => state.groups,
  state => state.groupInfo,
  state => state.auth.token],
  (groups, groupInfo, token) => {
    if (!!token && groups && groups.data && groups.data.length > 0) {
      const allIds = Array.from(groups.data, group => group.id);
      const neededIds = allIds.filter(id => groupInfo && isNeeded(groupInfo[id]));
      if (neededIds.length > 0) {
        return loadGroup({ ids: neededIds, token });
      }
    }
  }
);
