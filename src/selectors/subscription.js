import { createSelector } from 'reselect';
import ms from 'milliseconds';
import { selectLoggedIn, selectAppTime } from './index';
import shouldUpdate from '../reactors/should-update';

export const selectSubscriptionRaw = state => state.subscription;

export const selectSubscription = createSelector(
  selectSubscriptionRaw,
  rawSubscription => {
    if (rawSubscription.data) {
      return rawSubscription.data;
    }
  },
);

export const selectSubscriptionNeedData = createSelector(
  selectLoggedIn,
  selectSubscriptionRaw,
  selectAppTime,
  (loggedIn, rawSubscription, time) => {
    if (!loggedIn) {
      return false;
    }
    return shouldUpdate(rawSubscription, {
      staleTime: ms.minutes(10),
      now: time,
    });
  },
);

export const selectUserPermissions = createSelector(
  selectSubscription,
  subscription => {
    if (!subscription) {
      return null;
    }
    return subscription.permissions;
  },
);

export const selectIsPaid = createSelector(
  selectSubscription,
  subscription => {
    if (!subscription) {
      return false;
    }
    return subscription.type !== 'free';
  },
);

export const selectIsFree = createSelector(
  selectIsPaid,
  isPaid => {
    return !isPaid;
  },
);

export const selectCanPlaceOrders = createSelector(
  selectUserPermissions,
  permissions => {
    if (!permissions) {
      return false;
    }
    return permissions.some(permission => permission === 'can_place_orders');
  },
);

export const selectCanCrossAccountBalance = createSelector(
  selectUserPermissions,
  permissions => {
    if (!permissions) {
      return false;
    }
    // TODO fix this flag when it exists in the API
    return permissions.some(permission => permission === 'can_place_orders');
  },
);

export const selectCanAddMulitpleConnections = createSelector(
  selectUserPermissions,
  permissions => {
    if (!permissions) {
      return false;
    }
    return permissions.some(
      permission => permission === 'can_add_multiple_connections',
    );
  },
);

export const selectCanExcludeAssets = createSelector(
  selectUserPermissions,
  permissions => {
    if (!permissions) {
      return false;
    }
    return permissions.some(permission => permission === 'can_exclude_assets');
  },
);
