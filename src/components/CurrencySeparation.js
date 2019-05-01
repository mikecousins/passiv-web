import React from 'react';
import { connect } from 'react-redux';
import {
  selectCurrentGroupSettings,
  selectCurrentGroupId,
} from '../selectors/groups';
import { loadGroup } from '../actions';

import ShadowBox from '../styled/ShadowBox';
import { SubSetting } from '../styled/GlobalElements';
import SettingsToggle from './SettingsToggle';
import { DisabledTogglebutton } from '../styled/ToggleButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCaretRight } from '@fortawesome/free-solid-svg-icons';

class CurrencySeparation extends React.Component {
  render() {
    const { settings } = this.props;

    if (!settings) {
      return null;
    }

    return (
      <React.Fragment>
        <SettingsToggle
          name="Prevent Currency Conversion"
          settingsId="prevent_currency_conversion"
        />
        <br />
        {settings.prevent_currency_conversion ? (
          <SubSetting>
            <FontAwesomeIcon icon={faCaretRight} />
            <SettingsToggle
              name=" Hard Currency Separation"
              settingsId="hard_currency_separation"
            />
          </SubSetting>
        ) : null}
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
