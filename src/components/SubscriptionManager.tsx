import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { selectSubscription } from '../selectors/subscription';
import { selectHasQuestradeConnection } from '../selectors';
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
  transform: translateY(-50%);
  top: 50%;
  position: relative;
  padding-left: 18px;
  color: #fff;

  @media (max-width: 900px) {
    padding: 12px 0px;
    transform: none;
  }

  button {
    margin-top: 8px;
  }
`;

const ActionContainer = styled.div`
  a {
    color: #fff;
    font-weight: 700;
    margin-left: 10px;
    text-decoration: underline;
  }
`;

const PaymentContainer = styled.div`
  padding-top: 15px;
`;

const H2Padded = styled(H2)`
  color: #fff;
  padding-bottom: 8px;
`;

const SubscriptionManager = () => {
  const [creatingSubscription, setCreatingSubscription] = useState(false);
  const [updatingPayment, setUpdatingPayment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cancellingSubscription, setCancellingSubscription] = useState(false);

  const subscription = useSelector(selectSubscription);
  const hasQuestradeConnection = useSelector(selectHasQuestradeConnection);
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
            {hasQuestradeConnection ? (
              <Button onClick={() => dispatch(push('/app/questrade-offer'))}>
                Upgrade Now
              </Button>
            ) : (
              <Button onClick={() => setCreatingSubscription(true)}>
                Upgrade to Elite
              </Button>
            )}
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

  let feedbackForm = (
    <div>
      <Button onClick={() => dispatch(push('/app/help'))}>Give Feedback</Button>
    </div>
  );

  if (subscription) {
    var cardMessage = null;
    switch (subscription.cardState) {
      case 'NONE':
        cardMessage = (
          <P>
            There is no credit card linked to your account. To keep your
            subscription active past the renewal date, please update your card.
          </P>
        );
        break;
      case 'VALID':
        cardMessage = (
          <CreditCardDetails
            cardState={subscription.cardState}
            cardDetails={subscription.cardDetails}
          />
        );
        break;
      case 'UPDATE':
        cardMessage = (
          <React.Fragment>
            <P>
              The credit card linked to your account is no longer valid. Please
              update your card to avoid service interruption.
            </P>
            <CreditCardDetails
              cardState={subscription.cardState}
              cardDetails={subscription.cardDetails}
            />
          </React.Fragment>
        );
        break;
    }

    if (subscription.type === 'free') {
      subscriptionBody = (
        <div>
          <P>
            You are using the free <strong>Community Edition</strong> of Passiv.
          </P>
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
                You are subscribed to the{' '}
                {subscription.details.period === 'year' ? 'annual' : 'monthly'}{' '}
                Elite plan.
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
                  {cardMessage}
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
    <ShadowBox background="#04a287">
      <SubscriptionContainer>
        <H2Padded>Subscription</H2Padded>
        <div>{subscriptionBody}</div>
      </SubscriptionContainer>
    </ShadowBox>
  );
};

export default SubscriptionManager;
