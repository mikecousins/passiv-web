import React from 'react';
import { connect } from 'react-redux';
import { selectSubscriptions } from '../selectors';
import { Button } from '../styled/Button';
import { Elements } from 'react-stripe-elements';
import InjectedCheckoutForm from './CheckoutForm';
import InjectedUpdatePaymentForm from './UpdatePaymentCheckoutForm';
import { baseUrl, loadSubscriptions } from '../actions';
import { deleteData } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';

import styled from '@emotion/styled';
import { H2, P } from '../styled/GlobalElements';
import ShadowBox from '../styled/ShadowBox';

const SubscriptionContainer = styled.div`
  button {
    margin-top: 20px;
  }
`;


export class SubscriptionManager extends React.Component {
  state = {
    creatingSubscription: false,
    updatingPayment: false,
    loading: false,
    cancelingSubscription: false,
  }

  createSubscription() {
    this.setState({creatingSubscription: true});
  }

  cancelCreateSubscription() {
    this.setState({creatingSubscription: false});
  }

  startCreateSubscription() {
    this.setState({loading: true});
    console.log('start create subscription!')
  }

  finishCreateSubscription() {
    this.setState({creatingSubscription: false, loading: false});
    console.log('finished!')
  }

  finishCreateSubscriptionFail() {
    this.setState({loading: false});
  }

  updatePayment() {
    this.setState({updatingPayment: true});
    console.log('open update subscription!')
  }

  startUpdatePayment() {
    this.setState({loading: true});
    console.log('start update payment!')
  }

  cancelUpdatePayment() {
    this.setState({updatingPayment: false, loading: false});
  }

  finishUpdatePayment() {
    this.setState({updatingPayment: false, loading: false});
    console.log('finish update payment!')
  }

  finishUpdatePaymentFail() {
    this.setState({loading: false});
  }

  cancelSubscription() {
    this.setState({cancelingSubscription: true});
    deleteData(`${baseUrl}/api/v1/subscriptions`)
      .then(response => {
        console.log('success', response);
        this.props.reloadSubscriptions();
        this.setState({cancelingSubscription: false});
      })
      .catch(error => {
        console.log('error', error);
        this.props.reloadSubscriptions();
        this.setState({cancelingSubscription: false});
      });
  }

  render() {
    let subscriptionBody = (
      <FontAwesomeIcon icon={faSpinner} spin />
    )

    let upgradeForm = (
      <div>
        {this.state.creatingSubscription ? (
            <div>
                Enter your payment information
                <Elements>
                  <InjectedCheckoutForm
                    loading={this.state.loading}
                    startCreateSubscription={() => this.startCreateSubscription()}
                    finishCreateSubscription={() => this.finishCreateSubscription()}
                    finishCreateSubscriptionFail={() => this.finishCreateSubscriptionFail()}
                  />
                </Elements>
                {
                  !this.state.loading && (
                    <Button onClick={() => {this.cancelCreateSubscription()}}>
                      Cancel
                    </Button>
                  )
                }
            </div>
          ) : (
            <div>
              <Button onClick={() => {this.createSubscription()}}>
                Upgrade to Elite
              </Button>
            </div>
          )
        }
      </div>
    )

    if (this.props.subscriptions) {
      let updateNag = null
      if (this.props.subscriptions.cardState !== 'VALID') {
        updateNag = (
          <P>
            Your credit card has been declined, please update it.
          </P>
        )
      }

      if (this.props.subscriptions.type === 'free') {
        subscriptionBody = (
          <P>
            You are using the free Community Edition of Passiv.
            {upgradeForm}
          </P>
        )
      }
      else if (this.props.subscriptions.type === 'paid') {
        subscriptionBody = (
          <div>
            {
              this.state.cancelingSubscription ? (
                <P>
                  Canceling your subscription... <FontAwesomeIcon icon={faSpinner} spin />
                </P>
              ) : (
                this.state.updatingPayment ? (
                  <div>
                      Enter your updated payment information
                      <Elements>
                        <InjectedUpdatePaymentForm
                          loading={this.state.loading}
                          startUpdatePayment={() => this.startUpdatePayment()}
                          finishUpdatePayment={() => this.finishUpdatePayment()}
                          finishUpdatePaymentFail={() => this.finishUpdatePaymentFail()}
                        />
                      </Elements>
                      {
                        !this.state.loading && (
                          <Button onClick={() => {this.cancelUpdatePayment()}}>
                            Cancel
                          </Button>
                        )
                      }
                  </div>
                  ) : (
                    <div>
                      <P>
                        You are subscribed to the {this.props.subscriptions.details.period} Elite plan.
                      </P>
                      { updateNag }
                      {
                        this.props.subscriptions.details.canceled ? (
                          <div>
                            <P>
                              Your subscription has been canceled. You will have access to Elite features until this billing period ends on {format(this.props.subscriptions.details.period_end, 'MMMM D, YYYY')}.
                            </P>
                            {upgradeForm}
                          </div>
                        ): (
                          <div>
                            <P>
                              Your subscription will renew on {format(this.props.subscriptions.details.period_end, 'MMMM D, YYYY')}.
                            </P>
                            <Button onClick={() => {this.cancelSubscription()}}>
                              Cancel Subscription
                            </Button>
                            <Button onClick={() => {this.updatePayment()}}>
                              Update Payment
                            </Button>
                          </div>
                        )
                      }
                    </div>
                  )



              )

            }

          </div>
        )
      }
      else if (this.props.subscriptions.type === 'trial') {
        subscriptionBody = (
          <P>
            TRIAL
          </P>
        )
      }
    }

    return (
      <ShadowBox>
        <SubscriptionContainer>
          <H2>Subscription</H2>
          <div>
            { subscriptionBody }
          </div>
        </SubscriptionContainer>
      </ShadowBox>
    )
  }
}

const select = state => ({
  subscriptions: selectSubscriptions(state),
});
const actions = {reloadSubscriptions: loadSubscriptions};

export default connect(select, actions)(SubscriptionManager);
