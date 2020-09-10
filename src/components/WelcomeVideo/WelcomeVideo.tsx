import React from 'react';
import ShadowBox from '../../styled/ShadowBox';
import {
  H1DarkStyle,
  H2DarkStyle,
  PDarkStyle,
  ADarkStyle,
} from '../../styled/Setup';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HideButton } from '../ContextualMessageWrapper';

const WelcomeVideo = () => {
  return (
    <React.Fragment>
      <ShadowBox background="#2a2d34">
        <H1DarkStyle>Setup Portfolios</H1DarkStyle>
        <H2DarkStyle>
          Now it's time to set targets for your portfolios. Here's how:
        </H2DarkStyle>
        <PDarkStyle>
          <ADarkStyle
            href="https://passiv.com/help/tutorials/how-to-set-up-a-target-portfolio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Guide to set up a target portfolio{' '}
            <FontAwesomeIcon icon={faExternalLinkAlt} />
          </ADarkStyle>
        </PDarkStyle>
        <PDarkStyle>
          If you want to make Passiv ignore one of your accounts, go to{' '}
          <ADarkStyle href="/app/settings">Settings</ADarkStyle>, scroll down to
          Accounts, and move the account to the Hidden Account section.
          <HideButton name={'setup_prompt'} />
        </PDarkStyle>
      </ShadowBox>
    </React.Fragment>
  );
};

export default WelcomeVideo;
