import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import styled from '@emotion/styled';
import ShadowBox from '../styled/ShadowBox';
import { H1DarkStyle, H2DarkStyle, VerticalPadding } from '../styled/Setup';
import { Button } from '../styled/Button';
import OnboardingProgress from '../components/OnboardingProgress';

const ScalingIFrame = styled.iframe`
  width: 100%;
`;

const WelcomePage = () => {
  const dispatch = useDispatch();
  return (
    <ShadowBox background="#2a2d34">
      <H1DarkStyle>Welcome to Passiv!</H1DarkStyle>
      <H2DarkStyle>Here's a 3-minute video to help you get started</H2DarkStyle>
      <VerticalPadding>
        <ScalingIFrame
          title="Passiv Basics"
          width="575"
          height="320"
          src="https://player.vimeo.com/video/365762313"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></ScalingIFrame>
      </VerticalPadding>
      <Button onClick={() => dispatch(push('/app/connect'))}>Continue</Button>
      <OnboardingProgress step={1} />
    </ShadowBox>
  );
};

export default WelcomePage;
