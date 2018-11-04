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
    const fullGroups = [];
    if (!groups || !groups.data || !groups.data.length > 0) {
      return fullGroups;
    }
    groups.data.forEach(g => {
      const group = { id: g.id, name: g.name };
      if (accounts && accounts.data && accounts.data.length > 0) {
        const account = accounts.data.find(a => a.portfolio_group === g.id);
        if (account) {
          group.accounts = [{ id: account.id, name: account.name, number: account.number, type: account.meta.type }];
          if (balances && balances[account.id] && balances[account.id].data && balances[account.id].data.length > 0) {
            group.accounts[0].balance = balances[account.id].data[0].cash;
          }
        }
      }

      fullGroups.push(group);
    });

    return fullGroups;
  }
);

export const selectTotalHoldings = createSelector(
  selectAccounts,
  selectPositions,
  selectBalances,
  (accounts, positions, balances) => {
    let total = null;
    if (accounts && accounts.data) {
      accounts.data.forEach(account => {
        if (balances[account.id] && balances[account.id].data && balances[account.id].data.length > 0) {
          const accountBalances = balances[account.id].data;
          accountBalances.forEach(balance => total += parseFloat(balance.cash));
        }
        if (positions[account.id] && positions[account.id].data && positions[account.id].data.length > 0) {
          const accountPositions = positions[account.id].data;
          accountPositions.forEach(position => total += position.units * parseFloat(position.price));
        }
      });
    }

    return total;
  }
)
