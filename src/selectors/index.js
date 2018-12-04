import { createSelector } from 'reselect';

export const selectLoggedIn = state => !!(state.auth.token);

export const selectCurrencies = state => stage.currencies;

export const selectBrokerages = state => stage.brokerages;

export const selectAuthorizationsRaw = state => state.authorizations;

export const selectAuthorizations = createSelector(
  selectAuthorizationsRaw,
  (rawAuthorizations) => {
    if (rawAuthorizations.data) {
      return rawAuthorizations.data;
    }
  }
)

export const selectSettingsRaw = state => state.settings;

export const selectSettings = createSelector(
  selectSettingsRaw,
  (rawSettings) => {
    if (rawSettings.data) {
      return rawSettings.data;
    }
  }
);

export const selectAccountsRaw = state => state.accounts;

export const selectAccounts = createSelector(
  selectAccountsRaw,
  (rawAccounts) => {
    if (rawAccounts.data) {
      return rawAccounts.data;
    }
  }
);

export const selectBalances = state => state.accountBalances;

export const selectPositions = state => state.accountPositions;

export const selectGroupsRaw = state => state.groups;

export const selectGroups = createSelector(
  selectGroupsRaw,
  (rawGroups) => {
    if (rawGroups.data) {
      return rawGroups.data;
    }
  }
)

export const selectGroupSettingsRaw = state => state.groupSettings;

export const selectGroupSettings = createSelector(
  selectGroupSettingsRaw,
  (rawGroupSettings) => {
    if (rawGroupSettings.data) {
      return rawGroupSettings.data;
    }
  }
);

export const selectGroupInfo = state => state.groupInfo;

export const selectSymbolsRaw = state => state.symbols;

export const selectSymbols = createSelector(
  selectSymbolsRaw,
  (rawSymbols) => {
    if (rawSymbols.data) {
      return rawSymbols.data;
    }
  }
)

export const selectIsDemoMode =  state => state.demo;

export const selectRouter = state => state.router;

export const selectCurrentGroupId = createSelector(
  selectRouter,
  (router) => {
    let groupId = null;
    if (router && router.location && router.location.pathname && router.location.pathname.split('/').length === 4) {
      groupId = router.location.pathname.split('/')[3];
    }
    return groupId;
  }
);

export const selectCurrentAccountId = createSelector(
  selectCurrentGroupId,
  selectAccounts,
  (groupId, accounts) => {
    if (!accounts) {
      return null;
    }
    const account = accounts.find(a => a.portfolio_group === groupId);
    if (account) {
      return account.id;
    }
    return null;
  }
)

export const selectDashboardGroups = createSelector(
  selectGroups,
  selectGroupInfo,
  (groups, groupInfo) => {
    const fullGroups = [];
    if (!groups) {
      return fullGroups;
    }
    groups.forEach(g => {
      const group = { id: g.id, name: g.name, totalCash: null, totalHoldings: null, totalValue: null };
      if (groupInfo && groupInfo[group.id] && groupInfo[group.id].data) {
        groupInfo[group.id].data.balances.forEach(balance => group.totalCash += parseFloat(balance.cash));
        groupInfo[group.id].data.positions.forEach(position => group.totalHoldings += position.units * position.price);
        group.accuracy = groupInfo[group.id].data.accuracy;
      }
      if (group.totalCash && group.totalHoldings) {
        group.totalValue = group.totalCash + group.totalHoldings;
      }
      fullGroups.push(group);
    });

    return fullGroups;
  }
);

export const selectCurrentGroup = createSelector(
  selectGroups,
  selectAccounts,
  selectBalances,
  selectPositions,
  selectCurrentGroupId,
  (groups, accounts, balances, positions, groupId) => {
    let group = null;
    if (groupId) {
      if (!groups) {
        return group;
      }
      const selectedGroup = groups.find(g => g.id === groupId);
      group = { id: selectedGroup.id, name: selectedGroup.name };
      if (accounts) {
        const account = accounts.find(a => a.portfolio_group === groupId);
        if (account) {
          group.accounts = [{ id: account.id, name: account.name, number: account.number, type: account.meta.type }];
          if (balances && balances[account.id] && balances[account.id].data && balances[account.id].data.length > 0) {
            group.accounts[0].balance = balances[account.id].data[0].cash;
          }
        }
      }
    }
    return group;
  }
);

export const selectCurrentPositions = createSelector(
  selectCurrentAccountId,
  selectPositions,
  (accountId, positions) => {
    if (!accountId || !positions || !positions[accountId] || !positions[accountId].data) {
      return null;
    }

    return positions[accountId].data;
  }
);

export const selectCurrentBalancedEquity = createSelector(
  selectCurrentPositions,
  (positions) => {
    if (!positions) {
      return null;
    }
    let total = 0;
    positions.forEach(position => total += position.units * parseFloat(position.price));
    return total;
  }
);

export const selectCurrentCash = createSelector(
  selectCurrentAccountId,
  selectBalances,
  (accountId, balances) => {
    let cash = null;
    if (balances && balances[accountId] && balances[accountId].data) {
      balances[accountId].data.forEach(balance => cash += parseFloat(balance.cash));
    }
    return cash;
  }
);

export const selectCurrentTarget = createSelector(
  selectCurrentGroupId,
  selectGroupInfo,
  selectSymbols,
  (groupId, groupInfo, symbols) => {
    if (!groupInfo || !groupInfo[groupId] || !groupInfo[groupId].data || !groupInfo[groupId].data.ideal_positions) {
      return null;
    }
    const currentTarget = groupInfo[groupId].data.ideal_positions;
    const currentTargetWithSymbols = currentTarget.map(target => {
      const targetWithSymbol = target;
      targetWithSymbol.displaySymbol = symbols.find(symbol => symbol.id === target.symbol);
      return targetWithSymbol;
    })
    return currentTargetWithSymbols;
  }
)

export const selectTotalAccountHoldings = createSelector(
  selectAccounts,
  selectPositions,
  selectBalances,
  (accounts, positions, balances) => {
    let total = null;
    if (accounts) {
      accounts.forEach(account => {
        if (balances && balances[account.id] && balances[account.id].data && balances[account.id].data.length > 0) {
          const accountBalances = balances[account.id].data;
          accountBalances.forEach(balance => total += parseFloat(balance.cash));
        }
        if (positions && positions[account.id] && positions[account.id].data && positions[account.id].data.length > 0) {
          const accountPositions = positions[account.id].data;
          accountPositions.forEach(position => total += position.units * parseFloat(position.price));
        }
      });
    }

    return total;
  }
)

export const selectTotalHoldings = createSelector(
  selectGroups,
  selectGroupInfo,
  (groups, groupInfo) => {
    let total = null;
    if (groups) {
      groups.forEach(group => {
        if (groupInfo && groupInfo[group.id] && groupInfo[group.id].data) {
          groupInfo[group.id].data.balances.forEach(balance => total += parseFloat(balance.cash));
          groupInfo[group.id].data.positions.forEach(position => total += position.units * parseFloat(position.price));
        }
      });
    }

    return total;
  }
)

export const selectIsAuthorized = createSelector(
  selectAuthorizations,
  (authorizations) => {
    if (authorizations === undefined) {
      return undefined;
    }
    if (authorizations.length > 0) {
      return true;
    }
    return false;
  }
)
