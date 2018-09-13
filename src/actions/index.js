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

export const loadInitialData = payload => {
  return dispatch => {
    getData('https://dev.getpassiv.com/api/v1/currencies/', payload)
      .then(response => dispatch(getCurrenciesSucceeded(response)))
      .catch(error => dispatch(getCurrenciesFailed(error)));

    getData('https://dev.getpassiv.com/api/v1/portfolioGroups/', payload)
      .then(response => dispatch(getGroupsSucceeded(response)))
      .catch(error => dispatch(getGroupsFailed(error)));

    getData('https://dev.getpassiv.com/api/v1/accounts/', payload)
      .then(response => dispatch(getAccountsSucceeded(response)))
      .catch(error => dispatch(getAccountsFailed(error)));

    getData('https://dev.getpassiv.com/api/v1/all_symbols/', payload)
      .then(response => dispatch(getSymbolsSucceeded(response)))
      .catch(error => dispatch(getSymbolsFailed(error)));
  };
};

export const getCurrenciesSucceeded = payload => ({
  type: 'GET_CURRENCIES_SUCCEEDED',
  payload,
});

export const getCurrenciesFailed = payload => ({
  type: 'GET_CURRENCIES_FAILED',
  payload,
});

export const getGroupsSucceeded = payload => ({
  type: 'GET_GROUPS_SUCCEEDED',
  payload,
});

export const getGroupsFailed = payload => ({
  type: 'GET_GROUPS_FAILED',
  payload,
});

export const getAccountsSucceeded = payload => ({
  type: 'GET_ACCOUNTS_SUCCEEDED',
  payload,
});

export const getAccountsFailed = payload => ({
  type: 'GET_ACCOUNTS_FAILED',
  payload,
});

export const getSymbolsSucceeded = payload => ({
  type: 'GET_SYMBOLS_SUCCEEDED',
  payload,
});

export const getSymbolsFailed = payload => ({
  type: 'GET_SYMBOLS_FAILED',
  payload,
});
