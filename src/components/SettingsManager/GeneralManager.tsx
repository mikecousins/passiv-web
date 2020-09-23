import React from 'react';
import { useSelector } from 'react-redux';
import { selectLimitOrdersFeature } from '../../selectors';
import LimitOrdersSettings from './LimitOrdersSettings';
import APIAccessSettings from './APIAccessSettings';

import { H2, BorderContainer } from '../../styled/GlobalElements';
import ShadowBox from '../../styled/ShadowBox';

const GeneralManager = () => {
  const limitOrdersEnabled = useSelector(selectLimitOrdersFeature);

  return (
    <ShadowBox>
      <H2>General</H2>
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
