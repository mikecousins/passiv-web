import { createSelector } from 'reselect';
import { selectGroupsRaw } from './index';

export const selectGroupsLoading = createSelector(
  selectGroupsRaw,
  rawGroups => rawGroups.loading,
);
