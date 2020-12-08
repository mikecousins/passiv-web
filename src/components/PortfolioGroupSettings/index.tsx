import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { H2 } from '../../styled/GlobalElements';
import ShadowBox from '../../styled/ShadowBox';
import SettingsToggle from './SettingsToggle';
import CurrencySeparation from './CurrencySeparation';
import CashManagement from '../CashManagement';
import {
  selectCurrentGroupSettings,
  selectCurrentGroupId,
} from '../../selectors/groups';
import { selectCashManagementFeature } from '../../selectors/features';
import { selectAccounts } from '../../selectors/accounts';
import { putData } from '../../api';
import { loadGroup } from '../../actions';
import { toast } from 'react-toastify';
import TradesExplanation from '../TradesExplanation';
import Tour from '../Tour/Tour';

const TOUR_STEPS = [
  {
    target: '.tour-allow-selling',
    content:
      'By default, Passiv is set to only allocate cash to your underweight targets. To do a full rebalance, you can enable Sell.',
    placement: 'top',
  },
  {
    target: '.tour-currency-separation',
    content: (
      <div>
        Have more control over how Passiv treats multiple currencies you hold in
        your brokerage account.{' '}
        <a href="https://passiv.com/help/tutorials/how-to-change-your-currency-handling-settings/">
          Learn More
        </a>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '.tour-cash-management',
    content: (
      <div>
        Helps you to allocate new cash gradually or withhold a specific amount
        of cash to invest later. Start dollar-cost averaging your assets by
        clicking <strong>Add Rule</strong>.{' '}
        <a href="https://passiv.com/help/tutorials/how-to-use-cash-management/">
          Learn More
        </a>
      </div>
    ),
    placement: 'top',
  },
];

export const PortfolioGroupSettings = () => {
  const settings = useSelector(selectCurrentGroupSettings);
  const accounts = useSelector(selectAccounts);
  const groupId = useSelector(selectCurrentGroupId);
  const featureCashManagement = useSelector(selectCashManagementFeature);
  const dispatch = useDispatch();

  const groupAccounts = accounts.filter((a) => a.portfolio_group === groupId);

  const updateSettings = () => {
    if (settings) {
      putData(`/api/v1/portfolioGroups/${groupId}/settings/`, settings)
        .then(() => {
          dispatch(loadGroup({ ids: [groupId] }));
        })
        .catch(() => {
          toast.error('Failed to update settings');
        });
    }
  };

  return (
    <ShadowBox>
      <Tour steps={TOUR_STEPS} name="group_settings_tour" />
      <H2>General</H2>
      {settings ? (
        <React.Fragment>
          <SettingsToggle
            name="Allow selling to rebalance"
            value={settings.buy_only}
            onChange={() => {
              if (settings) {
                settings.buy_only = !settings.buy_only;
                updateSettings();
              }
            }}
            invert={true}
          />
          <CurrencySeparation
            preventConversion={settings.prevent_currency_conversion}
            onChangePreventConversion={() => {
              if (settings) {
                settings.prevent_currency_conversion = !settings.prevent_currency_conversion;
                updateSettings();
              }
            }}
            hardSeparation={settings.hard_currency_separation}
            onChangeHardSeparation={() => {
              if (settings) {
                settings.hard_currency_separation = !settings.hard_currency_separation;
                updateSettings();
              }
            }}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <br />
          <FontAwesomeIcon icon={faSpinner} spin />
        </React.Fragment>
      )}
      {featureCashManagement && <CashManagement />}
      <TradesExplanation settings={settings} accounts={groupAccounts} />
    </ShadowBox>
  );
};

export default PortfolioGroupSettings;
