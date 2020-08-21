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
} from '../actions';
import {
  loadPerformanceAll,
  loadAdjustedCostBasis,
} from '../actions/performance';
import { checkIfOnline } from '../actions/online';
import {
  selectCurrenciesNeedData,
  selectCurrencyRatesNeedData,
  selectBrokeragesNeedData,
  selectAuthorizationsNeedData,
  selectSettingsNeedData,
  selectPlansNeedData,
  selectHelpArticlesNeedData,
  selectFeaturesNeedData,
} from '../selectors';
import { selectAccountsNeedData } from '../selectors/accounts';
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
];
