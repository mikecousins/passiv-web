import React from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import ShadowBox from '../styled/ShadowBox';
import { push } from 'connected-react-router';
import { H1DarkStyle, H2DarkStyle, VerticalPadding } from '../styled/Setup';
import { Button } from '../styled/Button';

const ScalingIFrame = styled.iframe`
  width: 100%;
`;

const Welcome = () => {
  const dispatch = useDispatch();
  return (
    <ShadowBox background="var(--brand-grey)">
      <H1DarkStyle>Welcome to Passiv!</H1DarkStyle>
      <H2DarkStyle>Here's a 3-minute video to help you get started</H2DarkStyle>
      <VerticalPadding>
        <ScalingIFrame
          title="Passiv Basics"
          width="575"
          height="320"
          src="https://player.vimeo.com/video/547476267"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></ScalingIFrame>
      </VerticalPadding>
      <Button onClick={() => dispatch(push('/connect'))}>Continue</Button>
    </ShadowBox>
  );
};

export default Welcome;
