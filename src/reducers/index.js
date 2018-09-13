import { combineReducers } from 'redux';
import auth from './auth';
import brokerages from './brokerages';
import currencies from './currencies';
import money from './money';
import settings from './settings';

export default combineReducers({
  appTime: Date.now,
  auth,
  brokerages,
  currencies,
  money,
  settings,
});
