import { getData, postData } from '../api';

export const loginStartedAsync = payload => {
  return dispatch => {
    postData(
      'https://dev.getpassiv.com/api/v1/auth/login/',
      { email: payload.email, password: payload.password }
    )
      .then(response => dispatch(loginSucceeded(response)))
      .catch(error => dispatch(loginFailed(error)));
  };
};

export const loginSucceeded = payload => ({
  type: 'LOGIN_SUCCEEDED',
  payload,
});

export const loginFailed = () => ({
  type: 'LOGIN_FAILED',
});

export const logoutStartedAsync = () => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, 1000);
  }
}

export const logout = () => ({
  type: 'LOGOUT',
});

export const toggleDemoMode = () => {
  return dispatch => {
    dispatch({ type: 'TOGGLE_DEMO_MODE' });
  }
};

export const initialLoad = payload => {
  return dispatch => {
    dispatch(fetchCurrenciesStart);
    getData('https://dev.getpassiv.com/api/v1/currencies/', payload)
      .then(response => dispatch(fetchCurrenciesSuccess(response)))
      .catch(error => dispatch(fetchCurrenciesError(error)));

    dispatch(fetchGroupsStart);
    getData('https://dev.getpassiv.com/api/v1/portfolioGroups/', payload)
      .then(response => dispatch(fetchGroupsSuccess(response)))
      .catch(error => dispatch(fetchGroupsError(error)));

    dispatch(fetchSymbolsStart());
    getData('https://dev.getpassiv.com/api/v1/all_symbols/', payload)
      .then(response => dispatch(fetchSymbolsSuccess(response)))
      .catch(error => dispatch(fetchSymbolsError(error)));

    dispatch(fetchBrokeragesStart());
      getData('https://dev.getpassiv.com/api/v1/brokerages/', payload)
        .then(response => dispatch(fetchBrokeragesSuccess(response)))
        .catch(error => dispatch(fetchBrokeragesError(error)));

    dispatch(fetchAccountsStart());
    getData('https://dev.getpassiv.com/api/v1/accounts/', payload)
      .then(response => dispatch(fetchAccountsSuccess(response)))
      .catch(error => dispatch(fetchAccountsError(error)));

    dispatch(fetchAccountsStart());
    getData('https://dev.getpassiv.com/api/v1/accounts/', payload)
      .then(response => dispatch(fetchAccountsSuccess(response)))
      .catch(error => dispatch(fetchAccountsError(error)));
  };
};

export const loadCurrencies = payload => {
  return dispatch => {
    dispatch(fetchCurrenciesStart);
    getData('https://dev.getpassiv.com/api/v1/currencies/', payload)
      .then(response => dispatch(fetchCurrenciesSuccess(response)))
      .catch(error => dispatch(fetchCurrenciesError(error)));
  };
};

export const loadGroups = payload => {
  return dispatch => {
    dispatch(fetchGroupsStart);
    getData('https://dev.getpassiv.com/api/v1/portfolioGroups/', payload)
      .then(response => dispatch(fetchGroupsSuccess(response)))
      .catch(error => dispatch(fetchGroupsError(error)));
  };
};

export const loadSymbols = payload => {
  return dispatch => {
    dispatch(fetchSymbolsStart());
    getData('https://dev.getpassiv.com/api/v1/all_symbols/', payload)
      .then(response => dispatch(fetchSymbolsSuccess(response)))
      .catch(error => dispatch(fetchSymbolsError(error)));
  };
};

export const loadBrokerages = payload => {
  return dispatch => {
    dispatch(fetchBrokeragesStart());
    getData('https://dev.getpassiv.com/api/v1/brokerages/', payload)
      .then(response => dispatch(fetchBrokeragesSuccess(response)))
      .catch(error => dispatch(fetchBrokeragesError(error)));
  };
};

export const loadAccounts = payload => {
  return dispatch => {
    dispatch(fetchAccountsStart());
    getData('https://dev.getpassiv.com/api/v1/accounts/', payload)
      .then(response => dispatch(fetchAccountsSuccess(response)))
      .catch(error => dispatch(fetchAccountsError(error)));
  };
};

