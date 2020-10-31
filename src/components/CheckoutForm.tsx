import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../styled/Button';
import { loadSubscription } from '../actions';
import { postData } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { H2, P } from '../styled/GlobalElements';
import { Link } from 'react-router-dom';
import Card from '../styled/Card';

type Props = {
  loading: boolean;
  startCreateSubscription: () => void;
  finishCreateSubscription: () => void;
  finishCreateSubscriptionFail: () => void;
  stripe?: any;
};

const CheckoutForm = ({
  loading,
  startCreateSubscription,
  finishCreateSubscription,
  finishCreateSubscriptionFail,
  stripe,
}: Props) => {
  const [error, setError] = useState<any>(null);
  const dispatch = useDispatch();

  const submit = async () => {
    setError(null);
    startCreateSubscription();
    let { token } = await stripe.createToken({ name: 'Name' });
    postData(`/api/v1/subscriptions`, { token: token, period: 'annual' })
      .then(() => {
        dispatch(loadSubscription());
        finishCreateSubscription();
      })
      .catch(error => {
        setError(error.response.data.detail);
        finishCreateSubscriptionFail();
      });
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
              <Link to="/app/help">contact support</Link> if that doesn't help.
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
              <Link to="/app/help">contact support</Link> if that doesn't help.
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
              <Link to="/app/help">contact support</Link> if this persists.
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
              <Link to="/app/help">contact support</Link> if this persists.
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
