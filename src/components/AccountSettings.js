import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import {H2,Title} from '../styled/GlobalElements';
import styled from '@emotion/styled';
import ExcludedAssetToggle from './ExcludedAssetToggle';
import ShadowBox from '../styled/ShadowBox';
import Number from './Number';
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
