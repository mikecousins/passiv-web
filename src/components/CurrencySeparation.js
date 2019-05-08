import React from 'react';
import { connect } from 'react-redux';
import {
  selectCurrentGroupSettings,
  selectCurrentGroupId,
} from '../selectors/groups';
import { loadGroup } from '../actions';

import { SubSetting } from '../styled/GlobalElements';
import SettingsToggle from './SettingsToggle';

class CurrencySeparation extends React.Component {
  render() {
    const { settings } = this.props;

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
          />
        </SubSetting>
      </React.Fragment>
    );
  }
}

const actions = {
  refreshGroup: loadGroup,
};
const select = state => ({
  groupId: selectCurrentGroupId(state),
  settings: selectCurrentGroupSettings(state),
});

export default connect(
  select,
  actions,
)(CurrencySeparation);
