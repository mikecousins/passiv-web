import { getData, postData } from '../api';

export const loginSucceeded = payload => ({
  type: 'LOGIN_SUCCEEDED',
  payload,
});

export const logoutStartedAsync = () => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, 1000);
  };
};

export const logout = () => ({
  type: 'LOGOUT',
});

export const tokenExpired = () => ({
  type: 'TOKEN_EXPIRED',
});

export const registerStartedAsync = payload => {
  return dispatch => {
    dispatch(registerStarted());
  };
};

export const registerStarted = payload => ({
  type: 'REGISTER_STARTED',
  payload,
});

export const registerFailed = payload => ({
  type: 'REGISTER_FAILED',
  payload,
});

export const toggleDemoMode = () => {
  return dispatch => {
    dispatch({ type: 'TOGGLE_DEMO_MODE' });
  };
};

export const loadAuthorizations = () => {
  return dispatch => {
    dispatch(fetchAuthorizationsStart());
    getData('/api/v1/authorizations')
      .then(response => dispatch(fetchAuthorizationsSuccess(response)))
      .catch(error => dispatch(fetchAuthorizationsError(error)));
  };
};

export const loadCurrencies = () => {
  return dispatch => {
    dispatch(fetchCurrenciesStart());
    getData('/api/v1/currencies/')
      .then(response => dispatch(fetchCurrenciesSuccess(response)))
      .catch(error => dispatch(fetchCurrenciesError(error)));
  };
};

export const loadCurrencyRates = () => {
  return dispatch => {
    dispatch(fetchCurrencyRatesStart());
    getData('/api/v1/currencies/rates/')
      .then(response => dispatch(fetchCurrencyRatesSuccess(response)))
      .catch(error => dispatch(fetchCurrencyRatesError(error)));
  };
};

export const loadGroups = () => {
  return dispatch => {
    dispatch(fetchGroupsStart());
    getData('/api/v1/portfolioGroups/')
      .then(response => {
        response.data.forEach(group => {
          dispatch(fetchGroupInfoStart(group.id));
          getData('/api/v1/portfolioGroups/' + group.id + '/info/')
            .then(r => dispatch(fetchGroupInfoSuccess(r, group.id)))
            .catch(e => dispatch(fetchGroupInfoError(e, group.id)));
        });
        return dispatch(fetchGroupsSuccess(response));
      })
      .catch(error => dispatch(fetchGroupsError(error)));
  };
};

export const loadGroupsList = () => {
  return dispatch => {
    dispatch(fetchGroupsStart());
    getData('/api/v1/portfolioGroups/')
      .then(response => {
        return dispatch(fetchGroupsSuccess(response));
      })
      .catch(error => dispatch(fetchGroupsError(error)));
  };
};

export const loadBrokerages = () => {
  return dispatch => {
    dispatch(fetchBrokeragesStart());
    getData('/api/v1/brokerages/')
      .then(response => dispatch(fetchBrokeragesSuccess(response)))
      .catch(error => dispatch(fetchBrokeragesError(error)));
  };
};

export const loadSettings = () => {
  return dispatch => {
    dispatch(fetchSettingsStart());
    getData('/api/v1/settings/')
      .then(response => dispatch(fetchSettingsSuccess(response)))
      .catch(error => dispatch(fetchSettingsError(error)));
  };
};

export const loadSubscriptions = () => {
  return dispatch => {
    dispatch(fetchSubscriptionsStart());
    getData('/api/v1/subscriptions/')
      .then(response => dispatch(fetchSubscriptionsSuccess(response)))
      .catch(error => dispatch(fetchSubscriptionsError(error)));
  };
};

export const loadPlans = () => {
  return dispatch => {
    dispatch(fetchPlansStart());
    getData('/api/v1/plans/')
      .then(response => dispatch(fetchPlansSuccess(response)))
      .catch(error => dispatch(fetchPlansError(error)));
  };
};

export const loadAccounts = () => {
  return dispatch => {
    dispatch(fetchAccountsStart());
    getData('/api/v1/accounts/')
      .then(response => {
        response.data.forEach(account => {
          dispatch(fetchAccountBalancesStart(account.id));
          getData('/api/v1/accounts/' + account.id + '/balances/')
            .then(r => dispatch(fetchAccountBalancesSuccess(r, account.id)))
            .catch(e => dispatch(fetchAccountBalancesError(e, account.id)));

          dispatch(fetchAccountPositionsStart(account.id));
          getData('/api/v1/accounts/' + account.id + '/positions/')
            .then(r => dispatch(fetchAccountPositionsSuccess(r, account.id)))
            .catch(e => dispatch(fetchAccountPositionsError(e, account.id)));
        });
        return dispatch(fetchAccountsSuccess(response));
      })
      .catch(error => dispatch(fetchAccountsError(error)));
  };
};

