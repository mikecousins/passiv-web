import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import ShadowBox from '../styled/ShadowBox';
import { H1DarkStyle, H2DarkStyle, VerticalPadding } from '../styled/Setup';
import { Button } from '../styled/Button';

const WelcomePage = () => {
  const dispatch = useDispatch();
  let contents = (
    <React.Fragment>
      <H1DarkStyle>Welcome to Passiv!</H1DarkStyle>
      <H2DarkStyle>Here's a 3-minute video to help you get started</H2DarkStyle>
      <VerticalPadding>
        <iframe
          title="Passiv Basics"
          width="575"
          height="320"
          src="https://player.vimeo.com/video/360152330"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      </VerticalPadding>
    </React.Fragment>
  );

  return (
    <ShadowBox background="#2a2d34">
      {contents}
      <Button onClick={() => dispatch(push('/app/connect'))}>Continue</Button>
    </ShadowBox>
  );
};

export default WelcomePage;
