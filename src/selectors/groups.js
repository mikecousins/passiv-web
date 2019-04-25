import { createSelector } from 'reselect';
import {
  selectGroupsRaw,
  selectCurrentGroupId,
  selectAccounts,
  selectAccountBalances,
  selectAccountPositions,
} from './index';

export const selectGroupsLoading = createSelector(
  selectGroupsRaw,
  rawGroups => rawGroups.loading,
);

export const selectCurrentGroupAccountHoldings = createSelector(
  selectCurrentGroupId,
  selectAccounts,
  selectAccountBalances,
  selectAccountPositions,
  (groupId, accounts, accountBalances, accountPositions) => {
    const accountHoldings = [];
    if (!groupId || !accounts || !accountBalances || !accountPositions) {
      return accountHoldings;
    }
    accounts.forEach(account => {
      if (account.portfolio_group === groupId) {
        let positions = null;
        if (accountPositions[account.id]) {
          positions = accountPositions[account.id].data;
        }
        accountHoldings.push({
          name: account.name,
          number: account.number,
          type: account.meta.type,
          positions,
        });
      }
    });
    return accountHoldings;
  },
);
