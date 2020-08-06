import React from 'react';
import styled from '@emotion/styled';
import PortfolioGroupSettings from './PortfolioGroupSettings';
import { P } from './../styled/GlobalElements';

const Heading = styled.h1`
  font-size: 40px;
  font-weight: 400;
  padding-bottom: 10px;
  + p {
    margin-bottom: 30px;
  }
`;

export const GroupSettingsTab = () => {
  return (
    <div>
      <Heading>Settings</Heading>
      <P>Your settings for this portfolio group.</P>
      <PortfolioGroupSettings />
    </div>
  );
};

export default GroupSettingsTab;
