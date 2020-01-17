import { createSelector } from 'reselect';
import ms from 'milliseconds';
import shouldUpdate from '../reactors/should-update';
import { AppState } from '../store';
import { Currency } from '../types/currency';
import { SimpleState } from '../types/common';

// have to require this for Typescript to work properly.....
// hopefully we can import this in the future
var jwtDecode = require('jwt-decode');

export const selectState = (state: AppState) => state;

export const selectAppTime = (state: AppState) => state.appTime;

export const selectLoggedIn = (state: AppState) => !!state.auth.token;

export const selectToken = (state: AppState) => state.auth.token;

export const selectTokenMinutesRemaining = createSelector(
  selectToken,
  selectAppTime,
  (token, now) => {
    if (!token) {
      return 0;
    }
    const decodedToken = jwtDecode(token);
    const expiry = ms.seconds(decodedToken.exp);
    return (expiry - now) / (1000 * 60);
  },
);

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

export const selectCurrenciesRaw = (state: AppState) => state.currencies;

export const selectFeaturesRaw = (state: AppState) => state.features;

export const selectBrokeragesRaw = (state: AppState) => state.brokerages;

export const selectAuthorizationsRaw = (state: AppState) =>
  state.authorizations;

export const selectFeatures = createSelector(selectFeaturesRaw, rawFeatures => {
  if (rawFeatures.data) {
    return rawFeatures.data.map(feature => feature.name);
  }
  return null;
});

export const selectFeaturesNeedData = createSelector(
  selectLoggedIn,
  selectFeaturesRaw,
  selectAppTime,
  (loggedIn, rawFeatures, time) => {
    if (!loggedIn) {
      return false;
    }
    return shouldUpdate(rawFeatures, {
      staleTime: ms.minutes(30),
      now: time,
    });
  },
);

const createFeatureSelector = (flagName: string) => {
  return createSelector(selectFeatures, features => {
    let hasFeature = false;
    if (features != null) {
      features.map(feature => {
        if (feature === flagName) {
          hasFeature = true;
        }
        return null;
      });
    }
    return hasFeature;
  });
};

export const selectConnectPlaidFeature = createFeatureSelector('connect_plaid');

export const selectQuestradeOfferFeature = createFeatureSelector(
  'questrade_offer',
);

export const selectCurrencies = createSelector<
  AppState,
  SimpleState<Currency[]>,
  Currency[] | null
>(selectCurrenciesRaw, rawCurrencies => {
  if (rawCurrencies.data) {
    return rawCurrencies.data;
  }
  return null;
});

export const selectCurrenciesNeedData = createSelector<
  AppState,
  boolean,
  SimpleState<Currency[]>,
  number,
  boolean
>(
  selectLoggedIn,
  selectCurrenciesRaw,
  selectAppTime,
  (loggedIn, rawCurrencies, time) => {
    if (!loggedIn) {
      return false;
    }
    return shouldUpdate(rawCurrencies, {
      staleTime: ms.days(1),
      now: time,
    });
  },
);

export const selectSettingsRaw = (state: AppState) => state.settings;

export const selectSettings = createSelector(selectSettingsRaw, rawSettings => {
  if (rawSettings.data) {
    return rawSettings.data;
  }
});

export const select2FAEnabled = createSelector(selectSettings, settings => {
  if (settings) {
    return settings.sms_2fa_enabled;
  }
});

export const selectPhoneNumber = createSelector(selectSettings, settings => {
  if (settings) {
    return settings.phone_number;
  }
});

export const selectIsDemo = createSelector(selectSettings, settings => {
  if (settings) {
    return settings.demo;
  }
});

export const selectBrokerages = createSelector(
  selectBrokeragesRaw,
  selectIsDemo,
  (rawBrokerages, isDemo) => {
    if (rawBrokerages.data) {
      let brokerages = rawBrokerages.data;
      if (!isDemo) {
        brokerages = brokerages.filter(b => b.enabled === true);
      }
      return brokerages;
    }
  },
);

export const selectAllBrokerages = createSelector(
  selectBrokeragesRaw,
  rawBrokerages => {
    return rawBrokerages.data;
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
      staleTime: ms.days(1),
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

export const selectHasQuestradeConnection = createSelector(
  selectAuthorizations,
  authorizations => {
    if (authorizations) {
      return authorizations.some(a => a.brokerage.name === 'Questrade');
    } else {
      return false;
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

export const selectPlansRaw = (state: AppState) => state.plans;

export const selectPlans = createSelector(selectPlansRaw, rawPlans => {
  if (rawPlans.data) {
    return rawPlans.data;
  }
});

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

export const selectIsDemoMode = (state: AppState) => state.demo;

export const selectRouter = (state: AppState) => state.router;

export const selectCurrencyRatesRaw = (state: AppState) => state.currencyRates;

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

export const selectPasswordResetToken = createSelector(selectRouter, router => {
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
});

export const selectHelpArticleSlug = createSelector(selectRouter, router => {
  let slug = null;
  if (
    router &&
    router.location &&
    router.location.pathname &&
    router.location.pathname.split('/').length === 5
  ) {
    slug = router.location.pathname.split('/')[4];
  }
  return slug;
});

export const selectHelpArticlesRaw = (state: AppState) => state.helpArticles;

export const selectHelpArticles = createSelector(
  selectHelpArticlesRaw,
  helpArticlesRaw => {
    if (helpArticlesRaw.data) {
      return helpArticlesRaw.data;
    }
  },
);

export const selectHelpArticlesNeedData = createSelector(
  selectHelpArticlesRaw,
  selectAppTime,
  (rawHelpArticles, time) => {
    return shouldUpdate(rawHelpArticles, {
      staleTime: ms.minutes(10),
      now: time,
    });
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

export const selectShowInsecureApp = createSelector(
  selectLoggedIn,
  loggedIn => {
    return loggedIn === false;
  },
);

export const selectShowOnboardingApp = createSelector(
  selectShowInsecureApp,
  selectIsAuthorized,
  (showInsecureApp, isAuthorized) => {
    if (showInsecureApp) {
      return false;
    }
    return !isAuthorized;
  },
);

export const selectShowSecureApp = createSelector(
  selectShowInsecureApp,
  selectShowOnboardingApp,
  (showInsecureApp, showOnboardingApp) => {
    if (showInsecureApp || showOnboardingApp) {
      return false;
    }
    return true;
  },
);

export const selectOnboardingPage = createSelector(
  selectShowOnboardingApp,
  selectIsAuthorized,
  (showOnboardingApp, isAuthorized) => {
    if (!showOnboardingApp) {
      return undefined;
    }
    if (!isAuthorized) {
      return 'authorization';
    }
    return 'other';
  },
);

export const selectName = createSelector(selectSettings, settings => {
  if (settings) {
    return settings.name;
  }
  return null;
});

export const selectIsUpdateServiceWorker = (state: AppState) =>
  state.updateServiceWorker;
