import { combineReducers } from 'redux';
import auth from './auth';
import simple from './simple';

export default combineReducers({
  appTime: Date.now,
  auth,
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
  accountDetails: simple({
    baseType: 'FETCH_ACCOUNT_DETAILS'
  }),
  accountBalances: simple({
    baseType: 'FETCH_ACCOUNT_BALANCES'
  }),
  accountPositions: simple({
    baseType: 'FETCH_ACCOUNT_POSITIONS'
  }),
  groupAllocations: simple({
    baseType: 'FETCH_GROUP_ALLOCATIONS'
  }),
  groupBalances: simple({
    baseType: 'FETCH_GROUP_BALANCES'
  }),
  groupPositions: simple({
    baseType: 'FETCH_GROUP_POSITIONS'
  }),
  groupSettings: simple({
    baseType: 'FETCH_GROUP_SETTINGS'
  })
});
