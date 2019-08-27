import React from 'react';
import { connect } from 'react-redux';
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

export class SubscriptionManager extends React.Component {
  state = {
    creatingSubscription: false,
    updatingPayment: false,
    loading: false,
    cancelingSubscription: false,
  };

  createSubscription() {
    this.setState({ creatingSubscription: true });
  }

  cancelCreateSubscription() {
    this.setState({ creatingSubscription: false });
  }

  startCreateSubscription() {
    this.setState({ loading: true });
    console.log('start create subscription!');
  }

  finishCreateSubscription() {
    this.setState({ creatingSubscription: false, loading: false });
    console.log('finished!');
  }

  finishCreateSubscriptionFail() {
    this.setState({ loading: false });
  }

  updatePayment() {
    this.setState({ updatingPayment: true });
    console.log('open update subscription!');
  }

  startUpdatePayment() {
    this.setState({ loading: true });
    console.log('start update payment!');
  }

  cancelUpdatePayment() {
    this.setState({ updatingPayment: false, loading: false });
  }

  finishUpdatePayment() {
    this.setState({ updatingPayment: false, loading: false });
    console.log('finish update payment!');
  }

  finishUpdatePaymentFail() {
    this.setState({ loading: false });
  }

  cancelSubscription() {
    this.setState({ cancelingSubscription: true });
    deleteData(`/api/v1/subscriptions`)
      .then(response => {
        console.log('success', response.data);
        this.props.reloadSubscription();
        this.setState({ cancelingSubscription: false });
      })
      .catch(error => {
        console.log('error', error.response.data);
        this.props.reloadSubscription();
        this.setState({ cancelingSubscription: false });
      });
  }

  render() {
    const { creatingSubscription, loading } = this.state;
    const { subscription } = this.props;
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
                  this.createSubscription();
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
                startCreateSubscription={() => this.startCreateSubscription()}
                finishCreateSubscription={() => this.finishCreateSubscription()}
                finishCreateSubscriptionFail={() =>
                  this.finishCreateSubscriptionFail()
                }
              />
            </Elements>
            {!loading && (
              <ActionContainer>
                <A
                  onClick={() => {
                    this.cancelCreateSubscription();
                  }}
                >
                  Cancel
                </A>
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
            {this.state.cancelingSubscription ? (
              <P>
                Canceling your subscription...{' '}
                <FontAwesomeIcon icon={faSpinner} spin />
              </P>
            ) : this.state.updatingPayment ? (
              <React.Fragment>
                <P>Enter your updated payment information</P>
                <Elements>
                  <InjectedUpdatePaymentForm
                    loading={this.state.loading}
                    startUpdatePayment={() => this.startUpdatePayment()}
                    finishUpdatePayment={() => this.finishUpdatePayment()}
                    finishUpdatePaymentFail={() =>
                      this.finishUpdatePaymentFail()
                    }
                  />
                </Elements>
                {!loading && (
                  <ActionContainer>
                    <A
                      onClick={() => {
                        this.cancelUpdatePayment();
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
                      Your subscription has been canceled. You will have access
                      to Elite features until this billing period{' '}
                      <strong>
                        ends on{' '}
                        {format(
                          subscription.details.period_end,
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
                    <Button
                      onClick={() => {
                        this.updatePayment();
                      }}
                    >
                      Update Card
                    </Button>
                    <A
                      onClick={() => {
                        this.cancelSubscription();
                      }}
                    >
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
  }
}

const select = state => ({
  subscription: selectSubscription(state),
});
const actions = { reloadSubscription: loadSubscription };

export default connect(
  select,
  actions,
)(SubscriptionManager);
