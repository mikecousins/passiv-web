import React from 'react';
import { H2 } from '../styled/GlobalElements';
import ShadowBox from '../styled/ShadowBox';
import SettingsToggle from './SettingsToggle';
import CurrencySeparation from './CurrencySeparation';
import { connect } from 'react-redux';
import { selectCurrentGroupSettings } from '../selectors/groups';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export const PortfolioGroupSettings = ({ settings }) => {
  console.log('settings', settings);
  return (
    <ShadowBox>
      <H2>Settings</H2>
      {settings ? (
        <React.Fragment>
          <br />
          <SettingsToggle name="Rebalance Mode" settingsId="buy_only" />
          <br />
          <CurrencySeparation />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <br />
          <FontAwesomeIcon icon={faSpinner} spin />
        </React.Fragment>
      )}
    </ShadowBox>
  );
};

const actions = {};
const select = state => ({
  settings: selectCurrentGroupSettings(state),
});

export default connect(
  select,
  actions,
)(PortfolioGroupSettings);
