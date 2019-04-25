import { createSelector } from 'reselect';
import ms from 'milliseconds';
import jwtDecode from 'jwt-decode';
import shouldUpdate from '../reactors/should-update';
import { selectIsEditMode } from './router';

export const selectAppTime = state => state.appTime;

export const selectLoggedIn = state => !!state.auth.token;

export const selectToken = state => state.auth.token;

export const selectTokenIsExpired = createSelector(
  selectToken,
  selectAppTime,
  (token, now) => {
    if (!token) {
      return false;
    }
    const decodedToken = jwtDecode(token);
    const expiry = ms.seconds(decodedToken.exp);
    if (now < expiry) {
      return false;
    }
    return true;
  },
);

export const selectCurrenciesRaw = state => state.currencies;

export const selectBrokeragesRaw = state => state.brokerages;

export const selectAuthorizationsRaw = state => state.authorizations;

export const selectCurrencies = createSelector(
  selectCurrenciesRaw,
  rawCurrencies => {
    if (rawCurrencies.data) {
      return rawCurrencies.data;
    }
  },
);

export const selectCurrenciesNeedData = createSelector(
  selectLoggedIn,
  selectCurrenciesRaw,
  selectAppTime,
  (loggedIn, rawCurrencies, time) => {
    if (!loggedIn) {
      return false;
    }
    return shouldUpdate(rawCurrencies, {
      staleTime: ms.days(7),
      now: time,
    });
  },
);

export const selectBrokerages = createSelector(
  selectBrokeragesRaw,
  rawBrokerages => {
    if (rawBrokerages.data) {
      return rawBrokerages.data;
    }
  },
);

export const selectBrokeragesNeedData = createSelector(
  selectLoggedIn,
  selectBrokeragesRaw,
  selectAppTime,
  (loggedIn, rawBrokerages, time) => {
    if (!loggedIn) {
      return false;
    }
    return shouldUpdate(rawBrokerages, {
      staleTime: ms.days(7),
      now: time,
    });
  },
);

export const selectAuthorizations = createSelector(
  selectAuthorizationsRaw,
  rawAuthorizations => {
    if (rawAuthorizations.data) {
      return rawAuthorizations.data;
    }
  },
);

export const selectAuthorizationsNeedData = createSelector(
  selectLoggedIn,
  selectAuthorizationsRaw,
  selectAppTime,
  (loggedIn, rawAuthorizations, time) => {
    if (!loggedIn) {
      return false;
    }
    return shouldUpdate(rawAuthorizations, {
      staleTime: ms.minutes(10),
      now: time,
    });
  },
);

export const selectSettingsRaw = state => state.settings;

export const selectSettings = createSelector(
  selectSettingsRaw,
  rawSettings => {
    if (rawSettings.data) {
      return rawSettings.data;
    }
  },
);

export const selectSettingsNeedData = createSelector(
  selectLoggedIn,
  selectSettingsRaw,
  selectAppTime,
  (loggedIn, rawSettings, time) => {
    if (!loggedIn) {
      return false;
    }
    return shouldUpdate(rawSettings, {
      staleTime: ms.minutes(10),
      now: time,
    });
  },
);

export const selectSubscriptionsRaw = state => state.subscriptions;

export const selectSubscriptions = createSelector(
  selectSubscriptionsRaw,
  rawSubscriptions => {
    if (rawSubscriptions.data) {
      return rawSubscriptions.data;
    }
  },
);

export const selectSubscriptionsNeedData = createSelector(
  selectLoggedIn,
  selectSubscriptionsRaw,
  selectAppTime,
  (loggedIn, rawSubscriptions, time) => {
    if (!loggedIn) {
      return false;
    }
    return shouldUpdate(rawSubscriptions, {
      staleTime: ms.minutes(10),
      now: time,
    });
  },
);

export const selectPlansRaw = state => state.plans;

export const selectPlans = createSelector(
  selectPlansRaw,
  rawPlans => {
    if (rawPlans.data) {
      return rawPlans.data;
    }
  },
);

export const selectPlansNeedData = createSelector(
  selectLoggedIn,
  selectPlansRaw,
  selectAppTime,
  (loggedIn, rawPlans, time) => {
    if (!loggedIn) {
      return false;
    }
    return shouldUpdate(rawPlans, {
      staleTime: ms.days(1),
      now: time,
    });
  },
);