export const loadGroupDetails = payload => {
  return dispatch => {
    payload.ids.forEach(id => {
      dispatch(fetchGroupDetailsStart(id));
      getData(`/api/v1/portfolioGroups/${id}/`)
        .then(response => dispatch(fetchGroupDetailsSuccess(response, id)))
        .catch(error => dispatch(fetchGroupDetailsError(error, id)));
    });
  };
};

export const loadGroup = payload => {
  return dispatch => {
    payload.ids.forEach(id => {
      dispatch(fetchGroupInfoStart(id));
      getData(`/api/v1/portfolioGroups/${id}/info/`)
        .then(response => dispatch(fetchGroupInfoSuccess(response, id)))
        .catch(error => dispatch(fetchGroupInfoError(error, id)));
    });
  };
};

export const initialLoad = () => {
  return dispatch => {
    dispatch(fetchAuthorizationsStart());
    getData('/api/v1/authorizations')
      .then(response => dispatch(fetchAuthorizationsSuccess(response)))
      .catch(error => dispatch(fetchAuthorizationsError(error)));

    dispatch(fetchCurrenciesStart());
    getData('/api/v1/currencies/')
      .then(response => dispatch(fetchCurrenciesSuccess(response)))
      .catch(error => dispatch(fetchCurrenciesError(error)));

    dispatch(fetchCurrencyRatesStart());
    getData('/api/v1/currencies/rates/')
      .then(response => dispatch(fetchCurrencyRatesSuccess(response)))
      .catch(error => dispatch(fetchCurrencyRatesError(error)));

    dispatch(fetchGroupsStart());
    getData('/api/v1/portfolioGroups/')
      .then(response => {
        response.data.forEach(group => {
          dispatch(fetchGroupInfoStart(group.id));
          getData('/api/v1/portfolioGroups/' + group.id + '/info/')
            .then(r => dispatch(fetchGroupInfoSuccess(r, group.id)))
            .catch(e => dispatch(fetchGroupInfoError(e, group.id)));
        });
        return dispatch(fetchGroupsSuccess(response));
      })
      .catch(error => dispatch(fetchGroupsError(error)));

    dispatch(fetchBrokeragesStart());
    getData('/api/v1/brokerages/')
      .then(response => dispatch(fetchBrokeragesSuccess(response)))
      .catch(error => dispatch(fetchBrokeragesError(error)));

    dispatch(fetchSettingsStart());
    getData('/api/v1/settings/')
      .then(response => dispatch(fetchSettingsSuccess(response)))
      .catch(error => dispatch(fetchSettingsError(error)));

    dispatch(fetchSubscriptionsStart());
    getData('/api/v1/subscriptions/')
      .then(response => dispatch(fetchSubscriptionsSuccess(response)))
      .catch(error => dispatch(fetchSubscriptionsError(error)));

    dispatch(fetchPlansStart());
    getData('/api/v1/plans/')
      .then(response => dispatch(fetchPlansSuccess(response)))
      .catch(error => dispatch(fetchPlansError(error)));

    dispatch(fetchAccountsStart());
    getData('/api/v1/accounts/')
      .then(response => dispatch(fetchAccountsSuccess(response)))
      .catch(error => dispatch(fetchAccountsError(error)));
  };
};

export const fetchAuthorizationsStart = () => ({
  type: 'FETCH_AUTHORIZATIONS_START',
});

export const fetchAuthorizationsSuccess = payload => ({
  type: 'FETCH_AUTHORIZATIONS_SUCCESS',
  payload,
});

export const fetchAuthorizationsError = payload => ({
  type: 'FETCH_AUTHORIZATIONS_ERROR',
  payload,
});

export const fetchCurrenciesStart = () => ({
  type: 'FETCH_CURRENCIES_START',
});

export const fetchCurrenciesSuccess = payload => ({
  type: 'FETCH_CURRENCIES_SUCCESS',
  payload,
});

export const fetchCurrenciesError = payload => ({
  type: 'FETCH_CURRENCIES_ERROR',
  payload,
});

export const fetchCurrencyRatesStart = () => ({
  type: 'FETCH_CURRENCY_RATES_START',
});

export const fetchCurrencyRatesSuccess = payload => ({
  type: 'FETCH_CURRENCY_RATES_SUCCESS',
  payload,
});

export const fetchCurrencyRatesError = payload => ({
  type: 'FETCH_CURRENCY_RATES_ERROR',
  payload,
});

export const fetchGroupsStart = () => ({
  type: 'FETCH_GROUPS_START',
});

