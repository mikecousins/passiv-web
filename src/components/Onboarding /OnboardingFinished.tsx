import styled from '@emotion/styled';
import React from 'react';
import { H1, P } from '../../styled/GlobalElements';
import Grid from '../../styled/Grid';

import onboardingTrophy from '../../assets/images/onboardingTrophy.png';
import { TutorialLink } from '../Accounts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

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
      <TopFeatures columns="repeat(2, 1fr)">
        <Feature>
          <P>
            Customize your <br /> experience in settings
          </P>
        </Feature>
        <Feature>
          <P>
            Create and share <br /> Model Portfolios
          </P>
        </Feature>
        <Feature>
          <P>
            Create goals to <br /> stay on track
          </P>
        </Feature>
        <Feature>
          <P>
            Refer friends to earn <br />
            money{' '}
          </P>
        </Feature>
      </TopFeatures>
      <TutorialLink>
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
