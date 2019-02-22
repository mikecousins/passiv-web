import { createSelector } from 'reselect';

export const selectLoggedIn = state => !!(state.auth.token);

export const selectToken = state => state.auth.token;

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

export const selectGroupInfo = state => state.groupInfo;

export const selectGroups = createSelector(
  selectGroupsRaw,
  selectGroupInfo,
  (rawGroups, groupInfo) => {
    if (rawGroups.data) {
      return rawGroups.data.map((group) => {
        const groupWithRebalance = group;
        if (groupInfo[group.id] && groupInfo[group.id].data) {
          groupWithRebalance.rebalance = !!(groupInfo[group.id].data.calculated_trades && groupInfo[group.id].data.calculated_trades.trades.length > 0);
        }
        return groupWithRebalance;
      });
    }
    return null;
  }
);

export const selectGroupSettingsRaw = state => state.groupSettings;

export const selectGroupSettings = createSelector(
  selectGroupSettingsRaw,
  (rawGroupSettings) => {
    if (rawGroupSettings.data) {
      return rawGroupSettings.data;
    }
  }
);

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

export const selectCurrencyRates = state => state.currencyRates;

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

export const selectDashboardGroups = createSelector(
  selectGroups,
  selectGroupInfo,
  selectCurrencyRates,
  selectCurrencies,
  (groups, groupInfo, rates, currencies) => {
    const fullGroups = [];
    if (!groups || !rates) {
      return fullGroups;
    }
    groups.forEach(g => {
      const group = { id: g.id, name: g.name, totalCash: null, totalHoldings: null, totalValue: null };
      if (groupInfo[group.id] && groupInfo[group.id].data) {
        groupInfo[group.id].data.balances.forEach(balance => {
          // convert to CAD for now
          const preferredCurrency = currencies.find(currency => currency.code === 'CAD').id;
          // const preferredCurrency = groupInfo[group.id].data.preferredCurrency;
          if (balance.currency.id === preferredCurrency) {
            group.totalCash += parseFloat(balance.cash);
          } else {
            const conversionRate = rates.data.find(rate => rate.src.id === balance.currency.id  && rate.dst.id === preferredCurrency).exchange_rate;
            group.totalCash += parseFloat(balance.cash * conversionRate);
          }
        });
        groupInfo[group.id].data.positions.forEach(position => group.totalHoldings += position.units * position.price);
        group.accuracy = groupInfo[group.id].data.accuracy;
        group.rebalance = !!(groupInfo[group.id].data.calculated_trades && groupInfo[group.id].data.calculated_trades.trades.length > 0);
        group.trades = groupInfo[group.id].data.calculated_trades;
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
      if (!selectedGroup) {
        return group;
      }
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

export const selectCurrentGroupSettings = createSelector(
  selectCurrentGroupId,
  selectGroupInfo,
  (groupId, groupInfo) => {
    let settings = null;
    if (groupInfo && groupInfo[groupId] && groupInfo[groupId].data && groupInfo[groupId].data.settings) {
      settings = groupInfo[groupId].data.settings;
    }
    return settings
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
      else {
        target.actualPercentage = 0;
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
    if (settings) {
      return settings.name;
    }
    return null;
  }
);

export const selectIsUpdateServiceWorker = state => state.updateServiceWorker;
