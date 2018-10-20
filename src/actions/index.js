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
      dispatch(fetchAccountDetailsStart());
      getData(`https://dev.getpassiv.com/api/v1/accounts/${id}/`, payload.token)
        .then(response => dispatch(fetchAccountDetailsSuccess(response)))
        .catch(error => dispatch(fetchAccountDetailsError(error)));

      dispatch(fetchAccountBalancesStart());
      getData(`https://dev.getpassiv.com/api/v1/accounts/${id}/balances/`, payload.token)
        .then(response => dispatch(fetchAccountBalancesSuccess(response)))
        .catch(error => dispatch(fetchAccountBalancesError(error)));

      dispatch(fetchAccountPositionsStart());
      getData(`https://dev.getpassiv.com/api/v1/accounts/${id}/positions/`, payload.token)
        .then(response => dispatch(fetchAccountPositionsSuccess(response)))
        .catch(error => dispatch(fetchAccountPositionsError(error)));
    });
  };
};

export const loadGroup = payload => {
  return dispatch => {
    payload.ids.forEach((id) => {
      dispatch(fetchGroupAllocationsStart());
      getData(`https://dev.getpassiv.com/api/v1/portfolioGroups/${id}/assetsallocations/`, payload.token)
        .then(response => dispatch(fetchGroupAllocationsSuccess(response)))
        .catch(error => dispatch(fetchGroupAllocationsError(error)));

      dispatch(fetchGroupBalancesStart());
      getData(`https://dev.getpassiv.com/api/v1/portfolioGroups/${id}/balances/`, payload.token)
        .then(response => dispatch(fetchGroupBalancesSuccess(response)))
        .catch(error => dispatch(fetchGroupBalancesError(error)));

      dispatch(fetchGroupPositionsStart());
      getData(`https://dev.getpassiv.com/api/v1/portfolioGroups/${id}/positions/`, payload.token)
        .then(response => dispatch(fetchGroupPositionsSuccess(response)))
        .catch(error => dispatch(fetchGroupPositionsError(error)));

      dispatch(fetchGroupSettingsStart());
      getData(`https://dev.getpassiv.com/api/v1/portfolioGroups/${id}/settings/`, payload.token)
        .then(response => dispatch(fetchGroupSettingsSuccess(response)))
        .catch(error => dispatch(fetchGroupPositionsError(error)));
    });
  }
}

export const fetchCurrenciesStart = payload => ({
  type: 'FETCH_CURRENCIES_START',
  payload,
});

export const fetchCurrenciesSuccess = payload => ({
  type: 'FETCH_CURRENCIES_SUCCESS',
  payload,
});

export const fetchCurrenciesError = payload => ({
  type: 'FETCH_CURRENCIES_ERROR',
  payload,
});

export const fetchGroupsStart = payload => ({
  type: 'FETCH_GROUPS_START',
  payload,
});

export const fetchGroupsSuccess = payload => ({
  type: 'FETCH_GROUPS_SUCCESS',
  payload,
});

export const fetchGroupsError = payload => ({
  type: 'FETCH_GROUPS_ERROR',
  payload,
});

export const fetchSymbolsStart = payload => ({
  type: 'FETCH_SYMBOLS_START',
  payload,
});

export const fetchSymbolsSuccess = payload => ({
  type: 'FETCH_SYMBOLS_SUCCESS',
  payload,
});

export const fetchSymbolsError = payload => ({
  type: 'FETCH_SYMBOLS_ERROR',
  payload,
});

export const fetchBrokeragesStart = payload => ({
  type: 'FETCH_BROKERAGES_START',
  payload,
});

export const fetchBrokeragesSuccess = payload => ({
  type: 'FETCH_BROKERAGES_SUCCESS',
  payload,
});

export const fetchBrokeragesError = payload => ({
  type: 'FETCH_BROKERAGES_ERROR',
  payload,
});

export const fetchAccountsStart = payload => ({
  type: 'FETCH_ACCOUNTS_START',
  payload,
});

export const fetchAccountsSuccess = payload => ({
  type: 'FETCH_ACCOUNTS_SUCCESS',
  payload,
});

export const fetchAccountsError = payload => ({
  type: 'FETCH_ACCOUNTS_ERROR',
  payload,
});

export const fetchAccountDetailsStart = payload => ({
  type: 'FETCH_ACCOUNT_DETAILS_START',
  payload,
});

export const fetchAccountDetailsSuccess = payload => ({
  type: 'FETCH_ACCOUNT_DETAILS_SUCCESS',
  payload,
});

export const fetchAccountDetailsError = payload => ({
  type: 'FETCH_ACCOUNT_DETAILS_ERROR',
  payload,
});

export const fetchAccountBalancesStart = payload => ({
  type: 'FETCH_ACCOUNT_BALANCES_START',
  payload,
});

export const fetchAccountBalancesSuccess = payload => ({
  type: 'FETCH_ACCOUNT_BALANCES_SUCCESS',
  payload,
});

export const fetchAccountBalancesError = payload => ({
  type: 'FETCH_ACCOUNT_BALANCES_ERROR',
  payload,
});

export const fetchAccountPositionsStart = payload => ({
  type: 'FETCH_ACCOUNT_POSITIONS_START',
  payload,
});

export const fetchAccountPositionsSuccess = payload => ({
  type: 'FETCH_ACCOUNT_POSITIONS_SUCCESS',
  payload,
});

export const fetchAccountPositionsError = payload => ({
  type: 'FETCH_ACCOUNT_POSITIONS_ERROR',
  payload,
});

export const fetchGroupAllocationsStart = payload => ({
  type: 'FETCH_GROUP_ALLOCATIONS_START',
  payload,
});

export const fetchGroupAllocationsSuccess = payload => ({
  type: 'FETCH_GROUP_ALLOCATIONS_SUCCESS',
  payload,
});

export const fetchGroupAllocationsError = payload => ({
  type: 'FETCH_GROUP_ALLOCATIONS_ERROR',
  payload,
});

export const fetchGroupBalancesStart = payload => ({
  type: 'FETCH_GROUP_BALANCES_START',
  payload,
});

export const fetchGroupBalancesSuccess = payload => ({
  type: 'FETCH_GROUP_BALANCES_SUCCESS',
  payload,
});

export const fetchGroupBalancesError = payload => ({
  type: 'FETCH_GROUP_BALANCES_ERROR',
  payload,
});

export const fetchGroupPositionsStart = payload => ({
  type: 'FETCH_GROUP_POSITIONS_START',
  payload,
});

export const fetchGroupPositionsSuccess = payload => ({
  type: 'FETCH_GROUP_POSITIONS_SUCCESS',
  payload,
});

export const fetchGroupPositionsError = payload => ({
  type: 'FETCH_GROUP_POSITIONS_ERROR',
  payload,
});

export const fetchGroupSettingsStart = payload => ({
  type: 'FETCH_GROUP_SETTINGS_START',
  payload,
});

export const fetchGroupSettingsSuccess = payload => ({
  type: 'FETCH_GROUP_SETTINGS_SUCCESS',
  payload,
});

export const fetchGroupSettingsError = payload => ({
  type: 'FETCH_GROUP_SETTINGS_ERROR',
  payload,
});
