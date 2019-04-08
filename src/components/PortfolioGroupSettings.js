import React from 'react';
import { H2 } from '../styled/GlobalElements';
import ShadowBox from '../styled/ShadowBox';
import SettingsToggle from './SettingsToggle';

export const PortfolioGroupSettings = () => (
  <ShadowBox>
    <H2>Settings</H2>
    <br />
    <SettingsToggle name="Buy only" settingsId="buy_only" />
  </ShadowBox>
);

export default PortfolioGroupSettings;