export const selectAccountsRaw = state => state.accounts;

export const selectAccounts = createSelector(
  selectAccountsRaw,
  rawAccounts => {
    if (rawAccounts.data) {
      return rawAccounts.data;
    }
  },
);

export const selectAccountsNeedData = createSelector(
  selectLoggedIn,
  selectAccountsRaw,
  selectAppTime,
  (loggedIn, rawAccounts, time) => {
    if (!loggedIn) {
      return false;
    }
    return shouldUpdate(rawAccounts, {
      staleTime: ms.minutes(10),
      now: time,
    });
  },
);

export const selectAccountBalances = state => state.accountBalances;

export const selectAccountPositions = state => state.accountPositions;

export const selectGroupsRaw = state => state.groups;

export const selectGroupInfo = state => state.groupInfo;

export const selectGroups = createSelector(
  selectGroupsRaw,
  selectGroupInfo,
  (rawGroups, groupInfo) => {
    if (rawGroups.data) {
      return rawGroups.data.map(group => {
        const groupWithRebalance = group;
        if (groupInfo[group.id] && groupInfo[group.id].data) {
          if (
            groupInfo[group.id].data.settings.target_initialized &&
            groupInfo[group.id].data.target_positions.length > 0
          ) {
            groupWithRebalance.setupComplete = true;
          } else {
            groupWithRebalance.setupComplete = false;
          }
          groupWithRebalance.loading = false;
          groupWithRebalance.rebalance = !!(
            groupInfo[group.id].data.calculated_trades &&
            groupInfo[group.id].data.calculated_trades.trades.length > 0
          );
        } else {
          groupWithRebalance.loading = true;
        }
        return groupWithRebalance;
      });
    }
    return null;
  },
);

export const selectGroupsNeedData = createSelector(
  selectLoggedIn,
  selectGroupsRaw,
  selectGroupInfo,
  selectAppTime,
  selectIsEditMode,
  (loggedIn, rawGroups, groupInfo, time, edit) => {
    if (!loggedIn || edit) {
      return false;
    }
    return shouldUpdate(rawGroups, {
      staleTime: ms.minutes(10),
      now: time,
    });
  },
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
      if (groupInfo && groupInfo[group.id] && groupInfo[group.id].data) {
        groupInfo[group.id].data.symbols.forEach(symbol => {
          symbols.push(symbol);
        });
      }
    });
    return symbols;
  },
);

export const selectIsDemoMode = state => state.demo;

export const selectRouter = state => state.router;

export const selectCurrencyRatesRaw = state => state.currencyRates;

export const selectCurrencyRates = createSelector(
  selectCurrencyRatesRaw,
  rawCurrencyRates => {
    if (rawCurrencyRates.data) {
      return rawCurrencyRates.data;
    } else {
      return null;
    }
  },
);

export const selectCurrencyRatesNeedData = createSelector(
  selectLoggedIn,
  selectCurrencyRatesRaw,
  selectAppTime,
  (loggedIn, rawCurrencyRates, time) => {
    if (!loggedIn) {
      return false;
    }
    return shouldUpdate(rawCurrencyRates, {
      staleTime: ms.minutes(10),
      now: time,
    });
  },
);

export const selectCurrentGroupId = createSelector(
  selectRouter,
  router => {
    let groupId = null;
    if (
      router &&
      router.location &&
      router.location.pathname &&
      router.location.pathname.split('/').length === 4
    ) {
      groupId = router.location.pathname.split('/')[3];
    }
    return groupId;
  },
);

export const selectCurrentGroupInfo = createSelector(
  selectCurrentGroupId,
  selectGroupInfo,
  (groupId, groupInfo) => {
    if (groupId && groupInfo[groupId] && groupInfo[groupId].data) {
      return groupInfo[groupId].data;
    }
  },
);

export const selectCurrentGroupInfoError = createSelector(
  selectCurrentGroupInfo,
  data => {
    try {
      return data.error;
    } catch {
      return null;
    }
  },
);

