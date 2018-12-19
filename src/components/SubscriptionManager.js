import React from 'react';
import { connect } from 'react-redux';
import { selectSubscriptions } from '../selectors';
import { Button } from '../styled/Button';
import { Elements } from 'react-stripe-elements';
import InjectedCheckoutForm from './CheckoutForm';
import { baseUrl, loadSubscriptions } from '../actions';
import { deleteData } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';



export class SubscriptionManager extends React.Component {
  state = {
    creatingSubscription: false,
    cancelingSubscription: false,
  }

  createSubscription() {
    this.setState({creatingSubscription: true});
  }

  cancelCreateSubscription() {
    this.setState({creatingSubscription: false});
  }

  finishCreateSubscription() {
    this.setState({creatingSubscription: false});
    console.log('finished!')
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
                    finishCreateSubscription={() => this.finishCreateSubscription()}
                  />
                </Elements>
                <Button onClick={() => {this.cancelCreateSubscription()}}>
                  Cancel
                </Button>
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
      if (this.props.subscriptions.type === 'free') {
        subscriptionBody = (
          <div>
            You are using the free Community Edition of Passiv.
            {upgradeForm}
          </div>
        )
      }
      else if (this.props.subscriptions.type === 'paid') {
        subscriptionBody = (
          <div>
            {
              this.state.cancelingSubscription ? (
                <div>
                  Canceling your subscription... <FontAwesomeIcon icon={faSpinner} spin />
                </div>
              ) : (
                <div>
                  <div>
                    You are subscribed to the {this.props.subscriptions.details.period} Elite plan.
                  </div>
                  {
                    this.props.subscriptions.details.canceled ? (
                      <div>
                        <div>
                          Your subscription has been canceled. You will have access to Elite features until this billing period ends on <Moment date={this.props.subscriptions.details.period_end} />.
                        </div>
                        {upgradeForm}
                      </div>
                    ): (
                      <div>
                        <div>
                          Your subscription will renew on <Moment date={this.props.subscriptions.details.period_end} />.
                        </div>
                        <Button onClick={() => {this.cancelSubscription()}}>
                          Cancel Subscription
                        </Button>
                      </div>
                    )
                  }
                </div>
              )

            }

          </div>
        )
      }
      else if (this.props.subscriptions.type === 'trial') {
        subscriptionBody = (
          <div>
            TRIAL
          </div>
        )
      }
    }

    return (
      <div className="rounded overflow-hidden shadow-lg px-6 py-4 bg-white">
        <h1>Subscription</h1>
        <div>
          { subscriptionBody }
        </div>
      </div>
    )
  }
}

const select = state => ({
  subscriptions: selectSubscriptions(state),
});
const actions = {reloadSubscriptions: loadSubscriptions};

export default connect(select, actions)(SubscriptionManager);
