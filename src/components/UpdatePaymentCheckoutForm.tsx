import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { loadSubscription } from '../actions';
import { patchData } from '../api';
import Card from '../styled/Card';
import { H2, P } from '../styled/GlobalElements';
import { Button } from '../styled/Button';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import PreLoadLink from './PreLoadLink';
import { CONTACT_FORM_PATH } from '../apps/Paths';

type Props = {
  loading: boolean;
  startUpdatePayment: () => void;
  finishUpdatePayment: () => void;
  finishUpdatePaymentFail: () => void;
};

const UpdatePaymentCheckoutForm = ({
  loading,
  startUpdatePayment,
  finishUpdatePayment,
  finishUpdatePaymentFail,
}: Props) => {
  const [error, setError] = useState<any>(null);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const submit = async () => {
    setError(null);
    startUpdatePayment();
    if (elements !== null) {
      const card = elements.getElement(CardElement);
      if (stripe !== null && card !== null) {
        let { token } = await stripe.createToken(card);
        patchData('/api/v1/subscriptions', { token: token })
          .then(() => {
            dispatch(loadSubscription());
            finishUpdatePayment();
          })
          .catch((error) => {
            setError(error.detail);
            dispatch(loadSubscription());
            finishUpdatePaymentFail();
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
            <H2>Card update could not be processed</H2>
            <P>
              Check that you have entered your payment information correctly or{' '}
              <PreLoadLink path={CONTACT_FORM_PATH}>
                contact support
              </PreLoadLink>{' '}
              if that doesn't help.
            </P>
          </div>
        );
        break;
      case '0000':
        errorMessage = (
          <div>
            <H2>Card update could not be processed</H2>
            <P>
              Oops, you've encountered a bug! Please try again later or{' '}
              <PreLoadLink path={CONTACT_FORM_PATH}>
                contact support
              </PreLoadLink>{' '}
              if this persists.
            </P>
          </div>
        );
        break;
      default:
        errorMessage = (
          <div>
            <H2>Card update could not be processed</H2>
            <P>
              Oops, you've encountered a bug! Please try again later or{' '}
              <PreLoadLink path={CONTACT_FORM_PATH}>
                contact support
              </PreLoadLink>{' '}
              if this persists.
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
          <P>
            Updating your card... <FontAwesomeIcon icon={faSpinner} spin />
          </P>
        </div>
      ) : (
        <Button onClick={submit}>Submit</Button>
      )}
    </div>
  );
};

export default UpdatePaymentCheckoutForm;
