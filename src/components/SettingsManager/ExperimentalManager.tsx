import React from 'react';
import { useSelector } from 'react-redux';
import { selectSettings } from '../../selectors';
import ShadowBox from '../../styled/ShadowBox';
import { H2, P } from '../../styled/GlobalElements';
import styled from '@emotion/styled';
import NotAvailable from '../NotAvailable';

const Description = styled(P)`
  margin: 12px 0px;
`;

const ExperimentalManager = () => {
  const settings = useSelector(selectSettings);
  if (!settings) {
    return null;
  }

  return (
    <ShadowBox>
      <H2>Experimental Features</H2>
      <Description>
        You can try out new Passiv features before they're fully baked!
      </Description>
      <NotAvailable message="There are currently no experimental features available for you to try. Check back later." />
    </ShadowBox>
  );
};

export default ExperimentalManager;
