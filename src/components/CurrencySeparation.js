import React from 'react';
import { connect } from 'react-redux';
import {
  selectCurrentGroupSettings,
  selectCurrentGroupId,
} from '../selectors/groups';
import { loadGroup } from '../actions';

import { SubSetting } from '../styled/GlobalElements';
import SettingsToggle from './SettingsToggle';
import { selectCanSeparateCurrencies } from '../selectors/subscription';

class CurrencySeparation extends React.Component {
  render() {
    const { settings, canSeparateCurrencies } = this.props;

    if (canSeparateCurrencies) {
      return (
        <React.Fragment>
          <SettingsToggle
            name="Keep currencies separate"
            settingsId="prevent_currency_conversion"
          />
          <br />
          <SubSetting>
            <SettingsToggle
              name="Retain cash for manual exchange"
              settingsId="hard_currency_separation"
              disabled={settings && !settings.prevent_currency_conversion}
              tip="Separating currencies must be enabled in order to retain cash for manual conversion."
            />
          </SubSetting>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <SettingsToggle
            name="Keep currencies separate"
            settingsId="prevent_currency_conversion"
            disabled={true}
            tip="Separating currencies is only available to Elite subscribers. Upgrade your account on the Settings page to use this feature."
          />
          <br />
          <SubSetting>
            <SettingsToggle
              name="Retain cash for manual exchange"
              settingsId="hard_currency_separation"
              disabled={true}
              tip="Separating currencies is only available to Elite subscribers. Upgrade your account on the Settings page to use this feature."
            />
          </SubSetting>
        </React.Fragment>
      );
    }
  }
}

const actions = {
  refreshGroup: loadGroup,
};
const select = state => ({
  groupId: selectCurrentGroupId(state),
  settings: selectCurrentGroupSettings(state),
  canSeparateCurrencies: selectCanSeparateCurrencies(state),
});

export default connect(
  select,
  actions,
)(CurrencySeparation);
