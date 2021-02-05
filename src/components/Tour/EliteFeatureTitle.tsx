import styled from '@emotion/styled';
import React from 'react';
import { H2 } from '../../styled/GlobalElements';

const EliteFeatureTile = styled(H2)`
  text-align: center;
`;

const EliteFeatureTitle = () => {
  return (
    <>
      <EliteFeatureTile>Elite Feature</EliteFeatureTile>
    </>
  );
};

export default EliteFeatureTitle;
