import axios from 'axios';
import { selectToken, selectTokenIsExpired } from '../selectors';
import { tokenExpired } from '../actions';

const apiMiddleware = store => {
  let baseUrlOverride = 'beta.getpassiv.com';
  if (process.env.REACT_APP_BASE_URL_OVERRIDE) {
    baseUrlOverride = process.env.REACT_APP_BASE_URL_OVERRIDE;
  }
  const baseUrl = 'https://' + baseUrlOverride;
  axios.defaults.baseURL = baseUrl;
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  const initialJwt = selectToken(store.getState());

  if (initialJwt) {
    if (selectTokenIsExpired(store.getState())) {
      delete axios.defaults.headers.common.Authorization;
    } else {
      // set our auth header in axios
      axios.defaults.headers.common.Authorization = `JWT ${initialJwt}`;
    }
  }

  return next => action => {
    // if the token has changed set it in axios
    const previousJwt = selectToken(store.getState());
    next(action);
    const currentJwt = selectToken(store.getState());
    if (previousJwt !== currentJwt) {
      axios.defaults.headers.common.Authorization = `JWT ${currentJwt}`;
    }

    if (!selectToken(store.getState())) {
      delete axios.defaults.headers.common.Authorization;
    }

    // if the token is expired, remove it from axios
    if (selectTokenIsExpired(store.getState())) {
      store.dispatch(tokenExpired());
      delete axios.defaults.headers.common.Authorization;
    }
  };
};

export default apiMiddleware;
