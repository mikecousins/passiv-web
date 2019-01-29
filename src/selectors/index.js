import { createSelector } from 'reselect';

export const selectLoggedIn = state => !!(state.auth.token);

export const selectCurrenciesRaw = state => state.currencies;

export const selectBrokeragesRaw = state => state.brokerages;

export const selectAuthorizationsRaw = state => state.authorizations;

export const selectCurrencies = createSelector(
  selectCurrenciesRaw,
  (rawCurrencies) => {
    if (rawCurrencies.data) {
      return rawCurrencies.data;
    }
  }
)

export const selectBrokerages = createSelector(
  selectBrokeragesRaw,
  (rawBrokerages) => {
    if (rawBrokerages.data) {
      return rawBrokerages.data;
    }
  }
)

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

export const selectSubscriptionsRaw = state => state.subscriptions;

export const selectSubscriptions = createSelector(
  selectSubscriptionsRaw,
  (rawSubscriptions) => {
    if (rawSubscriptions.data) {
      return rawSubscriptions.data;
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

export const selectSymbols = createSelector(
  selectGroups,
  selectGroupInfo,
  (groups, groupInfo) => {
    const symbols = [];
    if (!groups) {
      return symbols;
    }
    groups.forEach(group => {
      if (groupInfo && groupInfo[group.id] && groupInfo[group.id].data){
        groupInfo[group.id].data.symbols.forEach(
          symbol => {
            symbols.push(symbol);
          }
        )
      }
    });
    return symbols;
  }
);

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

export const selectCurrentGroupInfo = createSelector(
  selectCurrentGroupId,
  selectGroupInfo,
  (groupId, groupInfo) => {
    if (groupId && groupInfo[groupId] && groupInfo[groupId].data) {
      return groupInfo[groupId].data;
    }
  }
);

export const selectPasswordResetToken = createSelector(
  selectRouter,
  (router) => {
    let token = null;
    if (router && router.location && router.location.pathname && router.location.pathname.split('/').length === 4) {
      token = router.location.pathname.split('/')[3];
    }
    return token;
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

export const selectCurrentAccountPositions = createSelector(
  selectCurrentAccountId,
  selectPositions,
  (accountId, positions) => {
    if (!accountId || !positions || !positions[accountId] || !positions[accountId].data) {
      return null;
    }

    return positions[accountId].data;
  }
);

export const selectCurrentAccountBalancedEquity = createSelector(
  selectCurrentAccountPositions,
  (positions) => {
    if (!positions) {
      return null;
    }
    let total = 0;
    positions.forEach(position => total += position.units * parseFloat(position.price));
    return total;
  }
);

export const selectCurrentAccountCash = createSelector(
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

export const selectCurrentGroupAccuracy = createSelector(
  selectCurrentGroupId,
  selectGroupInfo,
  (groupId, groupInfo) => {
    let accuracy = null;
    if (groupInfo && groupInfo[groupId] && groupInfo[groupId].data && groupInfo[groupId].data.accuracy) {
      accuracy = groupInfo[groupId].data.accuracy;
    }
    return accuracy
  }
)

export const selectCurrentGroupBalances = createSelector(
  selectCurrentGroupId,
  selectGroupInfo,
  (groupId, groupInfo) => {
    let balances = null;
    if (groupInfo && groupInfo[groupId] && groupInfo[groupId].data && groupInfo[groupId].data.balances) {
      balances = groupInfo[groupId].data.balances;
    }
    return balances
  }
);

export const selectCurrentGroupCash = createSelector(
  selectCurrentGroupBalances,
  (balances) => {
    let cash = null;
    if (balances) {
      balances.forEach(balance => cash += parseFloat(balance.cash))
    }
    return cash
  }
)

export const selectCurrentGroupPositions = createSelector(
  selectCurrentGroupId,
  selectGroupInfo,
  (groupId, groupInfo) => {
    let positions = null;
    if (groupInfo && groupInfo[groupId] && groupInfo[groupId].data && groupInfo[groupId].data.positions) {
      positions = groupInfo[groupId].data.positions;
    }
    return positions
  }
);

export const selectCurrentGroupBalancedEquity = createSelector(
  selectCurrentGroupPositions,
  (positions) => {
    if (!positions) {
      return null;
    }
    let total = 0;
    positions.forEach(position => total += position.units * parseFloat(position.price));
    return total;
  }
);

export const selectCurrentGroupTotalEquity = createSelector(
  selectCurrentGroupCash,
  selectCurrentGroupBalancedEquity,
  (cash, balancedEquity) => {
    if (!cash && !balancedEquity) {
      return null;
    }
    return cash + balancedEquity;
  }
);

export const selectCurrentGroupTrades = createSelector(
  selectCurrentGroupId,
  selectGroupInfo,
  (groupId, groupInfo) => {
    let trades = null;
    if (groupInfo && groupInfo[groupId] && groupInfo[groupId].data && groupInfo[groupId].data.calculated_trades) {
      trades = groupInfo[groupId].data.calculated_trades;
    }
    return trades;
  }
);

export const selectCurrentGroupSymbols = createSelector(
  selectCurrentGroupInfo,
  (groupInfo) => {
    if (groupInfo && groupInfo.symbols) {
      return groupInfo.symbols;
    }
    return null;
  }
);

export const selectCurrentGroupQuotableSymbols = createSelector(
  selectCurrentGroupInfo,
  (groupInfo) => {
    if (groupInfo && groupInfo.quotable_symbols) {
      return groupInfo.quotable_symbols;
    }
    return null;
  }
);

export const selectCurrentGroupExcludedAssets = createSelector(
  selectCurrentGroupId,
  selectGroupInfo,
  (groupId, groupInfo) => {
    let excludedAssets = null;
    if (groupInfo && groupInfo[groupId] && groupInfo[groupId].data && groupInfo[groupId].data.excluded_positions) {
      excludedAssets = groupInfo[groupId].data.excluded_positions;
    }
    return excludedAssets;
  }
);

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

export const selectTotalGroupHoldings = createSelector(
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
);

export const selectCurrentGroupTarget = createSelector(
  selectCurrentGroupInfo,
  selectCurrentGroupTotalEquity,
  (groupInfo, totalHoldings) => {
    if (!groupInfo || !groupInfo.target_positions) {
      return null;
    }

    // add the target positions
    const currentTargetRaw = groupInfo.target_positions;
    const currentTarget = currentTargetRaw.map(targetRaw => {
      const target = {...targetRaw};
      // add the symbol to the target
      target.fullSymbol = groupInfo.symbols.find(symbol => symbol.id === target.symbol);
      // add the actual percentage to the target
      const position = groupInfo.positions.find(p => p.symbol.id === target.symbol);
      if (position) {
        target.actualPercentage = position.price * position.units / totalHoldings * 100;
      }

      target.excluded = false;
      return target;
    });
    return currentTarget;
  }
);

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
);

export const selectName = createSelector(
  selectSettings,
  (settings) => {
    return settings.name;
  }
);

export const selectIsUpdateServiceWorker = state => state.updateServiceWorker;
