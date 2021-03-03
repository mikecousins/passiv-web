import React from 'react';
import ShadowBox from '../../styled/ShadowBox';
import { H1, H2, P, A } from '../../styled/GlobalElements';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HideButton } from '../ContextualMessageWrapper';

const WelcomeVideo = () => {
  return (
    <React.Fragment>
      <ShadowBox background="#DBFCF6">
        <H1>Setup Portfolios</H1>
        <H2>Now it's time to set targets for your portfolios. Here's how:</H2>
        <P>
          <A
            href="https://passiv.com/help/tutorials/how-to-set-up-a-target-portfolio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Guide to set up a target portfolio{' '}
            <FontAwesomeIcon icon={faExternalLinkAlt} />
          </A>
        </P>
        <P>
          If you want to make Passiv ignore one of your accounts, go to{' '}
          <A href="/app/settings">Settings</A>, scroll down to Accounts, and
          move the account to the Hidden Account section.
          <HideButton name={'setup_prompt'} />
        </P>
      </ShadowBox>
    </React.Fragment>
  );
};

export default WelcomeVideo;
