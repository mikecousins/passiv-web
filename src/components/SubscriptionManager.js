import React from 'react';
import { connect } from 'react-redux';
import { selectSubscriptions } from '../selectors';
import { Button } from '../styled/Button';

export class SubscriptionManager extends React.Component {
  state = {
    creatingSubscription: false,
    // subscriptionType: this.props.subscriptions.type,
  }

  createSubscription() {
    this.setState({creatingSubscription: true});
  }

  cancelCreateSubscription() {
    this.setState({creatingSubscription: false});
  }

  render() {
    // let lol = this.state.subscriptionType;
    return (
      <div className="rounded overflow-hidden shadow-lg px-6 py-4 bg-white">
        <h1>Subscription</h1>
        <div>
          {this.props.subscriptions && this.props.subscriptions.type === 'free' ? (
              <div>
                <div>
                  You are using the free Community Edition of Passiv.
                </div>
                {this.state.creatingSubscription ? (
                    <div>
                        Enter your payment information
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
            ) : (
              <div>
                You're an elite!
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

const select = state => ({
  subscriptions: selectSubscriptions(state),
});
const actions = {};

export default connect(select, actions)(SubscriptionManager);
