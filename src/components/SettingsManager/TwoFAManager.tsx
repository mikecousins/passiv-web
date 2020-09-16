import React from 'react';
import { useSelector } from 'react-redux';
import { select2FAFeature } from '../../selectors';

import SMS2FAManager from './SMS2FAManager';
import OTP2FAManager from './OTP2FAManager';

const TwoFAManager = () => {
  const Is2FAFeatureEnabled = useSelector(select2FAFeature);

  if (Is2FAFeatureEnabled === true) {
    return (
      <React.Fragment>
        <SMS2FAManager />
        <OTP2FAManager />
      </React.Fragment>
    );
  } else {
    return null;
  }
};

export default TwoFAManager;
