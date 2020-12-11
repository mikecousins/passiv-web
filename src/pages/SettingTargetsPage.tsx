import React from 'react';
import SettingTargets from '../components/SettingTargets/SettingTargets';
import { H1 } from '../styled/GlobalElements';
import { StyledP } from './ModelAssetClassPage';

const SettingTargetsPage = () => {
  return (
    <React.Fragment>
      <H1>Setting Targets</H1>
      <StyledP>
        Adjust your holdings target percentages or apply one of your model
        portfolios
      </StyledP>
      <SettingTargets />
    </React.Fragment>
  );
};

export default SettingTargetsPage;
