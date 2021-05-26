import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectReferralCode } from '../../selectors/referrals';
import { A, H1, H2, H3, P } from '../../styled/GlobalElements';
import Grid from '../../styled/Grid';
import ShadowBox from '../../styled/ShadowBox';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClipboard,
  faClipboardCheck,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faReddit,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import PreLoadLink from '../PreLoadLink';
import { SETTINGS_PATH } from '../../apps/Paths';

const Container = styled.div`
  padding: 100px;
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

const Cards = styled(Grid)`
  margin-top: 50px;
  div {
    * {
      text-align: center;
    }
    h1 {
      font-weight: bold;
      line-height: 150%;
      letter-spacing: 0.2px;
    }
    p {
      font-size: 20px;
      line-height: 150%;
      letter-spacing: 0.2px;
    }
    h3 {
      font-weight: bold;
      font-size: 22px;
      line-height: 150%;
      letter-spacing: 0.2px;
      margin-top: 30px;
    }
  }
`;

const ReferralBox = styled.div`
  margin: 10px auto 30px auto;
  text-align: center;
  a {
    font-weight: bold;
    font-size: 18px;
    line-height: 150%;
    letter-spacing: 0.2px;
    color: #2a2d34;
    margin-right: 10px;
  }
  svg {
    color: var(--brand-green);
    font-size: 25px;
    margin-left: 0px;
  }
`;

const ShareBox = styled.div`
  margin-top: 30px;
  h2 {
    font-weight: bold;
    font-size: 22px;
    line-height: 150%;
    letter-spacing: 0.2px;
    margin-bottom: 15px;
  }
  svg {
    &:hover {
      color: var(--brand-green);
    }
  }
`;

const ReadTuts = styled.div`
  margin-top: 50px;
  button {
    padding: 11px 25px;
    color: var(--brand-blue);
    border: 2px solid var(--brand-blue);
    border-radius: 3px;
    font-weight: 900;
    font-size: 20px;
    line-height: 26px;
    letter-spacing: 0.25px;
  }
`;

const OnboardingFinished = () => {
  const referralCode = useSelector(selectReferralCode);
  const referralURL = 'https://passiv.com?ref=' + referralCode;

  const [copied, setCopied] = useState(false);

  return (
    <Container>
      <H1>Congratulations, you are ready to go!</H1>
      <P>
        Adjust your setttings to customize your experience, take a peak at some
        of our tutorials and tips to get the most our of Passiv, and don’t
        forget to share it with your friends!
      </P>
      <Cards columns="1fr 1fr">
        <ShadowBox>
          <H1>Refer & Earn</H1>
          <P>Get $20 extra to invest for every verified friend you refer!</P>
          <H3>Your Unique Referral Link</H3>
          <ReferralBox>
            <div>
              <A href={referralURL} target="_blank" rel="noopener noreferrer">
                {referralURL}
              </A>
              <CopyToClipboard
                text={referralURL}
                onCopy={() => {
                  setCopied(true);
                }}
              >
                {copied ? (
                  <button>
                    <FontAwesomeIcon icon={faClipboardCheck} />
                  </button>
                ) : (
                  <button>
                    <FontAwesomeIcon icon={faClipboard} />
                  </button>
                )}
              </CopyToClipboard>
            </div>
          </ReferralBox>
          <ShareBox>
            <H2>SHARE TO:</H2>
            <Grid columns="1fr 1fr 1fr 1fr">
              <button>
                <a
                  target="_blank"
                  href={`https://twitter.com/intent/tweet/?text=&url=`}
                  rel="noopener noreferrer"
                  className="twitter"
                >
                  <FontAwesomeIcon icon={faTwitter} size="3x" color="#1DA1F2" />
                </a>
              </button>
              <button>
                <a
                  target="_blank"
                  href={`https://www.facebook.com/sharer/sharer.php?u=`}
                  rel="noopener noreferrer"
                  className="fb"
                >
                  <FontAwesomeIcon
                    icon={faFacebook}
                    size="3x"
                    color="#4267B2"
                  />
                </a>
              </button>
              <button>
                <a
                  target="_blank"
                  href={`https://www.reddit.com/submit?url=&title=`}
                  rel="noopener noreferrer"
                  className="reddit"
                >
                  <FontAwesomeIcon icon={faReddit} size="3x" color="#ff4500" />
                </a>
              </button>
              <button>
                <a
                  href={`mailto:?subject=&body=`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    size="3x"
                    color="var(--brand-grey)"
                  />
                </a>
              </button>
            </Grid>
          </ShareBox>
        </ShadowBox>
        <ShadowBox>
          <H1>Tips & Tricks</H1>
          <P>
            Check out our helpful ramblings, tips, and tricks to make the most
            out of Passiv! Plus, look for the yellow dot for introductory tips
            to help you get started! You can turn this off any time in{' '}
            <PreLoadLink path={SETTINGS_PATH}>Settings</PreLoadLink>.{' '}
          </P>
          <ReadTuts>
            <button>Read Tutorials</button>
          </ReadTuts>
        </ShadowBox>
      </Cards>
    </Container>
  );
};

export default OnboardingFinished;
