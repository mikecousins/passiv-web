import { combineReducers } from 'redux';
import accounts from './accounts';
import auth from './auth';
import brokerages from './brokerages';
import currencies from './currencies';
import groups from './groups';
import settings from './settings';
import symbols from './symbols';

export default combineReducers({
  appTime: Date.now,
  accounts,
  auth,
  brokerages,
  currencies,
  groups,
  settings,
  symbols,
});
