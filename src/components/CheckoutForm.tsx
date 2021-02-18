import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../styled/Button';
import { loadSubscription } from '../actions';
import { postData } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { H2, P } from '../styled/GlobalElements';
import Card from '../styled/Card';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import PreLoadLink from './PreLoadLink';
import { HELP_PATH } from '../apps/Paths';

type Props = {
  loading: boolean;
  startCreateSubscription: () => void;
  finishCreateSubscription: () => void;
  finishCreateSubscriptionFail: () => void;
};

const CheckoutForm = ({
  loading,
  startCreateSubscription,
  finishCreateSubscription,
  finishCreateSubscriptionFail,
}: Props) => {
  const [error, setError] = useState<any>(null);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const submit = async () => {
    setError(null);
    startCreateSubscription();

    if (elements !== null) {
      const card = elements.getElement(CardElement);
      if (stripe !== null && card !== null) {
        let { token } = await stripe.createToken(card);
        postData(`/api/v1/subscriptions`, { token: token, period: 'annual' })
          .then(() => {
            dispatch(loadSubscription());
            finishCreateSubscription();
          })
          .catch((error) => {
            setError(error.response.data.detail);
            finishCreateSubscriptionFail();
          });
      }
    }
  };

  let errorMessage = null;
  if (error) {
    switch (error.code) {
      case '1015':
        errorMessage = (
          <div>
            <H2>Payment could not be processed</H2>
            <P>
              Check that you have entered your payment information correctly or{' '}
              <PreLoadLink path={HELP_PATH}>contact support</PreLoadLink> if
              that doesn't help.
            </P>
          </div>
        );
        break;
      case '1008':
        errorMessage = (
          <div>
            <H2>Payment could not be processed</H2>
            <P>
              Check that you have entered your payment information correctly or{' '}
              <PreLoadLink path={HELP_PATH}>contact support</PreLoadLink> if
              that doesn't help.
            </P>
          </div>
        );
        break;
      case '0000':
        errorMessage = (
          <div>
            <H2>Payment could not be processed</H2>
            <P>
              Oops, you've encountered a bug! Please try again later or{' '}
              <PreLoadLink path={HELP_PATH}>contact support</PreLoadLink> if
              this persists.
            </P>
          </div>
        );
        break;
      default:
        errorMessage = (
          <div>
            <H2>Payment could not be processed</H2>
            <P>
              Oops, you've encountered a bug! Please try again later or{' '}
              <PreLoadLink path={HELP_PATH}>contact support</PreLoadLink> if
              this persists.
            </P>
          </div>
        );
        break;
    }
  }

  return (
    <div>
      <Card />
      {!loading && error && <div>{errorMessage}</div>}
      {loading ? (
        <div>
          Processing your payment... <FontAwesomeIcon icon={faSpinner} spin />
        </div>
      ) : (
        <Button onClick={submit}>Submit</Button>
      )}
    </div>
  );
};

export default CheckoutForm;
