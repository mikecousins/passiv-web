import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectRouter } from '../selectors/router';
import styled from '@emotion/styled';
import { postData } from '../api';
import { loadSubscription } from '../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faEnvelopeSquare,
  faExternalLinkAlt,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import {
  faTwitterSquare,
  faFacebookSquare,
} from '@fortawesome/free-brands-svg-icons';
import { H1, P } from '../styled/GlobalElements';
import { Error } from '../types/groupInfo';
import { Button } from '../styled/Button';
import { push } from 'connected-react-router';
import PreLoadLink from '../components/PreLoadLink';
import { CONTACT_FORM_PATH } from '../apps/Paths';
import { Container, ExclamationIcon, Star } from './BrokeragesOauthPage';
import { TutorialLink } from '../components/Accounts';

const Bold = styled.span`
  font-weight: 600;
`;

const ShareBox = styled.div`
  display: flex;
`;

const ShareItem = styled.a`
  padding: 20px 40px 10px 0;
  text-align: center;
  color: #fff;
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
  font-weight: 900;
  font-size: 1em;
`;

const AButtonBox = styled.div`
  p {
    padding-top: 30px;
  }
`;

const shareURL = 'https://passiv.com/questrade-offer';

const shareTwitterCopy = `Questrade is giving away Passiv Elite subscriptions for FREE! Now it's easier than ever to manage your own investments. Go here to open a Passiv account: ${shareURL}`;

const shareEmailSubjectCopy =
  'Questrade%20is%20giving%20away%20Passiv%20Elite%20for%20free!';
const shareEmailBodyCopy = `Hey%2C%20I%20just%20found%20out%20that%20Questrade%20has%20a%20promotion%20where%20they%27re%20giving%20away%20Passiv%20Elite%20subscriptions.%20It%27s%20usually%20%2479%2Fyear%2C%20but%20they%27re%20offering%20it%20free%20for%20now!%0A%0AYou%20can%20claim%20the%20offer%20here%3A%20${shareURL}`;

const shareFacebookLink = `${shareURL}`;

const UpgradeOfferPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const [success, setSuccess] = useState(false);
  const router = useSelector(selectRouter);
  const isOnboarding = router.location.query.onboarding;

  useEffect(() => {
    postData('/api/v1/offer/', {})
      .then(() => {
        dispatch(loadSubscription());
        setTimeout(() => {
          setLoading(false);
          setSuccess(true);
        }, 2000);
      })
      .catch((error) => {
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
            <div>
              <Button onClick={() => dispatch(push('/settings/connect'))}>
                Connect Questrade
              </Button>
            </div>
            <AButtonBox>
              <P>
                Don't have a Questrade account yet? Open one using this link and
                you'll be eligible to claim this offer!
              </P>
              <TutorialLink>
                <a
                  href="https://www.questrade.com/account-selection?oaa_promo=passiv"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open a Questrade Account{' '}
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                </a>
              </TutorialLink>
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
              You can still spread the good news by telling your friends about
              this offer. Share this link using Twitter, Facebook, email, or
              whatever you prefer!
            </P>
            {shareBox}
            <Button onClick={() => dispatch(push('/dashboard'))}>
              Go to Dashboard
            </Button>
          </React.Fragment>
        );
        break;
      default:
        errorMessage = (
          <P>
            We hit a problem while trying to upgrade your account. Please try
            again later or{' '}
            <PreLoadLink path={CONTACT_FORM_PATH}>contact support</PreLoadLink>{' '}
            if this persists.
          </P>
        );
        break;
    }
  }

  let result = null;

  if (loading) {
    result = (
      <H1>
        We're upgrading your account, hang tight!{' '}
        <FontAwesomeIcon icon={faSpinner} spin />
      </H1>
    );
  } else if (success) {
    result = (
      <div>
        <Star></Star>
        <H1>You are now a Elite member</H1>
        <P>
          You're good to go! You will have <Bold>FREE</Bold> access to Passiv
          Elite as long as your Questrade account is connected to Passiv.
        </P>
        {/* <P>
          Spread the good news and tell your friends about this offer. Share
          this link using Twitter, Facebook, email, or whatever you prefer!
        </P>
        {shareBox} */}

        <Button
          onClick={() =>
            dispatch(push(!isOnboarding ? '/welcome?step=3' : '/dashboard'))
          }
        >
          {isOnboarding ? 'Next Step' : 'Go to Dashboard'}
        </Button>
      </div>
    );
  } else {
    result = (
      <React.Fragment>
        <ExclamationIcon>
          <FontAwesomeIcon icon={faExclamationTriangle} color="orange" />
        </ExclamationIcon>
        <H1>Oops, we couldn't apply the offer to your account!</H1>
        {errorMessage}
      </React.Fragment>
    );
  }
  return <Container> {result}</Container>;
};

export default UpgradeOfferPage;
