import { createSelector } from 'reselect';
import ms from 'milliseconds';
import jwtDecode from 'jwt-decode';
import shouldUpdate from '../reactors/should-update';

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
