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

export const loadInitialData = token => {
  return dispatch => {
    getData('https://dev.getpassiv.com/api/v1/currencies/', token)
      .then(response => dispatch(fetchCurrenciesSuccess(response)))
      .catch(error => dispatch(fetchCurrenciesError(error)));

    getData('https://dev.getpassiv.com/api/v1/portfolioGroups/', token)
      .then(response => dispatch(fetchGroupsSuccess(response)))
      .catch(error => dispatch(fetchGroupsError(error)));

    getData('https://dev.getpassiv.com/api/v1/all_symbols/', token)
      .then(response => dispatch(fetchSymbolsSuccess(response)))
      .catch(error => dispatch(fetchSymbolsError(error)));

    dispatch(fetchAccountsStart());
    getData('https://dev.getpassiv.com/api/v1/accounts/', token)
      .then(response => dispatch(fetchAccountsSuccess(response)))
      .catch(error => dispatch(fetchAccountsError(error)));
  };
};

export const loadAccount = payload => {
  return dispatch => {
    dispatch(fetchAccountDetailsStart());
    payload.ids.forEach((id) => {
      console.log(id);
      getData(`https://dev.getpassiv.com/api/v1/accounts/${id}/`, payload.token)
        .then(response => dispatch(fetchAccountDetailsSuccess(response)))
        .catch(error => dispatch(fetchAccountDetailsError(error)));
    });
  };
};

export const fetchCurrenciesSuccess = payload => ({
  type: 'FETCH_CURRENCIES_SUCCESS',
  payload,
});

export const fetchCurrenciesError = payload => ({
  type: 'FETCH_CURRENCIES_ERROR',
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

export const fetchSymbolsSuccess = payload => ({
  type: 'FETCH_SYMBOLS_SUCCESS',
  payload,
});

export const fetchSymbolsError = payload => ({
  type: 'FETCH_SYMBOLS_ERROR',
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
