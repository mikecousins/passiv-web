import { createSelector } from 'reselect'

export const selectLoggedIn = state => !!(state.auth.token);

export const selectSettings = state => state.settings;

export const selectAccounts = state => state.accounts;

export const selectBalances = state => state.accountBalances;

export const selectPositions = state => state.accountPositions;

export const selectGroups = state => state.groups;

export const selectGroupSettings = state => state.groupSettings;

export const selectIsDemoMode =  state => state.demo;

export const selectFullGroups = createSelector(
  selectGroups,
  selectGroupSettings,
  selectAccounts,
  selectBalances,
  (groups, groupSettings, accounts, balances) => {
    const fullGroups = {};
    if (!groups || !groups.data || !groups.data.length > 0) {
      return fullGroups;
    }
    groups.data.forEach(group => fullGroups.push({ id: group.id, name: group.name }));
    return fullGroups;
  }
)
