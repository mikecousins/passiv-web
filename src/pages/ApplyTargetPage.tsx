import React from 'react';
import ApplyTarget from '../components/SettingTargets/ApplyTarget';
import { H1 } from '../styled/GlobalElements';
import { StyledP } from './ModelAssetClassPage';

const ApplyTargetPage = () => {
  return (
    <React.Fragment>
      <H1>Setting Targets</H1>
      <StyledP>
        Adjust your holdings target percentages or apply one of your model
        portfolios
      </StyledP>
      <ApplyTarget />
    </React.Fragment>
  );
};

export default ApplyTargetPage;
