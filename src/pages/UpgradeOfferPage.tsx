import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { postData } from '../api';
import { loadSubscription } from '../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';
import {
  faTwitterSquare,
  faFacebookSquare,
} from '@fortawesome/free-brands-svg-icons';
import ShadowBox from '../styled/ShadowBox';
import { H1, P, AButton } from '../styled/GlobalElements';
import { Step } from '../styled/SignupSteps';
import { Error } from '../types/groupInfo';
import { Button } from '../styled/Button';
import { push } from 'connected-react-router';

const Bold = styled.span`
  font-weight: 600;
`;

const ShareBox = styled.div`
  display: flex;
`;

const ShareItem = styled.a`
  padding: 20px;
  text-align: center;
  color: #2a2d34;
  :hover,
  :visited,
  :link,
  :active {
    text-decoration: none;
  }
`;

const ShareIcon = styled.div`
  font-size: 4em;
`;

const ShareText = styled.div`
  padding-top: 5px;
  padding-bottom: 20px;
  font-size: 1.2em;
`;

const AButtonBox = styled.div`
  p {
    padding-top: 30px;
    padding-bottom: 15px;
  }
  margin-bottom: 20px;
`;

const shareURL = 'https://getpassiv.com/app/questrade-offer';

const shareTwitterCopy = `Questrade is giving away Passiv Elite subscriptions for FREE! Now it's easier than ever to manage your own investments. Go here to open a Passiv account: ${shareURL}`;

const shareEmailSubjectCopy = 'Questrade is giving away Passiv Elite for free!';
const shareEmailBodyCopy = `Hey, I just found out that Questrade has a promotion where they're giving away Passiv Elite subscriptions. It's usually $79/year, but they're offering it free for now!%0A%0AYou can open an account here: ${shareURL}`;

const shareFacebookLink = `${shareURL}`;

const UpgradeOfferPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);

    postData('/api/v1/offer/', {})
      .then(() => {
        dispatch(loadSubscription());
        setTimeout(() => {
          setLoading(false);
          setSuccess(true);
        }, 2000);
      })
      .catch(error => {
        dispatch(loadSubscription());
        setTimeout(() => {
          setLoading(false);
          setError(error.response.data);
        }, 2000);
      });
  }, [dispatch]);

  const shareBox = (
    <ShareBox>
      <ShareItem
        href={`https://twitter.com/intent/tweet?text=${shareTwitterCopy}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ShareIcon>
          <FontAwesomeIcon icon={faTwitterSquare} />
        </ShareIcon>
        <ShareText>Twitter</ShareText>
      </ShareItem>
      <ShareItem
        href={`https://www.facebook.com/sharer/sharer.php?u=${shareFacebookLink}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ShareIcon>
          <FontAwesomeIcon icon={faFacebookSquare} />
        </ShareIcon>
        <ShareText>Facebook</ShareText>
      </ShareItem>
      <ShareItem
        href={`mailto:?subject=${shareEmailSubjectCopy}&body=${shareEmailBodyCopy}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ShareIcon>
          <FontAwesomeIcon icon={faEnvelopeSquare} />
        </ShareIcon>
        <ShareText>Email</ShareText>
      </ShareItem>
    </ShareBox>
  );

  let errorMessage = null;

  if (error) {
    switch (error.code) {
      case '1038':
        errorMessage = (
          <React.Fragment>
            <P>
              This offer is only available to Questrade customers, and you don't
              have a Questrade account linked to Passiv. Just connect your
              account and come back here to claim the offer!
            </P>
            <Button onClick={() => dispatch(push('/app/settings/connect'))}>
              Connect Questrade
            </Button>
            <AButtonBox>
              <P>
                Don't have a Questrade account yet? Open one using this link and
                you'll be eligible to claim this offer!
              </P>
              <AButton
                href="https://www.questrade.com/account-selection?oaa_promo=bgudhqhm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open a Questrade Account
              </AButton>
            </AButtonBox>
          </React.Fragment>
        );
        break;
      case '1039':
        errorMessage = (
          <React.Fragment>
            <P>
              Sorry, this offer is only available to Questrade customers who do
              not already have a Passiv Elite subscription.
            </P>
            <P>
              You can still spread the holiday cheer by telling your friends
              about this offer. Share this link using Twitter, Facebook, email,
              or whatever you prefer!
            </P>
            {shareBox}
            <Button onClick={() => dispatch(push('/app/dashboard'))}>
              Go to Dashboard
            </Button>
          </React.Fragment>
        );
        break;
      default:
        errorMessage = (
          <P>
            We hit a problem while trying to upgrade your account. Please try
            again later or <Link to="/app/help">contact support</Link> if this
            persists.
          </P>
        );
        break;
    }
  }

  if (success) {
    return (
      <ShadowBox background="#2a2d34">
        <H1 color="white">Questrade Holiday Offer</H1>
        <ShadowBox>
          <P>
            You're good to go! Questrade has given you <Bold>free</Bold> access
            to Passiv Elite for one year.
          </P>
          <P>
            Spread the holiday cheer and tell your friends about this offer.
            Share this link using Twitter, Facebook, email, or whatever you
            prefer!
          </P>
          {shareBox}
          <Button onClick={() => dispatch(push('/app/dashboard'))}>
            Go to Dashboard
          </Button>
        </ShadowBox>
      </ShadowBox>
    );
  } else {
    return (
      <ShadowBox background="#2a2d34">
        <H1 color="white">Questrade Holiday Offer</H1>
        {loading ? (
          <React.Fragment>
            <Step>
              We're upgrading your account, hang tight!{' '}
              <FontAwesomeIcon icon={faSpinner} spin />
            </Step>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Step>Oops, we couldn't apply the offer to your account!</Step>
            <ShadowBox>{errorMessage}</ShadowBox>
          </React.Fragment>
        )}
      </ShadowBox>
    );
  }
};

export default UpgradeOfferPage;
