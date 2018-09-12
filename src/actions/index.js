import { postData } from '../api';

export const loginStartedAsync = payload => {
  return dispatch => {
    /*setTimeout(() => {
      dispatch(loginSucceeded());
    }, 1000);
    */
    postData('https://dev.getpassiv.com/api/v1/auth/login/', { email: payload.email, password: payload.password })
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
