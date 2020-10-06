import { createSelector } from 'reselect';
import ms from 'milliseconds';
import {
  selectLoggedIn,
  selectAppTime,
  selectQuestradeOfferFeature,
  selectHasQuestradeConnection,
  selectIsDemo,
} from './index';
import shouldUpdate from '../reactors/should-update';
import { AppState } from '../store';

export const selectSubscriptionRaw = (state: AppState) => state.subscription;

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

export const selectIsPaid = createSelector(selectSubscription, subscription => {
  if (!subscription) {
    return false;
  }
  return subscription.type !== 'free';
});

export const selectIsFree = createSelector(selectIsPaid, isPaid => {
  return !isPaid;
});

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
    return permissions.some(
      permission => permission === 'can_change_account_portfolio_group',
    );
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

export const selectCanReceiveDriftNotifications = createSelector(
  selectUserPermissions,
  permissions => {
    if (!permissions) {
      return false;
    }
    return permissions.some(
      permission => permission === 'can_receive_drift_notifications',
    );
  },
);

export const selectCanReceiveCashNotifications = createSelector(
  selectUserPermissions,
  permissions => {
    if (!permissions) {
      return false;
    }
    return permissions.some(
      permission => permission === 'can_receive_cash_notifications',
    );
  },
);

export const selectCanSeparateCurrencies = createSelector(
  selectUserPermissions,
  permissions => {
    if (!permissions) {
      return false;
    }
    return permissions.some(
      permission => permission === 'can_separate_currencies',
    );
  },
);

export const selectCanCreatePortfolioGroup = createSelector(
  selectUserPermissions,
  permissions => {
    if (!permissions) {
      return false;
    }
    return permissions.some(
      permission => permission === 'can_create_portfolio_group',
    );
  },
);

export const selectCanDeletePortfolioGroup = createSelector(
  selectUserPermissions,
  permissions => {
    if (!permissions) {
      return false;
    }
    return permissions.some(
      permission => permission === 'can_delete_portfolio_group',
    );
  },
);

export const selectCanUseAPI = createSelector(
  selectUserPermissions,
  permissions => {
    if (!permissions) {
      return false;
    }
    return permissions.some(permission => permission === 'can_use_api');
  },
);

export const selectShowQuestradeOffer = createSelector(
  selectQuestradeOfferFeature,
  selectHasQuestradeConnection,
  selectIsDemo,
  selectIsPaid,
  (questradeOfferFeatureActive, hasQuestradeConnection, isDemo, isPaid) => {
    let showOffer = false;
    if (
      !isDemo &&
      !isPaid &&
      questradeOfferFeatureActive &&
      hasQuestradeConnection
    ) {
      showOffer = true;
    }
    return showOffer;
  },
);
