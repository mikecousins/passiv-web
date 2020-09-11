import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { H2, P } from '../styled/GlobalElements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { getData } from '../api';
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
  padding-top: 15px;
`;

const ShareButton = styled.div`
  margin: 3px;
  display: inline-block;
`;

const Tooltip = styled.div`
  color: #2a2d34;
  position: absolute;
  right: 20px;
  top: 20px;
  :hover {
    cursor: pointer;
  }
`;

export const SharingWidget = ({ shareWidgetClose }) => {
  const authorizations = useSelector(selectAuthorizationBrokerages);
  const settings = useSelector(selectSettings);

  const handleShareWindowClose = name => {
    getData(`/api/v1/shares/${name}`).then(() => {
      console.log('Thank you for sharing Passiv!');
    });
  };

  const brokerageNames = authorizations.map(authorization =>
    authorization.slug.toLowerCase(),
  );

  const shareUrl = 'https://passiv.com/?ref='.concat(settings.referral_code);

  const facebookHashtag = ['#Passiv'];
  const twitterHashtag = ['investing', 'finance', 'money'].concat(
    brokerageNames,
  );

  const facebookMessage = 'Be you own Robo-Advisor! #GetPassiv!';
  const twitterMessage =
    '@PassivTeam thanks for making it easy for me to manage and invest my wealth at my online broker! \n\n';

  return (
    <React.Fragment>
      <H2>Share Passiv with Family and Friends!</H2>

      <Tooltip onClick={shareWidgetClose}>
        <P>
          <FontAwesomeIcon icon={faTimes} />
          &nbsp; Close
        </P>
      </Tooltip>

      <ShareMessage>
        <P>Know someone who could use Passiv? Tell them about us!</P>
        <ShareButton>
          <FacebookShareButton
            url={shareUrl}
            quote={facebookMessage}
            hashtag={facebookHashtag}
            onShareWindowClose={() => handleShareWindowClose('facebook')}
          >
            <FacebookIcon size={42} round />
          </FacebookShareButton>
        </ShareButton>
        <ShareButton>
          <TwitterShareButton
            url={shareUrl + '\n\n'}
            title={twitterMessage}
            hashtags={twitterHashtag}
            onShareWindowClose={() => handleShareWindowClose('twitter')}
          >
            <TwitterIcon size={42} round />
          </TwitterShareButton>
        </ShareButton>
        <ShareButton>
          <LinkedinShareButton
            url={shareUrl}
            onShareWindowClose={() => handleShareWindowClose('linkedin')}
          >
            <LinkedinIcon size={42} round />
          </LinkedinShareButton>
        </ShareButton>
      </ShareMessage>
    </React.Fragment>
  );
};
