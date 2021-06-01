import styled from '@emotion/styled';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectHasQuestradeConnection } from '../../selectors';
import { H1 } from '../../styled/GlobalElements';
import Grid from '../../styled/Grid';
import ShadowBox from '../../styled/ShadowBox';
import { Description } from './Intro';

const Cards = styled(Grid)`
  margin-top: 20px;
`;

const Community = styled(ShadowBox)``;
const CommunityHeader = styled.div`
  background-color: var(--brand-grey);
`;

const Elite = styled(ShadowBox)``;

const ChooseMembership = () => {
  const hasQuestradeConnection = useSelector(selectHasQuestradeConnection);
  return (
    <div>
      <H1>
        {hasQuestradeConnection
          ? 'Congratulations!!'
          : 'Upgrade your membership'}
      </H1>
      <Description>
        {hasQuestradeConnection
          ? 'You are eligible for a FREE upgrade to Passiv Elite with your Questrade account!'
          : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
      </Description>
      <Cards columns="1fr 1fr">
        <Community>
          <CommunityHeader>
            Community User $0/month Free Forever
          </CommunityHeader>
        </Community>
        <Elite></Elite>
      </Cards>
    </div>
  );
};

export default ChooseMembership;
