import React from 'react';
import { useSelector } from 'react-redux';
import { select2FAFeature } from '../../selectors/features';
import { OptionsTitle, DisabledBox } from '../../styled/GlobalElements';

import SMS2FAManager from './SMS2FAManager';
import OTP2FAManager from './OTP2FAManager';

import { InputContainer } from '../../styled/TwoFAManager';

const TwoFAManager = () => {
  const Is2FAFeatureEnabled = useSelector(select2FAFeature);

  if (Is2FAFeatureEnabled === true) {
    return (
      <InputContainer>
        <OptionsTitle>Multi-Factor Authentication</OptionsTitle>
        <DisabledBox>
          Protect your account by enabling multi-factor authentication (MFA)
          with an authenticator app.
        </DisabledBox>
        <OTP2FAManager />
        <SMS2FAManager />
      </InputContainer>
    );
  } else {
    return null;
  }
};

export default TwoFAManager;
