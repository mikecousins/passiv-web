import React from 'react';
import { useSelector } from 'react-redux';
import { selectLimitOrdersFeature } from '../../selectors';
import TwoFAManager from './TwoFAManager';
import LimitOrdersSettings from './LimitOrdersSettings';
import APIAccessSettings from './APIAccessSettings';

import styled from '@emotion/styled';
import { H2 } from '../../styled/GlobalElements';
import ShadowBox from '../../styled/ShadowBox';

const BorderContainer = styled.div`
  padding-top: 15px;
  margin-top: 6px;
  padding-bottom: 5px;
  font-size: 18px;
  border-top: 1px solid #e8e8e8;
`;

const GeneralManager = () => {
  const limitOrdersEnabled = useSelector(selectLimitOrdersFeature);

  return (
    <ShadowBox>
      <H2>General</H2>
      <TwoFAManager />
      <BorderContainer>
        <APIAccessSettings />
      </BorderContainer>
      {limitOrdersEnabled && (
        <BorderContainer>
          <LimitOrdersSettings />
        </BorderContainer>
      )}
    </ShadowBox>
  );
};

export default GeneralManager;
