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
import version from './version';
import referral from './referral';
import { SubscriptionData } from '../types/subscription';
import { GroupInfoData, Balance } from '../types/groupInfo';
import { GroupData } from '../types/group';
import { Currency } from '../types/currency';
import { Feature } from '../types/feature';
import { Incentives } from '../types/incentives';
import { CurrencyRate } from '../types/currencyRate';
import { Account } from '../types/account';
import { Authorization } from '../types/authorization';
import { Brokerage } from '../types/brokerage';
import { Position } from '../types/account';
import { Settings } from '../types/settings';
import { ModelAssetClassDetailsType } from '../types/modelAssetClass';
import {
  PerformanceData,
  PerformanceCustomData,
  AdjustedCostBasis,
} from '../types/performance';
import {
  selectedTimeframe,
  selectedAccounts,
  reportingStartDate,
  reportingEndDate,
} from './performance';
import { ModelPortfolioDetailsType } from '../types/modelPortfolio';
import { Goal } from '../types/goals';

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
    version,
    selectedTimeframe,
    selectedAccounts,
    reportingStartDate,
    reportingEndDate,
    referral,
    helpArticles: simple<any>({
      baseType: 'FETCH_HELP_ARTICLES',
      userData: false,
    }),
    authorizations: simple<Authorization[]>({
      baseType: 'FETCH_AUTHORIZATIONS',
      userData: true,
    }),
    brokerages: simple<Brokerage[]>({
      baseType: 'FETCH_BROKERAGES',
      userData: false,
    }),
    features: simple<Feature[]>({
      baseType: 'FETCH_FEATURES',
      userData: true,
    }),
    incentives: simple<Incentives>({
      baseType: 'FETCH_INCENTIVES',
      userData: true,
    }),
    currencies: simple<Currency[]>({
      baseType: 'FETCH_CURRENCIES',
      userData: false,
    }),
    currencyRates: simple<CurrencyRate[]>({
      baseType: 'FETCH_CURRENCY_RATES',
      userData: false,
    }),
    groups: simple<GroupData[]>({
      baseType: 'FETCH_GROUPS',
      userData: true,
    }),
    settings: simple<Settings>({
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
    accounts: simple<Account[]>({
      baseType: 'FETCH_ACCOUNTS',
      userData: true,
    }),
    accountBalances: simpleList<Balance[]>({
      baseType: 'FETCH_ACCOUNT_BALANCES',
      userData: true,
    }),
    accountPositions: simpleList<Position[]>({
      baseType: 'FETCH_ACCOUNT_POSITIONS',
      userData: true,
    }),
    groupInfo: simpleList<GroupInfoData>({
      baseType: 'FETCH_GROUP_INFO',
      userData: true,
    }),
    performanceAll: simple<PerformanceData>({
      baseType: 'FETCH_PERFORMANCE_ALL',
      userData: true,
    }),
    goals: simple<Goal[]>({
      baseType: 'FETCH_GOALS',
      userData: true,
    }),
    performanceCustom: simple<PerformanceCustomData>({
      baseType: 'FETCH_PERFORMANCE_CUSTOM',
      userData: true,
    }),
    performanceACB: simple<AdjustedCostBasis[]>({
      baseType: 'FETCH_ACB',
      userData: true,
    }),
    modelAssetClasses: simple<ModelAssetClassDetailsType[]>({
      baseType: 'FETCH_MODEL_ASSET_CLASSES',
      userData: true,
    }),
    modelPortfolios: simple<ModelPortfolioDetailsType[]>({
      baseType: 'FETCH_MODEL_PORTFOLIOS',
      userData: true,
    }),
  });