export const selectPasswordResetToken = createSelector(
  selectRouter,
  router => {
    let token = null;
    if (
      router &&
      router.location &&
      router.location.pathname &&
      router.location.pathname.split('/').length === 4
    ) {
      token = router.location.pathname.split('/')[3];
    }
    return token;
  },
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
      const group = {
        id: g.id,
        name: g.name,
        totalCash: 0,
        totalHoldings: 0,
        totalValue: null,
      };
      if (groupInfo[group.id] && groupInfo[group.id].data) {
        groupInfo[group.id].data.balances.forEach(balance => {
          // convert to CAD for now
          const preferredCurrency = currencies.find(
            currency => currency.code === 'CAD',
          ).id;
          // const preferredCurrency = groupInfo[group.id].data.preferredCurrency;
          if (balance.currency.id === preferredCurrency) {
            group.totalCash += parseFloat(balance.cash);
          } else {
            const conversionRate = rates.find(
              rate =>
                rate.src.id === balance.currency.id &&
                rate.dst.id === preferredCurrency,
            ).exchange_rate;
            group.totalCash += parseFloat(balance.cash * conversionRate);
          }
        });
        groupInfo[group.id].data.positions.forEach(position => {
          // convert to CAD for now
          const preferredCurrency = currencies.find(
            currency => currency.code === 'CAD',
          ).id;
          if (position.symbol.currency.id === preferredCurrency) {
            group.totalHoldings += position.units * position.price;
          } else {
            const conversionRate = rates.find(
              rate =>
                rate.src.id === position.symbol.currency.id &&
                rate.dst.id === preferredCurrency,
            ).exchange_rate;
            group.totalHoldings += parseFloat(
              position.units * position.price * conversionRate,
            );
          }
        });
        group.accuracy = groupInfo[group.id].data.accuracy;
        if (
          groupInfo[group.id].data.settings.target_initialized &&
          groupInfo[group.id].data.target_positions.length > 0
        ) {
          group.setupComplete = true;
        } else {
          group.setupComplete = false;
        }
        group.rebalance = !!(
          groupInfo[group.id].data.calculated_trades &&
          groupInfo[group.id].data.calculated_trades.trades.length > 0
        );
        group.trades = groupInfo[group.id].data.calculated_trades;
        group.brokerage_authorizations =
          groupInfo[group.id].data.brokerage_authorizations;
      }
      if (group.totalCash !== null && group.totalHoldings !== null) {
        group.totalValue = group.totalCash + group.totalHoldings;
      }

      fullGroups.push(group);
    });

    return fullGroups;
  },
);

export const selectCurrentGroup = createSelector(
  selectGroups,
  selectAccounts,
  selectAccountBalances,
  selectAccountPositions,
  selectCurrentGroupId,
  (groups, accounts, balances, positions, groupId) => {
    let group = undefined;
    if (groupId) {
      if (!groups) {
        return group;
      }
      const selectedGroup = groups.find(g => g.id === groupId);
      if (!selectedGroup) {
        return null;
      }
      group = { id: selectedGroup.id, name: selectedGroup.name };
      if (accounts) {
        const account = accounts.find(a => a.portfolio_group === groupId);
        if (account) {
          group.accounts = [
            {
              id: account.id,
              name: account.name,
              number: account.number,
              type: account.meta.type,
            },
          ];
          if (
            balances &&
            balances[account.id] &&
            balances[account.id].data &&
            balances[account.id].data.length > 0
          ) {
            group.accounts[0].balance = balances[account.id].data[0].cash;
          }
        }
      }
    }
    return group;
  },
);

export const selectCurrentGroupAccuracy = createSelector(
  selectCurrentGroupId,
  selectGroupInfo,
  (groupId, groupInfo) => {
    let accuracy = null;
    if (
      groupInfo &&
      groupInfo[groupId] &&
      groupInfo[groupId].data &&
      groupInfo[groupId].data.accuracy
    ) {
      accuracy = groupInfo[groupId].data.accuracy;
    }
    return accuracy;
  },
);

export const selectCurrentGroupSettings = createSelector(
  selectCurrentGroupId,
  selectGroupInfo,
  (groupId, groupInfo) => {
    let settings = null;
    if (
      groupInfo &&
      groupInfo[groupId] &&
      groupInfo[groupId].data &&
      groupInfo[groupId].data.settings
    ) {
      settings = groupInfo[groupId].data.settings;
    }
    return settings;
  },
);

