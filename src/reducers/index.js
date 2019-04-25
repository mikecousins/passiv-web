import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { responsiveStateReducer } from 'redux-responsive';
import auth from './auth';
import demo from './demo';
import language from './language';
import simple from './simple';
import simpleList from './simpleList';
import updateServiceWorker from './updateServiceWorker';

export default history =>
  combineReducers({
    router: connectRouter(history),
    appTime: Date.now,
    auth,
    browser: responsiveStateReducer,
    demo,
    language,
    updateServiceWorker,

    authorizations: simple({
      baseType: 'FETCH_AUTHORIZATIONS',
      userData: true,
    }),
    brokerages: simple({
      baseType: 'FETCH_BROKERAGES',
      userData: false,
    }),
    currencies: simple({
      baseType: 'FETCH_CURRENCIES',
      userData: false,
    }),
    currencyRates: simple({
      baseType: 'FETCH_CURRENCY_RATES',
      userData: false,
    }),
    groups: simple({
      baseType: 'FETCH_GROUPS',
      userData: true,
    }),
    settings: simple({
      baseType: 'FETCH_SETTINGS',
      userData: true,
    }),
    subscriptions: simple({
      baseType: 'FETCH_SUBSCRIPTIONS',
      userData: true,
    }),
    plans: simple({
      baseType: 'FETCH_PLANS',
      userData: true,
    }),
    accounts: simple({
      baseType: 'FETCH_ACCOUNTS',
      userData: true,
    }),
    accountBalances: simpleList({
      baseType: 'FETCH_ACCOUNT_BALANCES',
      userData: true,
    }),
    accountPositions: simpleList({
      baseType: 'FETCH_ACCOUNT_POSITIONS',
      userData: true,
    }),
    groupInfo: simpleList({
      baseType: 'FETCH_GROUP_INFO',
      userData: true,
    }),
  });
