import styled from '@emotion/styled';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { H1, P } from '../../styled/GlobalElements';
import { TutorialBtn } from '../Accounts/index';

const AlmostDone = styled(P)`
  font-weight: bold;
  font-size: 24px;
  line-height: 150%;
  letter-spacing: 0.2px;
`;

const SetupPortfolios = () => {
  return (
    <div>
      <H1>Setup Portfolios</H1>
      <AlmostDone>
        You’re almost there! To start using Passiv, setup your target porfolios.
      </AlmostDone>
      <P>Not sure how? Follow our tutorials to get the ball rolling!</P>
      <TutorialBtn>
        Learn how to setup target portfolios{' '}
        <FontAwesomeIcon icon={faExternalLinkAlt} />
      </TutorialBtn>
    </div>
  );
};

export default SetupPortfolios;
