import {
  loadCurrencies,
  loadCurrencyRates,
  loadBrokerages,
  loadSubscription,
  loadAuthorizations,
  loadAccounts,
  loadGroups,
  loadGroupInfo,
  loadSettings,
  loadPlans,
  loadHelpArticles,
  loadFeatures,
  loadIncentives,
  loadModelAssetClasses,
  loadModelPortfolios,
} from '../actions';
import {
  loadPerformanceAll,
  loadAdjustedCostBasis,
} from '../actions/performance';
import { checkIfOnline } from '../actions/online';
import {
  selectCurrencyRatesNeedData,
  selectBrokeragesNeedData,
  selectAuthorizationsNeedData,
  selectSettingsNeedData,
  selectPlansNeedData,
  selectHelpArticlesNeedData,
  selectIncentivesNeedData,
} from '../selectors';
import { selectAccountsNeedData } from '../selectors/accounts';
import { selectModelAssetClassesNeedData } from '../selectors/modelAssetClasses';
import { selectModelPortfoliosNeedData } from '../selectors/modelPortfolios';
import {
  selectGroupsNeedData,
  selectGroupInfoNeedsData,
} from '../selectors/groups';

import { selectSubscriptionNeedData } from '../selectors/subscription';
import { selectShouldCheckIfOnline } from '../selectors/online';
import {
  selectPerformanceNeedData,
  selectACBNeedData,
} from '../selectors/performance';
import { selectGoalsNeedData } from '../selectors/goals';
import { loadGoals } from '../actions/goals';

import { selectFeaturesNeedData } from '../selectors/features';
import { selectCurrenciesNeedData } from '../selectors/currencies';

export { default as reducer } from '../reducers';

export const effects = [
  {
    selector: selectCurrenciesNeedData,
    actionCreator: loadCurrencies,
  },
  {
    selector: selectFeaturesNeedData,
    actionCreator: loadFeatures,
  },
  {
    selector: selectIncentivesNeedData,
    actionCreator: loadIncentives,
  },
  {
    selector: selectCurrencyRatesNeedData,
    actionCreator: loadCurrencyRates,
  },
  {
    selector: selectHelpArticlesNeedData,
    actionCreator: loadHelpArticles,
  },
  {
    selector: selectBrokeragesNeedData,
    actionCreator: loadBrokerages,
  },
  {
    selector: selectSubscriptionNeedData,
    actionCreator: loadSubscription,
  },
  {
    selector: selectAuthorizationsNeedData,
    actionCreator: loadAuthorizations,
  },
  {
    selector: selectAccountsNeedData,
    actionCreator: loadAccounts,
  },
  {
    selector: selectGroupsNeedData,
    actionCreator: loadGroups,
  },
  {
    selector: selectGroupInfoNeedsData,
    actionCreator: loadGroupInfo,
  },
  {
    selector: selectSettingsNeedData,
    actionCreator: loadSettings,
  },
  {
    selector: selectPlansNeedData,
    actionCreator: loadPlans,
  },
  {
    selector: selectPerformanceNeedData,
    actionCreator: loadPerformanceAll,
  },
  {
    selector: selectACBNeedData,
    actionCreator: loadAdjustedCostBasis,
  },
  {
    selector: selectShouldCheckIfOnline,
    actionCreator: checkIfOnline,
  },
  {
    selector: selectModelAssetClassesNeedData,
    actionCreator: loadModelAssetClasses,
  },
  {
    selector: selectModelPortfoliosNeedData,
    actionCreator: loadModelPortfolios,
  },
  {
    selector: selectGoalsNeedData,
    actionCreator: loadGoals,
  },
];
