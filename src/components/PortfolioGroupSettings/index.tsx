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
import { putData } from '../../api';
import { loadGroup } from '../../actions';
import { toast } from 'react-toastify';
import TradesExplanation from '../TradesExplanation';

export const PortfolioGroupSettings = () => {
  const settings = useSelector(selectCurrentGroupSettings);
  const groupId = useSelector(selectCurrentGroupId);
  const featureCashManagement = useSelector(selectCashManagementFeature);
  const dispatch = useDispatch();

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
      <H2>General</H2>
      {settings ? (
        <React.Fragment>
          <br />
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
          <br />
          <br />
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
      <br />
      <TradesExplanation settings={settings} />
    </ShadowBox>
  );
};

export default PortfolioGroupSettings;
