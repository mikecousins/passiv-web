import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSubscription } from '../selectors/subscription';
import { Button } from '../styled/Button';
import { Elements } from 'react-stripe-elements';
import InjectedCheckoutForm from './CheckoutForm';
import InjectedUpdatePaymentForm from './UpdatePaymentCheckoutForm';
import { loadSubscription } from '../actions';
import { deleteData } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { format, parseISO } from 'date-fns';

import SubscriptionCoupon from './SubscriptionCoupon';
import SubscriptionPlans from './SubscriptionPlans';

import styled from '@emotion/styled';
import { H2, P, A } from '../styled/GlobalElements';
import ShadowBox from '../styled/ShadowBox';
import CreditCardDetails from './CreditCardDetails';

const SubscriptionContainer = styled.div`
  button {
    margin-top: 20px;
  }
`;

const ActionContainer = styled.div`
  a {
    font-weight: 700;
    margin-left: 10px;
    text-decoration: underline;
  }
`;

const PaymentContainer = styled.div`
  padding-top: 15px;
`;

const H2Padded = styled(H2)`
  padding-bottom: 8px;
`;

const SubscriptionManager = () => {
  const [creatingSubscription, setCreatingSubscription] = useState(false);
  const [updatingPayment, setUpdatingPayment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cancellingSubscription, setCancellingSubscription] = useState(false);

  const subscription = useSelector(selectSubscription);
  const dispatch = useDispatch();

  const cancelSubscription = () => {
    setCancellingSubscription(true);
    deleteData(`/api/v1/subscriptions`)
      .then(() => {
        dispatch(loadSubscription());
        setCancellingSubscription(false);
      })
      .catch(() => {
        dispatch(loadSubscription());
        setCancellingSubscription(false);
      });
  };

  let subscriptionBody = <FontAwesomeIcon icon={faSpinner} spin />;

  let upgradeForm = (
    <div>
      <div>
        <SubscriptionPlans />
        <SubscriptionCoupon />
        {!creatingSubscription && (
          <div>
            <Button
              onClick={() => {
                setCreatingSubscription(true);
              }}
            >
              Upgrade to Elite
            </Button>
          </div>
        )}
      </div>

      {creatingSubscription && (
        <PaymentContainer>
          <P>Enter your payment information</P>
          <Elements>
            <InjectedCheckoutForm
              loading={loading}
              startCreateSubscription={() => setLoading(true)}
              finishCreateSubscription={() => {
                setLoading(false);
                setCreatingSubscription(false);
              }}
              finishCreateSubscriptionFail={() => setLoading(false)}
            />
          </Elements>
          {!loading && (
            <ActionContainer>
              <A onClick={() => setCreatingSubscription(false)}>Cancel</A>
            </ActionContainer>
          )}
        </PaymentContainer>
      )}
    </div>
  );

  if (subscription) {
    if (subscription.type === 'free') {
      subscriptionBody = (
        <div>
          <P>You are using the free Community Edition of Passiv.</P>
          {upgradeForm}
        </div>
      );
    } else if (subscription.type === 'paid') {
      subscriptionBody = (
        <React.Fragment>
          {cancellingSubscription ? (
            <P>
              Canceling your subscription...{' '}
              <FontAwesomeIcon icon={faSpinner} spin />
            </P>
          ) : updatingPayment ? (
            <React.Fragment>
              <P>Enter your updated payment information</P>
              <Elements>
                <InjectedUpdatePaymentForm
                  loading={loading}
                  startUpdatePayment={() => setLoading(true)}
                  finishUpdatePayment={() => {
                    setUpdatingPayment(false);
                    setLoading(false);
                  }}
                  finishUpdatePaymentFail={() => setLoading(false)}
                />
              </Elements>
              {!loading && (
                <ActionContainer>
                  <A
                    onClick={() => {
                      setUpdatingPayment(false);
                      setLoading(false);
                    }}
                  >
                    Cancel
                  </A>
                </ActionContainer>
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <P>
                You are subscribed to the {subscription.details.period} Elite
                plan.
              </P>

              {subscription.details.canceled ? (
                <React.Fragment>
                  <P>
                    Your subscription has been canceled. You will have access to
                    Elite features until this billing period{' '}
                    <strong>
                      ends on{' '}
                      {format(
                        parseISO(subscription.details.period_end),
                        'MMMM d, yyyy',
                      )}
                      .
                    </strong>
                  </P>
                </React.Fragment>
              ) : (
                <ActionContainer>
                  <P>
                    Your subscription will renew on{' '}
                    {format(
                      parseISO(subscription.details.period_end),
                      'MMMM d, yyyy',
                    )}
                    .
                  </P>
                  <CreditCardDetails
                    cardState={subscription.cardState}
                    cardDetails={subscription.cardDetails}
                  />
                  <Button onClick={() => setUpdatingPayment(true)}>
                    Update Card
                  </Button>
                  <A onClick={() => cancelSubscription()}>
                    Cancel Subscription
                  </A>
                </ActionContainer>
              )}
            </React.Fragment>
          )}
        </React.Fragment>
      );
    } else if (subscription.type === 'trial') {
      subscriptionBody = <P>TRIAL</P>;
    }
  }

  return (
    <ShadowBox>
      <SubscriptionContainer>
        <H2Padded>Subscription</H2Padded>
        <div>{subscriptionBody}</div>
      </SubscriptionContainer>
    </ShadowBox>
  );
};

export default SubscriptionManager;
