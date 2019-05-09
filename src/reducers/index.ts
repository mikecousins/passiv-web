import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { responsiveStateReducer } from 'redux-responsive';
import auth from './auth';
import demo from './demo';
import language from './language';
import simple from './simple';
import simpleList from './simpleList';
import updateServiceWorker from './updateServiceWorker';
import online from './online';
import { SubscriptionData } from '../types/subscription';

export default (history: any) =>
  combineReducers({
    router: connectRouter(history),
    appTime: Date.now,
    auth,
    browser: responsiveStateReducer,
    demo,
    language,
    updateServiceWorker,
    online,
    authorizations: simple<any>({
      baseType: 'FETCH_AUTHORIZATIONS',
      userData: true,
    }),
    brokerages: simple<any>({
      baseType: 'FETCH_BROKERAGES',
      userData: false,
    }),
    currencies: simple<any>({
      baseType: 'FETCH_CURRENCIES',
      userData: false,
    }),
    currencyRates: simple<any>({
      baseType: 'FETCH_CURRENCY_RATES',
      userData: false,
    }),
    groups: simple<any>({
      baseType: 'FETCH_GROUPS',
      userData: true,
    }),
    settings: simple<any>({
      baseType: 'FETCH_SETTINGS',
      userData: true,
    }),
    subscription: simple<SubscriptionData>({
      baseType: 'FETCH_SUBSCRIPTION',
      userData: true,
    }),
    plans: simple<any>({
      baseType: 'FETCH_PLANS',
      userData: true,
    }),
    accounts: simple<any>({
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