export const fetchGroupsSuccess = payload => ({
  type: 'FETCH_GROUPS_SUCCESS',
  payload,
});

export const fetchGroupsError = payload => ({
  type: 'FETCH_GROUPS_ERROR',
  payload,
});

export const fetchBrokeragesStart = () => ({
  type: 'FETCH_BROKERAGES_START',
});

export const fetchBrokeragesSuccess = payload => ({
  type: 'FETCH_BROKERAGES_SUCCESS',
  payload,
});

export const fetchBrokeragesError = payload => ({
  type: 'FETCH_BROKERAGES_ERROR',
  payload,
});

export const fetchSettingsStart = () => ({
  type: 'FETCH_SETTINGS_START',
});

export const fetchSettingsSuccess = payload => ({
  type: 'FETCH_SETTINGS_SUCCESS',
  payload,
});

export const fetchSettingsError = payload => ({
  type: 'FETCH_SETTINGS_ERROR',
  payload,
});

export const fetchSubscriptionsStart = () => ({
  type: 'FETCH_SUBSCRIPTIONS_START',
});

export const fetchSubscriptionsSuccess = payload => ({
  type: 'FETCH_SUBSCRIPTIONS_SUCCESS',
  payload,
});

export const fetchSubscriptionsError = payload => ({
  type: 'FETCH_SUBSCRIPTIONS_ERROR',
  payload,
});

export const fetchPlansStart = () => ({
  type: 'FETCH_PLANS_START',
});
export const fetchPlansSuccess = payload => ({
  type: 'FETCH_PLANS_SUCCESS',
  payload,
});
export const fetchPlansError = payload => ({
  type: 'FETCH_PLANS_ERROR',
  payload,
});

export const fetchAccountsStart = () => ({
  type: 'FETCH_ACCOUNTS_START',
});

export const fetchAccountsSuccess = payload => ({
  type: 'FETCH_ACCOUNTS_SUCCESS',
  payload,
});

export const fetchAccountsError = payload => ({
  type: 'FETCH_ACCOUNTS_ERROR',
  payload,
});

export const fetchAccountBalancesStart = id => ({
  type: 'FETCH_ACCOUNT_BALANCES_START',
  id,
});

export const fetchAccountBalancesSuccess = (payload, id) => ({
  type: 'FETCH_ACCOUNT_BALANCES_SUCCESS',
  payload,
  id,
});

export const fetchAccountBalancesError = (payload, id) => ({
  type: 'FETCH_ACCOUNT_BALANCES_ERROR',
  payload,
  id,
});

export const fetchAccountPositionsStart = id => ({
  type: 'FETCH_ACCOUNT_POSITIONS_START',
  id,
});

export const fetchAccountPositionsSuccess = (payload, id) => ({
  type: 'FETCH_ACCOUNT_POSITIONS_SUCCESS',
  payload,
  id,
});

export const fetchAccountPositionsError = (payload, id) => ({
  type: 'FETCH_ACCOUNT_POSITIONS_ERROR',
  payload,
  id,
});

export const fetchGroupDetailsStart = id => ({
  type: 'FETCH_GROUP_DETAILS_START',
  id,
});

export const fetchGroupDetailsSuccess = (payload, id) => ({
  type: 'FETCH_GROUP_DETAILS_SUCCESS',
  payload,
  id,
});

export const fetchGroupDetailsError = (payload, id) => ({
  type: 'FETCH_GROUP_DETAILS_ERROR',
  payload,
  id,
});

export const fetchGroupInfoStart = id => ({
  type: 'FETCH_GROUP_INFO_START',
  id,
});

export const fetchGroupInfoSuccess = (payload, id) => ({
  type: 'FETCH_GROUP_INFO_SUCCESS',
  payload,
  id,
});

export const fetchGroupInfoError = (payload, id) => ({
  type: 'FETCH_GROUP_INFO_ERROR',
  payload,
  id,
});

export const importTargetStart = payload => ({
  type: 'IMPORT_TARGET_START',
  payload,
});

export const importTargetSuccess = payload => ({
  type: 'IMPORT_TARGET_SUCCESS',
  payload,
});

export const importTargetError = payload => ({
  type: 'IMPORT_TARGET_ERROR',
  payload,
});

export const importTarget = groupId => {
  return dispatch => {
    dispatch(importTargetStart);
    postData('/api/v1/portfolioGroups/' + groupId + '/import/')
      .then(response => dispatch(importTargetSuccess(response)))
      .catch(error => dispatch(importTargetError(error)));
  };
};

export const updateServiceWorker = () => ({
  type: 'UPDATE_SERVICE_WORKER',
});
