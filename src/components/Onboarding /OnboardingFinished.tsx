import styled from '@emotion/styled';
import React from 'react';
import { H1, P } from '../../styled/GlobalElements';
import Grid from '../../styled/Grid';

import onboardingTrophy from '../../assets/images/onboardingTrophy.png';
import { TutorialLink } from '../Accounts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartPie,
  faCogs,
  faExternalLinkAlt,
  faMoneyBillWave,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  * {
    text-align: center;
  }
  h1 {
    font-size: 44px;
    line-height: 57px;
    letter-spacing: 0.44px;
    margin-bottom: 20px;
  }
  p {
    font-size: 24px;
    line-height: 150%;
    letter-spacing: 0.2px;
  }
`;

const TrophyImage = styled.div`
  background: url(${onboardingTrophy}) no-repeat;
  background-size: contain;
  width: 150px;
  height: 200px;
  margin: 0 auto;
  margin-bottom: 20px;
  @media (max-width: 900px) {
    width: 100px;
    height: 150px;
  }
`;

const TopFeatures = styled(Grid)`
  margin-top: 40px;
`;

const Feature = styled.div``;

const OnboardingFinished = () => {
  return (
    <Container>
      <TrophyImage></TrophyImage>
      <H1>Congratulations, you are ready to go!</H1>
      <P>Some cool things to look forward to using Passiv</P>
      <TopFeatures columns="repeat(2, 3fr)">
        <Feature>
          <FontAwesomeIcon icon={faCogs} size="4x" />
          <P>Reporting</P>
        </Feature>
        <Feature>
          <FontAwesomeIcon icon={faChartPie} size="4x" />
          <P>Create and share Model Portfolios</P>
        </Feature>
        <Feature>
          <FontAwesomeIcon icon={faTrophy} size="4x" />
          <P>Manage multiple accounts in one place</P>
        </Feature>
        <Feature>
          <FontAwesomeIcon icon={faMoneyBillWave} size="4x" />
          <P>Refer a friend</P>
        </Feature>
      </TopFeatures>
      <TutorialLink>
        Look for . OR
        <a
          href="https://passiv.com/tutorials/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Check Tips & Tricks <FontAwesomeIcon icon={faExternalLinkAlt} />
        </a>
      </TutorialLink>
    </Container>
  );
};

export default OnboardingFinished;
