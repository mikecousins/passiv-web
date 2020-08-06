import React, { useState } from 'react';
import ShadowBox from '../../styled/ShadowBox';
import {
  H1DarkStyle,
  H2DarkStyle,
  PDarkStyle,
  ADarkStyle,
} from '../../styled/Setup';
import { Button } from '../../styled/Button';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const WelcomeVideo = () => {
  const [displayBox, setDisplayBox] = useState(true);

  return (
    <React.Fragment>
      {!displayBox ? null : (
        <ShadowBox background="#2a2d34">
          <H1DarkStyle>Setup Portfolios</H1DarkStyle>
          <H2DarkStyle>
            Now it's time to set targets for your portfolios. Here's how:
          </H2DarkStyle>
          <PDarkStyle>
            <ADarkStyle
              href="https://getpassiv.com/help/tutorials/how-to-set-up-a-target-portfolio/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Guide to set up a target portfolio{' '}
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </ADarkStyle>
          </PDarkStyle>
          <Button onClick={() => setDisplayBox(false)}>Close</Button>
        </ShadowBox>
      )}
    </React.Fragment>
  );
};

export default WelcomeVideo;
