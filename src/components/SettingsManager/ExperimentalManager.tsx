import React from 'react';
import { useSelector } from 'react-redux';
import { selectSettings } from '../../selectors';
import ShadowBox from '../../styled/ShadowBox';
import { H2, P } from '../../styled/GlobalElements';
import styled from '@emotion/styled';

const Description = styled(P)`
  margin: 12px 0px;
`;
const NoFeature = styled.div`
  text-align: center;
  margin: 50px 0px;
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
      <NoFeature>
        <P>
          There are currently no experimental features available for you to try.
        </P>
      </NoFeature>
    </ShadowBox>
  );
};

export default ExperimentalManager;
