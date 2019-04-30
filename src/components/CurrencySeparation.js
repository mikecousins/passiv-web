import React from 'react';
import { connect } from 'react-redux';
import { selectCurrentGroupSettings, selectCurrentGroupId } from '../selectors';
import { loadGroup } from '../actions';

import ShadowBox from '../styled/ShadowBox';
import SettingsToggle from './SettingsToggle';
import { DisabledTogglebutton } from '../styled/ToggleButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faToggleOn,
  faToggleOff,
} from '@fortawesome/free-solid-svg-icons';

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
          <SettingsToggle
            name="Hard Currency Separation"
            settingsId="hard_currency_separation"
          />
        ) : (
          <React.Fragment>
            <span> Hard Currency Separation </span>
            <FontAwesomeIcon icon={faToggleOff} />
          </React.Fragment>
        )}
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
