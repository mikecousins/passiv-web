import axios from 'axios';
import { selectToken } from '../selectors';

const apiMiddleware = (store) => {
  let baseUrlOverride = 'dev.getpassiv.com';
  if (process.env.REACT_APP_BASE_URL_OVERRIDE) {
    baseUrlOverride = process.env.REACT_APP_BASE_URL_OVERRIDE;
  }
  const baseUrl = 'https://' + baseUrlOverride;
  axios.defaults.baseURL = baseUrl;
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  const initialJwt = selectToken(store.getState());

  if (initialJwt) {
    axios.defaults.headers.common.Authorization = `JWT ${initialJwt}`;
  }

  return next => (action) => {
    const previousJwt = selectToken(store.getState());
    next(action);
    const currentJwt = selectToken(store.getState());

    if (previousJwt !== currentJwt) {
      axios.defaults.headers.common.Authorization = `JWT ${currentJwt}`;
    }
  };
};

export default apiMiddleware;