export const selectCurrentGroupTargetInitialized = createSelector(
  selectCurrentGroupSettings,
  groupSettings => {
    let targetInitialized = false;
    if (groupSettings && groupSettings.target_initialized) {
      targetInitialized = groupSettings.target_initialized;
    }
    return targetInitialized;
  },
);

export const selectCurrentGroupBalances = createSelector(
  selectCurrentGroupId,
  selectGroupInfo,
  (groupId, groupInfo) => {
    let balances = null;
    if (
      groupInfo &&
      groupInfo[groupId] &&
      groupInfo[groupId].data &&
      groupInfo[groupId].data.balances
    ) {
      balances = groupInfo[groupId].data.balances;
    }
    return balances;
  },
);

export const selectCurrentGroupCash = createSelector(
  selectCurrentGroupBalances,
  selectCurrencies,
  selectCurrencyRates,
  (balances, currencies, rates) => {
    let cash = null;
    if (balances) {
      balances.forEach(balance => {
        // convert to CAD for now
        const preferredCurrency = currencies.find(
          currency => currency.code === 'CAD',
        ).id;
        // const preferredCurrency = groupInfo[group.id].data.preferredCurrency;
        if (balance.currency.id === preferredCurrency) {
          cash += parseFloat(balance.cash);
        } else {
          const conversionRate = rates.find(
            rate =>
              rate.src.id === balance.currency.id &&
              rate.dst.id === preferredCurrency,
          ).exchange_rate;
          cash += parseFloat(balance.cash * conversionRate);
        }
      });
    }
    return cash;
  },
);

export const selectCurrentGroupExcludedAssets = createSelector(
  selectCurrentGroupId,
  selectGroupInfo,
  (groupId, groupInfo) => {
    let excludedAssets = null;
    if (
      groupInfo &&
      groupInfo[groupId] &&
      groupInfo[groupId].data &&
      groupInfo[groupId].data.excluded_positions
    ) {
      excludedAssets = groupInfo[groupId].data.excluded_positions;
    }
    return excludedAssets;
  },
);

export const selectCurrentGroupQuotableSymbols = createSelector(
  selectCurrentGroupInfo,
  groupInfo => {
    if (groupInfo && groupInfo.quotable_symbols) {
      return groupInfo.quotable_symbols;
    }
    return null;
  },
);

export const selectCurrentGroupPositions = createSelector(
  selectCurrentGroupId,
  selectGroupInfo,
  selectCurrentGroupExcludedAssets,
  selectCurrentGroupQuotableSymbols,
  selectCurrencies,
  selectCurrencyRates,
  (groupId, groupInfo, excludedAssets, quotableSymbols, currencies, rates) => {
    let positions = null;
    if (
      groupInfo &&
      groupInfo[groupId] &&
      groupInfo[groupId].data &&
      groupInfo[groupId].data.positions
    ) {
      positions = groupInfo[groupId].data.positions;

      // const preferredCurrency = groupInfo[group.id].data.preferredCurrency;
      const preferredCurrency = currencies.find(
        currency => currency.code === 'CAD',
      ).id;

      positions.map(position => {
        position.excluded = excludedAssets.some(
          excludedAsset => excludedAsset.symbol === position.symbol.id,
        );
        position.quotable = quotableSymbols.some(
          quotableSymbol => quotableSymbol.id === position.symbol.id,
        );

        if (position.symbol.currency.id === preferredCurrency) {
          position.uniformEquity = position.units * parseFloat(position.price);
        } else {
          const conversionRate = rates.find(
            rate =>
              rate.src.id === position.symbol.currency.id &&
              rate.dst.id === preferredCurrency,
          ).exchange_rate;
          position.uniformEquity = parseFloat(
            position.units * position.price * conversionRate,
          );
        }
        return null;
      });

      let totalEquity = positions.reduce((total, position) => {
        if (!position.excluded && position.quotable) {
          return total + position.uniformEquity;
        }
        return total;
      }, 0);

      positions.map(position => {
        if (!position.excluded && position.quotable) {
          position.actualPercentage =
            (position.uniformEquity / totalEquity) * 100;
        }
        return null;
      });
    }
    return positions;
  },
);

