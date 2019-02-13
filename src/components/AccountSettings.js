import React, { Component } from 'react';
import { connect } from 'react-redux';
import {H2} from '../styled/GlobalElements';
import ShadowBox from '../styled/ShadowBox';
import SettingsToggle from './SettingsToggle';

class AccountSettings extends Component {

  render() {
    return (
      <ShadowBox>
        <H2>Settings</H2>
        <br />
        <SettingsToggle
          name="Buy only"
          settingsId="buy_only"
        />
      </ShadowBox>
    );
  }
}

const actions = {};
const select = state => ({});

export default connect(select, actions)(AccountSettings);
