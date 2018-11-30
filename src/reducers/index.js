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
  brokerages: simple({
    baseType: 'FETCH_BROKERAGES'
  }),
  currencies: simple({
    baseType: 'FETCH_CURRENCIES'
  }),
  groups: simple({
    baseType: 'FETCH_GROUPS'
  }),
  settings: simple({
    baseType: 'FETCH_SETTINGS'
  }),
  symbols: simple({
    baseType: 'FETCH_SYMBOLS'
  }),
  accounts: simple({
    baseType: 'FETCH_ACCOUNTS'
  }),
  accountDetails: simpleList({
    baseType: 'FETCH_ACCOUNT_DETAILS'
  }),
  accountBalances: simpleList({
    baseType: 'FETCH_ACCOUNT_BALANCES'
  }),
  accountPositions: simpleList({
    baseType: 'FETCH_ACCOUNT_POSITIONS'
  }),
  groupTargets: simpleList({
    baseType: 'FETCH_GROUP_TARGETS'
  }),
  groupBalances: simpleList({
    baseType: 'FETCH_GROUP_BALANCES'
  }),
  groupPositions: simpleList({
    baseType: 'FETCH_GROUP_POSITIONS'
  }),
  groupSettings: simpleList({
    baseType: 'FETCH_GROUP_SETTINGS'
  }),
  groupAccuracy: simpleList({
    baseType: 'FETCH_GROUP_ACCURACY'
  })
});
