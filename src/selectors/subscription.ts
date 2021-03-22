import { createSelector } from 'reselect';
import ms from 'milliseconds';
import {
  selectLoggedIn,
  selectAppTime,
  selectHasQuestradeConnection,
  selectIsDemo,
} from './index';
import shouldUpdate from '../reactors/should-update';
import { AppState } from '../store';
import { selectQuestradeOfferFeature } from './features';

export const selectSubscriptionRaw = (state: AppState) => state.subscription;

export const selectSubscription = createSelector(
  selectSubscriptionRaw,
  (rawSubscription) => {
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
  (subscription) => {
    if (!subscription) {
      return null;
    }
    return subscription.permissions;
  },
);

export const selectIsPaid = createSelector(
  selectSubscription,
  (subscription) => {
    if (!subscription) {
      return false;
    }
    return subscription.type !== 'free';
  },
);

export const selectIsFree = createSelector(selectIsPaid, (isPaid) => {
  return !isPaid;
});

export const selectCanPlaceOrders = createSelector(
  selectUserPermissions,
  (permissions) => {
    if (!permissions) {
      return false;
    }
    return permissions.some((permission) => permission === 'can_place_orders');
  },
);

export const selectCanSeparateCurrencies = createSelector(
  selectUserPermissions,
  (permissions) => {
    if (!permissions) {
      return false;
    }
    return permissions.some(
      (permission) => permission === 'can_separate_currencies',
    );
  },
);

export const selectCanUseAPI = createSelector(
  selectUserPermissions,
  (permissions) => {
    if (!permissions) {
      return false;
    }
    return permissions.some((permission) => permission === 'can_use_api');
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

export const selectShowInvestingCourse = createSelector(
  selectIsDemo,
  (isDemo) => {
    return !isDemo;
  },
);
