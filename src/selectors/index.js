export const selectLoggedIn = state => !!(state.auth.token);

export const selectSettings = state => state.settings;

export const selectAccounts = state => state.accounts;

export const selectBalances = state => state.accountBalances;

export const selectPositions = state => state.accountPositions;

export const selectGroups = state => state.groups;

export const selectGroupSettings = state => state.groupSettings;

export const selectIsDemoMode =  state => state.demo;