export const selectCurrentGroupBalancedEquity = createSelector(
  selectCurrentGroupPositions,
  selectCurrencies,
  selectCurrencyRates,
  (positions, currencies, rates) => {
    if (!positions) {
      return null;
    }
    let total = 0;
    positions.forEach(position => {
      // convert to CAD for now
      const preferredCurrency = currencies.find(
        currency => currency.code === 'CAD',
      ).id;
      // const preferredCurrency = groupInfo[group.id].data.preferredCurrency;
      if (position.symbol.currency.id === preferredCurrency) {
        total += position.units * parseFloat(position.price);
      } else {
        const conversionRate = rates.find(
          rate =>
            rate.src.id === position.symbol.currency.id &&
            rate.dst.id === preferredCurrency,
        ).exchange_rate;
        total += parseFloat(position.units * position.price * conversionRate);
      }
    });
    return total;
  },
);

export const selectCurrentGroupExcludedEquity = createSelector(
  selectCurrentGroupId,
  selectGroupInfo,
  selectCurrencies,
  selectCurrencyRates,
  (groupId, groupInfo, currencies, rates) => {
    let excludedEquity = 0;
    try {
      const excludedPositionsIds = groupInfo[
        groupId
      ].data.excluded_positions.map(
        excluded_position => excluded_position.symbol,
      );

      const allPositions = groupInfo[groupId].data.positions;

      allPositions.forEach(position => {
        // Convert to CAD for now
        const preferredCurrency = currencies.find(
          currency => currency.code === 'CAD',
        ).id;

        if (excludedPositionsIds.includes(position.symbol.id)) {
          if (position.symbol.currency.id === preferredCurrency) {
            excludedEquity += position.units * parseFloat(position.price);
          } else {
            const conversionRate = rates.find(
              rate =>
                rate.src.id === position.symbol.currency.id &&
                rate.dst.id === preferredCurrency,
            ).exchange_rate;
            excludedEquity += parseFloat(
              position.units * position.price * conversionRate,
            );
          }
        }
      });
    } catch {
      return 0;
    }

    return excludedEquity;
  },
);

export const selectCurrentGroupTotalEquity = createSelector(
  selectCurrentGroupCash,
  selectCurrentGroupBalancedEquity,
  (cash, balancedEquity) => {
    if (cash !== null && balancedEquity !== null) {
      return cash + balancedEquity;
    } else {
      return null;
    }
  },
);

export const selectCurrentGroupTotalEquityExcludedRemoved = createSelector(
  selectCurrentGroupCash,
  selectCurrentGroupBalancedEquity,
  selectCurrentGroupExcludedEquity,
  (cash, balancedEquity, excludedEquity) => {
    if (cash === null || balancedEquity === null || excludedEquity === null) {
      return null;
    }
    return cash + balancedEquity - excludedEquity;
  },
);

export const selectCurrentGroupTrades = createSelector(
  selectCurrentGroupId,
  selectGroupInfo,
  (groupId, groupInfo) => {
    let trades = null;
    if (
      groupInfo &&
      groupInfo[groupId] &&
      groupInfo[groupId].data &&
      groupInfo[groupId].data.calculated_trades
    ) {
      trades = groupInfo[groupId].data.calculated_trades;
    }
    return trades;
  },
);

export const selectCurrentGroupSymbols = createSelector(
  selectCurrentGroupInfo,
  groupInfo => {
    if (groupInfo && groupInfo.symbols) {
      return groupInfo.symbols;
    }
    return null;
  },
);

