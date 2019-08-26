import { createSelector } from 'reselect';
import ms from 'milliseconds';
import {
  selectLoggedIn,
  selectAppTime,
  selectCurrencies,
  selectCurrencyRates,
  selectRouter,
  selectState,
} from './index';
import {
  selectAccounts,
  selectAccountBalances,
  selectAccountPositions,
} from './accounts';
import { selectIsEditMode } from './router';
import shouldUpdate from '../reactors/should-update';
import { AppState } from '../store';
import { CalculatedTrades, BrokerageAuthorization } from '../types/groupInfo';
import { createMatchSelector } from 'connected-react-router';

export const selectGroupsRaw = (state: AppState) => state.groups;

export const selectGroupInfo = (state: AppState) => state.groupInfo;

export const selectGroups = createSelector(
  selectGroupsRaw,
  selectGroupInfo,
  selectAccounts,
  (rawGroups, groupInfo, accounts) => {
    if (rawGroups.data) {
      return rawGroups.data.map(group => {
        const groupWithRebalance = group;
        if (groupInfo[group.id] && groupInfo[group.id].data) {
          if (
            groupInfo[group.id].data!.settings.target_initialized &&
            groupInfo[group.id].data!.target_positions.length > 0
          ) {
            groupWithRebalance.setupComplete = true;
          } else {
            groupWithRebalance.setupComplete = false;
          }
          groupWithRebalance.rebalance = !!(
            groupInfo[group.id].data!.calculated_trades &&
            groupInfo[group.id].data!.calculated_trades.trades.length > 0
          );
        }

        if (groupInfo[group.id]) {
          groupWithRebalance.loading = groupInfo[group.id].loading;
        }

        groupWithRebalance.hasAccounts = false;
        if (accounts) {
          let groupAccounts = accounts.filter(
            account => account.portfolio_group === group.id,
          );

          if (groupAccounts.length > 0 && accounts) {
            groupWithRebalance.hasAccounts = true;
          }
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

export const selectCurrentGroupId = createSelector(
  selectRouter,
  router => {
    let groupId = null;
    if (
      router &&
      router.location &&
      router.location.pathname &&
      router.location.pathname.split('/').length >= 4
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
    if (data) {
      return data.error;
    }
    return null;
  },
);

export const selectGroupsLoading = createSelector(
  selectGroupsRaw,
  rawGroups => rawGroups.loading,
);

export const selectCurrentGroupAccuracy = createSelector(
  selectCurrentGroupId,
  selectGroupInfo,
  (groupId, groupInfo) => {
    let accuracy = null;
    if (
      groupId &&
      groupInfo &&
      groupInfo[groupId] &&
      groupInfo[groupId].data &&
      groupInfo[groupId].data!.accuracy >= 0
    ) {
      accuracy = groupInfo[groupId].data!.accuracy;
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
      groupId &&
      groupInfo &&
      groupInfo[groupId] &&
      groupInfo[groupId].data &&
      groupInfo[groupId].data!.settings
    ) {
      settings = groupInfo[groupId].data!.settings;
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
      groupId &&
      groupInfo &&
      groupInfo[groupId] &&
      groupInfo[groupId].data &&
      groupInfo[groupId].data!.balances
    ) {
      balances = groupInfo[groupId].data!.balances;
    }
    return balances;
  },
);

export const selectPreferredCurrency = createSelector(
  selectCurrencies,
  currencies => {
    if (!currencies) {
      return null;
    }
    const preferredCurrency = currencies.find(
      currency => currency.code === 'CAD',
    );
    if (!preferredCurrency) {
      return null;
    }
    return preferredCurrency.id;
  },
);

export const selectCurrentGroupCash = createSelector(
  selectCurrentGroupBalances,
  selectCurrencies,
  selectCurrencyRates,
  (balances, currencies, rates) => {
    if (balances && currencies) {
      let cash = 0;
      balances.forEach(balance => {
        // convert to CAD for now
        const preferredCurrency = currencies.find(
          currency => currency.code === 'CAD',
        );
        if (!preferredCurrency) {
          return;
        }
        // const preferredCurrency = groupInfo[group.id].data.preferredCurrency;
        if (balance.currency.id === preferredCurrency.id) {
          cash += balance.cash;
        } else {
          if (!rates) {
            return;
          }
          const conversionRate = rates.find(
            rate =>
              rate.src.id === balance.currency.id &&
              rate.dst.id === preferredCurrency.id,
          );
          if (!conversionRate) {
            return;
          }
          cash += balance.cash * conversionRate.exchange_rate;
        }
      });
      return cash;
    } else {
      return null;
    }
  },
);

export const selectCurrentGroupExcludedAssets = createSelector(
  selectCurrentGroupId,
  selectGroupInfo,
  (groupId, groupInfo) => {
    let excludedAssets = null;
    if (
      groupId &&
      groupInfo &&
      groupInfo[groupId] &&
      groupInfo[groupId].data &&
      groupInfo[groupId].data!.excluded_positions
    ) {
      excludedAssets = groupInfo[groupId].data!.excluded_positions;
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
      groupId &&
      groupInfo &&
      groupInfo[groupId] &&
      groupInfo[groupId].data &&
      groupInfo[groupId].data!.positions &&
      excludedAssets &&
      quotableSymbols &&
      currencies &&
      rates
    ) {
      positions = groupInfo[groupId].data!.positions;

      // const preferredCurrency = groupInfo[group.id].data.preferredCurrency;
      const preferredCurrency = currencies.find(
        currency => currency.code === 'CAD',
      );

      if (!preferredCurrency) {
        return null;
      }

      positions.map(position => {
        position.excluded = excludedAssets.some(
          excludedAsset => excludedAsset.symbol === position.symbol.id,
        );
        position.quotable = quotableSymbols.some(
          quotableSymbol => quotableSymbol.id === position.symbol.id,
        );

        if (position.symbol.currency.id === preferredCurrency.id) {
          position.uniformEquity = position.units * position.price;
        } else {
          const conversionRate = rates.find(
            rate =>
              rate.src.id === position.symbol.currency.id &&
              rate.dst.id === preferredCurrency.id,
          );
          if (!conversionRate) {
            return null;
          }
          position.uniformEquity =
            position.units * position.price * conversionRate.exchange_rate;
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
    if (!positions || !currencies || !rates) {
      return null;
    }
    let total = 0;
    positions.forEach(position => {
      // convert to CAD for now
      const preferredCurrency = currencies.find(
        currency => currency.code === 'CAD',
      );
      if (!preferredCurrency) {
        return;
      }
      // const preferredCurrency = groupInfo[group.id].data.preferredCurrency;
      if (position.symbol.currency.id === preferredCurrency.id) {
        total += position.units * position.price;
      } else {
        const conversionRate = rates.find(
          rate =>
            rate.src.id === position.symbol.currency.id &&
            rate.dst.id === preferredCurrency.id,
        );
        if (!conversionRate) {
          return;
        }
        total += position.units * position.price * conversionRate.exchange_rate;
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

    if (
      !groupId ||
      !groupInfo ||
      !groupInfo[groupId] ||
      !groupInfo[groupId].data ||
      !groupInfo[groupId].data!.excluded_positions ||
      !currencies ||
      !rates
    ) {
      return excludedEquity;
    }

    const excludedPositionsIds = groupInfo[
      groupId
    ].data!.excluded_positions.map(
      excluded_position => excluded_position.symbol,
    );

    const allPositions = groupInfo[groupId].data!.positions;

    allPositions.forEach(position => {
      // Convert to CAD for now
      const preferredCurrency = currencies.find(
        currency => currency.code === 'CAD',
      );

      if (!preferredCurrency) {
        return;
      }

      if (excludedPositionsIds.includes(position.symbol.id)) {
        if (position.symbol.currency.id === preferredCurrency.id) {
          excludedEquity += position.units * position.price;
        } else {
          const conversionRate = rates.find(
            rate =>
              rate.src.id === position.symbol.currency.id &&
              rate.dst.id === preferredCurrency.id,
          );
          if (!conversionRate) {
            return;
          }
          excludedEquity +=
            position.units * position.price * conversionRate.exchange_rate;
        }
      }
    });

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
      groupId &&
      groupInfo &&
      groupInfo[groupId] &&
      groupInfo[groupId].data &&
      groupInfo[groupId].data!.calculated_trades
    ) {
      trades = groupInfo[groupId].data!.calculated_trades;
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
  selectPreferredCurrency,
  (groups, groupInfo, currencies, rates, preferredCurrency) => {
    let total = 0;
    if (groups && rates && currencies) {
      groups.forEach(group => {
        if (
          groupInfo &&
          groupInfo[group.id] &&
          groupInfo[group.id].data &&
          groupInfo[group.id].data!.balances
        ) {
          groupInfo[group.id].data!.balances.forEach(balance => {
            if (balance.currency.id === preferredCurrency) {
              total += balance.cash;
            } else {
              const conversionRate = rates.find(
                rate =>
                  rate.src.id === balance.currency.id &&
                  rate.dst.id === preferredCurrency,
              );
              if (!conversionRate) {
                return;
              }
              total += balance.cash * conversionRate.exchange_rate;
            }
          });
          groupInfo[group.id].data!.positions.forEach(position => {
            if (position.symbol.currency.id === preferredCurrency) {
              total += position.units * position.price;
            } else {
              const conversionRate = rates.find(
                rate =>
                  rate.src.id === position.symbol.currency.id &&
                  rate.dst.id === preferredCurrency,
              );
              if (!conversionRate) {
                return;
              }
              total +=
                position.units * position.price * conversionRate.exchange_rate;
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
  selectCurrentGroupTotalEquityExcludedRemoved,
  selectCurrencyRates,
  selectPreferredCurrency,
  (groupInfo, totalHoldingsExcludedRemoved, rates, preferredCurrency) => {
    if (
      !groupInfo ||
      !groupInfo.target_positions ||
      totalHoldingsExcludedRemoved === null ||
      !rates
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
        if (position.symbol.currency.id === preferredCurrency) {
          target.actualPercentage =
            ((position.price * position.units) / totalHoldingsExcludedRemoved) *
            100;
        } else {
          const conversionRate = rates.find(
            rate =>
              rate.src.id === position.symbol.currency.id &&
              rate.dst.id === preferredCurrency,
          );
          if (!conversionRate) {
            return null;
          }
          target.actualPercentage =
            ((position.price * position.units) / totalHoldingsExcludedRemoved) *
            100 *
            conversionRate.exchange_rate;
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

export const selectCurrentAccountId = createSelector(
  selectState,
  state => {
    const matchSelector = createMatchSelector<
      any,
      { groupId?: string; accountId?: string }
    >('/app/group/:groupId/account/:accountId');
    const match = matchSelector(state);
    const id = match && match.params.accountId;
    return id;
  },
);

export const selectCurrentAccountHoldings = createSelector(
  selectCurrentAccountId,
  selectAccounts,
  selectAccountBalances,
  selectAccountPositions,
  (accountId, accounts, accountBalances, accountPositions) => {
    if (!accountId || !accounts || !accountBalances || !accountPositions) {
      return null;
    }
    const account = accounts.find(a => a.id === accountId);
    if (!account) {
      return null;
    }

    let positions = null;
    if (accountPositions[account.id]) {
      positions = accountPositions[account.id].data;
    }
    return {
      id: account.id,
      name: account.name,
      number: account.number,
      type: account.meta.type,
      positions,
    };
  },
);

export const selectCurrentGroup = createSelector(
  selectGroups,
  selectAccounts,
  selectAccountBalances,
  selectCurrentGroupId,
  (groups, accounts, balances, groupId) => {
    let group:
      | {
          id: string;
          name: string;
          accounts?: any[];
        }
      | undefined = undefined;
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

export interface DashboardGroup {
  id: string;
  name: string;
  totalCash: number;
  totalHoldings: number;
  totalValue: number | null;
  accuracy?: number;
  setupComplete?: boolean;
  rebalance?: boolean;
  hasAccounts?: boolean;
  hasSells?: boolean;
  trades?: CalculatedTrades;
  brokerage_authorizations?: BrokerageAuthorization[];
}

export const selectDashboardGroups = createSelector(
  selectGroups,
  selectGroupInfo,
  selectCurrencyRates,
  selectPreferredCurrency,
  (groups, groupInfo, rates, preferredCurrency) => {
    const fullGroups: DashboardGroup[] = [];
    if (!groups || !rates) {
      return fullGroups;
    }
    groups.forEach(g => {
      const group: DashboardGroup = {
        id: g.id,
        name: g.name,
        totalCash: 0,
        totalHoldings: 0,
        totalValue: null,
        hasSells: false,
      };
      if (groupInfo[group.id] && groupInfo[group.id].data) {
        const groupData = groupInfo[group.id].data!;
        groupData.balances.forEach(balance => {
          if (balance.currency.id === preferredCurrency) {
            group.totalCash += balance.cash;
          } else {
            const conversionRate = rates.find(
              rate =>
                rate.src.id === balance.currency.id &&
                rate.dst.id === preferredCurrency,
            );
            if (!conversionRate) {
              return;
            }
            group.totalCash += balance.cash * conversionRate.exchange_rate;
          }
        });
        groupData.positions.forEach(position => {
          if (position.symbol.currency.id === preferredCurrency) {
            group.totalHoldings += position.units * position.price;
          } else {
            const conversionRate = rates.find(
              rate =>
                rate.src.id === position.symbol.currency.id &&
                rate.dst.id === preferredCurrency,
            );
            if (!conversionRate) {
              return;
            }
            group.totalHoldings +=
              position.units * position.price * conversionRate.exchange_rate;
          }
        });
        group.accuracy = groupData.accuracy;
        if (
          groupData.settings.target_initialized &&
          groupData.target_positions.length > 0
        ) {
          group.setupComplete = true;
        } else {
          group.setupComplete = false;
        }
        group.rebalance = !!(
          groupData.calculated_trades &&
          groupData.calculated_trades.trades.length > 0
        );
        group.trades = groupData.calculated_trades;

        group.trades &&
          group.trades.trades.forEach(trade => {
            if (trade.action === 'SELL') {
              group.hasSells = true;
            }
          });
        group.brokerage_authorizations = groupData.brokerage_authorizations;
      }
      if (group.totalCash !== null && group.totalHoldings !== null) {
        group.totalValue = group.totalCash + group.totalHoldings;
      }

      if (g.hasAccounts) {
        group.hasAccounts = true;
      } else {
        group.hasAccounts = false;
      }

      fullGroups.push(group);
    });

    return fullGroups;
  },
);
