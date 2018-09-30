export const selectLoggedIn = state => !!(state.auth.token);

export const selectSettings = state => state.settings;

export const selectAccounts = state => state.accounts;