export const selectTotalGroupHoldings = createSelector(
  selectGroups,
  selectGroupInfo,
  selectCurrencies,
  selectCurrencyRates,
  (groups, groupInfo, currencies, rates) => {
    let total = null;
    if (groups) {
      groups.forEach(group => {
        if (groupInfo && groupInfo[group.id] && groupInfo[group.id].data) {
          groupInfo[group.id].data.balances.forEach(balance => {
            // convert to CAD for now
            const preferredCurrency = currencies.find(
              currency => currency.code === 'CAD',
            ).id;
            // const preferredCurrency = groupInfo[group.id].data.preferredCurrency;
            if (balance.currency.id === preferredCurrency) {
              total += parseFloat(balance.cash);
            } else {
              const conversionRate = rates.find(
                rate =>
                  rate.src.id === balance.currency.id &&
                  rate.dst.id === preferredCurrency,
              ).exchange_rate;
              total += parseFloat(balance.cash * conversionRate);
            }
          });
          groupInfo[group.id].data.positions.forEach(position => {
            // convert to CAD for now
            const preferredCurrency = currencies.find(
              currency => currency.code === 'CAD',
            ).id;
            // const preferredCurrency = groupInfo[group.id].data.preferredCurrency;
            if (position.symbol.currency.id === preferredCurrency) {
              total += position.units * parseFloat(position.price);
            } else {
              const conversionRate = rates.find(
                rate =>
                  rate.src.id === position.symbol.currency.id &&
                  rate.dst.id === preferredCurrency,
              ).exchange_rate;
              total += parseFloat(
                position.units * position.price * conversionRate,
              );
            }
          });
        }
      });
    }

    return total;
  },
);

export const selectCurrentGroupTarget = createSelector(
  selectCurrentGroupInfo,
  selectCurrentGroupTotalEquity,
  selectCurrentGroupTotalEquityExcludedRemoved,
  selectCurrencyRates,
  selectCurrencies,
  (
    groupInfo,
    totalHoldings,
    totalHoldingsExcludedRemoved,
    rates,
    currencies,
  ) => {
    if (
      !groupInfo ||
      !groupInfo.target_positions ||
      totalHoldingsExcludedRemoved === null
    ) {
      return null;
    }

    // add the target positions
    const currentTargetRaw = groupInfo.target_positions;
    const currentTarget = currentTargetRaw.map(targetRaw => {
      const target = { ...targetRaw };
      // add the symbol to the target
      target.fullSymbol = groupInfo.symbols.find(
        symbol => symbol.id === target.symbol,
      );
      // add the actual percentage to the target
      const position = groupInfo.positions.find(
        p => p.symbol.id === target.symbol,
      );
      if (position) {
        const preferredCurrency = currencies.find(
          currency => currency.code === 'CAD',
        ).id;
        if (position.symbol.currency.id === preferredCurrency) {
          target.actualPercentage =
            ((position.price * position.units) / totalHoldingsExcludedRemoved) *
            100;
        } else {
          const conversionRate = rates.find(
            rate =>
              rate.src.id === position.symbol.currency.id &&
              rate.dst.id === preferredCurrency,
          ).exchange_rate;
          target.actualPercentage = parseFloat(
            ((position.price * position.units) / totalHoldingsExcludedRemoved) *
              100 *
              conversionRate,
          );
        }
      } else {
        target.actualPercentage = 0;
      }

      target.excluded = false;
      return target;
    });
    return currentTarget;
  },
);

export const selectCurrentGroupSetupComplete = createSelector(
  selectCurrentGroupTargetInitialized,
  selectCurrentGroupTarget,
  (targetInitialized, groupTarget) => {
    let setupComplete = false;
    if (targetInitialized && groupTarget && groupTarget.length > 0) {
      setupComplete = true;
    }
    return setupComplete;
  },
);

export const selectIsAuthorized = createSelector(
  selectAuthorizations,
  authorizations => {
    if (authorizations === undefined) {
      return true;
    }
    if (authorizations.length > 0) {
      return true;
    }
    return false;
  },
);

export const selectName = createSelector(
  selectSettings,
  settings => {
    if (settings) {
      return settings.name;
    }
    return null;
  },
);

export const selectIsUpdateServiceWorker = state => state.updateServiceWorker;

export const selectIsPaid = createSelector(
  selectSubscriptions,
  subscriptions => {
    if (!subscriptions) {
      return false;
    }
    return subscriptions.type !== 'free';
  },
);

export const selectIsFree = createSelector(
  selectIsPaid,
  isPaid => {
    return !isPaid;
  },
);

export const selectUserPermissions = createSelector(
  selectSubscriptions,
  subscriptions => {
    if (!subscriptions) {
      return null;
    }
    return subscriptions.permissions;
  },
);
