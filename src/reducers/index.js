import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import auth from './auth';
import demo from './demo';
import language from './language';
import simple from './simple';
import simpleList from './simpleList';

export default (history) => combineReducers({
  router: connectRouter(history),
  appTime: Date.now,
  auth,
  demo,
  language,
  authorizations: simple({
    baseType: 'FETCH_AUTHORIZATIONS'
  }),
  brokerages: simple({
    baseType: 'FETCH_BROKERAGES'
  }),
  currencies: simple({
    baseType: 'FETCH_CURRENCIES'
  }),
  symbols: simple({
    baseType: 'FETCH_SYMBOLS'
  }),
  groups: simple({
    baseType: 'FETCH_GROUPS'
  }),
  settings: simple({
    baseType: 'FETCH_SETTINGS'
  }),
  subscriptions: simple({
    baseType: 'FETCH_SUBSCRIPTIONS'
  }),
  accounts: simple({
    baseType: 'FETCH_ACCOUNTS'
  }),
  groupInfo: simpleList({
    baseType: 'FETCH_GROUP_INFO'
  }),
});
