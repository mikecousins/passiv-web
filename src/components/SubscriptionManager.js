import React from 'react';
import { connect } from 'react-redux';
import { selectSubscriptions } from '../selectors';

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
                        <button
                          onClick={() => {this.cancelCreateSubscription()}}
                        >
                          Cancel
                        </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        onClick={() => {this.createSubscription()}}
                        className="bg-blue hover:bg-blue-dark text-white font-bold my-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Upgrade to Elite
                      </button>
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
