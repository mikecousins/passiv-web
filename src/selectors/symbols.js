import { createSelector } from 'reselect';
import { selectGroups, selectGroupInfo } from './groups';

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