export const loadAccount = payload => {
  return dispatch => {
    payload.ids.forEach((id) => {
      dispatch(fetchAccountDetailsStart(id));
      getData(`https://dev.getpassiv.com/api/v1/accounts/${id}/`, payload.token)
        .then(response => dispatch(fetchAccountDetailsSuccess(response, id)))
        .catch(error => dispatch(fetchAccountDetailsError(error, id)));

      dispatch(fetchAccountBalancesStart(id));
      getData(`https://dev.getpassiv.com/api/v1/accounts/${id}/balances/`, payload.token)
        .then(response => dispatch(fetchAccountBalancesSuccess(response, id)))
        .catch(error => dispatch(fetchAccountBalancesError(error, id)));

      dispatch(fetchAccountPositionsStart(id));
      getData(`https://dev.getpassiv.com/api/v1/accounts/${id}/positions/`, payload.token)
        .then(response => dispatch(fetchAccountPositionsSuccess(response, id)))
        .catch(error => dispatch(fetchAccountPositionsError(error, id)));
    });
  };
};

export const loadGroup = payload => {
  return dispatch => {
    payload.ids.forEach((id) => {
      dispatch(fetchGroupAllocationsStart(id));
      getData(`https://dev.getpassiv.com/api/v1/portfolioGroups/${id}/targets/`, payload.token)
        .then(response => dispatch(fetchGroupAllocationsSuccess(response, id)))
        .catch(error => dispatch(fetchGroupAllocationsError(error, id)));

      dispatch(fetchGroupBalancesStart(id));
      getData(`https://dev.getpassiv.com/api/v1/portfolioGroups/${id}/balances/`, payload.token)
        .then(response => dispatch(fetchGroupBalancesSuccess(response, id)))
        .catch(error => dispatch(fetchGroupBalancesError(error, id)));

      dispatch(fetchGroupPositionsStart(id));
      getData(`https://dev.getpassiv.com/api/v1/portfolioGroups/${id}/positions/`, payload.token)
        .then(response => dispatch(fetchGroupPositionsSuccess(response, id)))
        .catch(error => dispatch(fetchGroupPositionsError(error, id)));

      dispatch(fetchGroupSettingsStart(id));
      getData(`https://dev.getpassiv.com/api/v1/portfolioGroups/${id}/settings/`, payload.token)
        .then(response => dispatch(fetchGroupSettingsSuccess(response, id)))
        .catch(error => dispatch(fetchGroupPositionsError(error, id)));
    });
  }
}

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

export const fetchSymbolsStart = () => ({
  type: 'FETCH_SYMBOLS_START',
});

export const fetchSymbolsSuccess = payload => ({
  type: 'FETCH_SYMBOLS_SUCCESS',
  payload,
});

export const fetchSymbolsError = payload => ({
  type: 'FETCH_SYMBOLS_ERROR',
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

export const fetchAccountDetailsStart = id => ({
  type: 'FETCH_ACCOUNT_DETAILS_START',
  id,
});

export const fetchAccountDetailsSuccess = (payload, id) => ({
  type: 'FETCH_ACCOUNT_DETAILS_SUCCESS',
  payload,
  id,
});

export const fetchAccountDetailsError = (payload, id) => ({
  type: 'FETCH_ACCOUNT_DETAILS_ERROR',
  payload,
  id,
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

export const fetchGroupAllocationsStart = id => ({
  type: 'FETCH_GROUP_ALLOCATIONS_START',
  id,
});

export const fetchGroupAllocationsSuccess = (payload, id) => ({
  type: 'FETCH_GROUP_ALLOCATIONS_SUCCESS',
  payload,
  id,
});

export const fetchGroupAllocationsError = (payload, id) => ({
  type: 'FETCH_GROUP_ALLOCATIONS_ERROR',
  payload,
  id,
});

export const fetchGroupBalancesStart = id => ({
  type: 'FETCH_GROUP_BALANCES_START',
  id,
});

export const fetchGroupBalancesSuccess = (payload, id) => ({
  type: 'FETCH_GROUP_BALANCES_SUCCESS',
  payload,
  id,
});

export const fetchGroupBalancesError = (payload, id) => ({
  type: 'FETCH_GROUP_BALANCES_ERROR',
  payload,
  id,
});

export const fetchGroupPositionsStart = id => ({
  type: 'FETCH_GROUP_POSITIONS_START',
  id,
});

export const fetchGroupPositionsSuccess = (payload, id) => ({
  type: 'FETCH_GROUP_POSITIONS_SUCCESS',
  payload,
  id,
});

export const fetchGroupPositionsError = (payload, id) => ({
  type: 'FETCH_GROUP_POSITIONS_ERROR',
  payload,
  id,
});

export const fetchGroupSettingsStart = id => ({
  type: 'FETCH_GROUP_SETTINGS_START',
  id,
});

export const fetchGroupSettingsSuccess = (payload, id) => ({
  type: 'FETCH_GROUP_SETTINGS_SUCCESS',
  payload,
  id,
});

export const fetchGroupSettingsError = (payload, id) => ({
  type: 'FETCH_GROUP_SETTINGS_ERROR',
  payload,
  id,
});
