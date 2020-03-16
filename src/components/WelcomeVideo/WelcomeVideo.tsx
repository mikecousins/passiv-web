import React, { useState } from 'react';
import styled from '@emotion/styled';
import ShadowBox from '../../styled/ShadowBox';
import { H1DarkStyle, H2DarkStyle, VerticalPadding } from '../../styled/Setup';
import { Button } from '../../styled/Button';

const ScalingIFrame = styled.iframe`
  width: 100%;
`;

const WelcomeVideo = () => {
  const [displayBox, setDisplayBox] = useState(true);

  return (
    <React.Fragment>
      {!displayBox ? null : (
        <ShadowBox background="#2a2d34">
          <H1DarkStyle>Welcome to Passiv!</H1DarkStyle>
          <H2DarkStyle>
            Here's a 3-minute video to help you get started
          </H2DarkStyle>
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
          <Button onClick={() => setDisplayBox(false)}>Close</Button>
        </ShadowBox>
      )}
    </React.Fragment>
  );
};

export default WelcomeVideo;
