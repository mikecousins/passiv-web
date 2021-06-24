import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { H2 } from '../../styled/GlobalElements';
import ShadowBox from '../../styled/ShadowBox';
import SettingsCheckBox from './SettingsCheckBox';
import CurrencySeparation from './CurrencySeparation';
import CashManagement from '../CashManagement';
import {
  selectCurrentGroupSettings,
  selectCurrentGroupId,
  selectCurrentGroupInfo,
} from '../../selectors/groups';
import { selectCashManagementFeature } from '../../selectors/features';
import { putData } from '../../api';
import { loadGroup } from '../../actions';
import { toast } from 'react-toastify';
import Tour from '../Tour/Tour';
import ExcludedAssets from './ExcludedAssets';
import { GroupSettingsSteps } from '../Tour/TourSteps';
import Prioritization from '../ModelPortfolio/Prioritization';
import styled from '@emotion/styled';

const GeneralTitle = styled(H2)`
  font-size: 28px;
`;
const CashManagementShadowBox = styled(ShadowBox)`
  @media (max-width: 900px) {
    padding: 15px 2px;
  }
`;

const PortfolioGroupSettings = () => {
  const dispatch = useDispatch();
  const settings = useSelector(selectCurrentGroupSettings);
  const groupId = useSelector(selectCurrentGroupId);
  const featureCashManagement = useSelector(selectCashManagementFeature);
  const groupInfo = useSelector(selectCurrentGroupInfo);

  const modelType = groupInfo?.model_portfolio?.model_type;

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
    <div>
      <Tour steps={GroupSettingsSteps} name="group_settings_tour" />
      <ShadowBox>
        <ExcludedAssets />
      </ShadowBox>
      <ShadowBox>
        <GeneralTitle>General</GeneralTitle>
        {settings ? (
          <React.Fragment>
            <div className="tour-allow-selling">
              <SettingsCheckBox
                name="Allow selling to rebalance"
                explanation={
                  settings.buy_only
                    ? 'Passiv will use available cash to purchase the most underweight assets in your portfolio. Sell orders are not permitted.'
                    : 'Passiv will buy and sell assets to get as close to 100% accuracy as possible.'
                }
                value={settings.buy_only}
                onChange={() => {
                  if (settings) {
                    settings.buy_only = !settings.buy_only;
                    updateSettings();
                  }
                }}
                invert={true}
              />
            </div>
            <SettingsCheckBox
              name="Prevent trades in non-tradable accounts"
              explanation={
                settings.prevent_trades_in_non_tradable_accounts
                  ? 'Passiv will attempt to route your trades through brokers with One-Click Trade support.'
                  : ''
              }
              value={settings.prevent_trades_in_non_tradable_accounts}
              onChange={() => {
                if (settings) {
                  settings.prevent_trades_in_non_tradable_accounts = !settings.prevent_trades_in_non_tradable_accounts;
                  updateSettings();
                }
              }}
              invert={false}
            />
            {modelType !== 1 && (
              <SettingsCheckBox
                name="Notify me about new detected assets"
                explanation={
                  settings.show_warning_for_new_assets_detected
                    ? `Passiv will show you a message for new holding assets that are not part of your model portfolio.`
                    : ''
                }
                value={settings.show_warning_for_new_assets_detected}
                onChange={() => {
                  if (settings) {
                    settings.show_warning_for_new_assets_detected = !settings.show_warning_for_new_assets_detected;
                    updateSettings();
                  }
                }}
                invert={false}
              />
            )}

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
            <FontAwesomeIcon icon={faSpinner} spin size="lg" />
          </React.Fragment>
        )}
      </ShadowBox>
      {featureCashManagement && (
        <CashManagementShadowBox>
          <CashManagement />
        </CashManagementShadowBox>
      )}
      {modelType === 1 && (
        <ShadowBox>
          <Prioritization onSettingsPage={true} />
        </ShadowBox>
      )}
    </div>
  );
};

export default PortfolioGroupSettings;
