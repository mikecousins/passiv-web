import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { H2, P } from '../styled/GlobalElements';

import { selectAuthorizationBrokerages, selectSettings } from '../selectors';

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'react-share';

const ShareMessage = styled.div`
  color: #232225;
  padding-top: 20px;
`;

const ShareButton = styled.div`
  margin: 3px;
  display: inline-block;
`;

export const SharingWidget = () => {
  const authorizations = useSelector(selectAuthorizationBrokerages);
  const settings = useSelector(selectSettings);

  const brokerageNames = authorizations.map(authorization =>
    authorization.slug.toLowerCase(),
  );

  const shareUrl = 'https://getpassiv.com/?ref='.concat(settings.referral_code);

  const facebookHashtag = ['#GetPassiv'];
  const twitterHashtag = ['DIYinvesting', 'personalfinance'].concat(
    brokerageNames,
  );

  const facebookMessage = 'Passive Investing Made Easy!';
  const twitterMessage = 'I manage my investments with #Passiv! \n\n';

  return (
    <React.Fragment>
      <H2>Share Passiv with Family and Friends!</H2>
      <ShareMessage>
        <P>Know someone who could use Passiv? Tell them about us!</P>
        <ShareButton>
          <FacebookShareButton
            url={shareUrl}
            quote={facebookMessage}
            hashtag={facebookHashtag}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </ShareButton>
        <ShareButton>
          <TwitterShareButton
            url={shareUrl + '\n\n'}
            title={twitterMessage}
            hashtags={twitterHashtag}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </ShareButton>
        <ShareButton>
          <LinkedinShareButton url={shareUrl}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </ShareButton>
      </ShareMessage>
    </React.Fragment>
  );
};
